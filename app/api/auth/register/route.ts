import { randomBytes } from "crypto";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import {
  MailConfigurationError,
  isMailConfigured,
  sendVerificationEmail,
} from "@/lib/mail";

const registerSchema = z.object({
  username: z.string().trim().min(3).max(30),
  email: z.string().trim().email(),
  password: z.string().min(8).max(100),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const data = registerSchema.parse(json);
    const email = data.email.toLowerCase();
    const username = data.username.trim();

    const [existingByEmail, existingByUsername] = await Promise.all([
      prisma.user.findUnique({ where: { email } }),
      prisma.user.findUnique({ where: { username } }),
    ]);

    if (existingByEmail || existingByUsername) {
      const fieldMessage =
        existingByEmail && existingByUsername
          ? "Username and email already exist."
          : existingByUsername
            ? "Username already exists."
            : "Email already exists.";
      return NextResponse.json(
        { error: fieldMessage },
        { status: 409 },
      );
    }

    if (!isMailConfigured()) {
      return NextResponse.json(
        {
          error:
            "Email service is not configured. Add real SMTP_* values in .env.",
        },
        { status: 503 },
      );
    }

    const passwordHash = await bcrypt.hash(data.password, 12);
    const verificationToken = randomBytes(32).toString("hex");
    const verificationTokenExpiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        passwordHash,
        verificationToken,
        verificationTokenExpiresAt,
      },
    });

    try {
      await sendVerificationEmail({
        email: user.email,
        username: user.username,
        token: verificationToken,
      });
    } catch (mailError) {
      await prisma.user.delete({ where: { id: user.id } });

      if (mailError instanceof MailConfigurationError) {
        return NextResponse.json({ error: mailError.message }, { status: 503 });
      }

      console.error("Failed to send verification email:", mailError);
      return NextResponse.json(
        { error: "Could not send verification email. Please try again." },
        { status: 503 },
      );
    }

    return NextResponse.json({
      message:
        "Registration successful. Check your email and verify your account before login.",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid registration data.", details: error.issues },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { error: "Registration failed. Try again." },
      { status: 500 },
    );
  }
}
