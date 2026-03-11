import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { createSessionToken, authCookie } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const loginSchema = z.object({
  username: z.string().trim().min(3),
  email: z.string().trim().email(),
  password: z.string().min(8),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const data = loginSchema.parse(json);
    const email = data.email.toLowerCase();

    const user = await prisma.user.findUnique({
      where: { username: data.username },
    });

    if (!user || user.email !== email) {
      return NextResponse.json(
        { error: "Invalid login credentials." },
        { status: 401 },
      );
    }

    const passwordMatches = await bcrypt.compare(data.password, user.passwordHash);
    if (!passwordMatches) {
      return NextResponse.json(
        { error: "Invalid login credentials." },
        { status: 401 },
      );
    }

    if (!user.emailVerified) {
      return NextResponse.json(
        { error: "Please verify your email before logging in." },
        { status: 403 },
      );
    }

    const token = createSessionToken({
      userId: user.id,
      username: user.username,
      email: user.email,
    });

    const response = NextResponse.json({ message: "Login successful." });
    response.cookies.set(authCookie.name, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: authCookie.maxAge,
    });

    return response;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid login data.", details: error.issues },
        { status: 400 },
      );
    }

    return NextResponse.json({ error: "Login failed." }, { status: 500 });
  }
}
