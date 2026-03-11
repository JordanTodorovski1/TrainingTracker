import "server-only";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

type SessionPayload = {
  userId: string;
  username: string;
  email: string;
};

const SESSION_COOKIE = "session";
const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 7;

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("Missing JWT_SECRET environment variable.");
  }

  return secret;
}

export function createSessionToken(payload: SessionPayload) {
  return jwt.sign(payload, getJwtSecret(), {
    expiresIn: SESSION_DURATION_SECONDS,
  });
}

export function verifySessionToken(token: string): SessionPayload | null {
  try {
    return jwt.verify(token, getJwtSecret()) as SessionPayload;
  } catch {
    return null;
  }
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) {
    return null;
  }

  const payload = verifySessionToken(token);
  if (!payload) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
    select: {
      id: true,
      username: true,
      email: true,
      emailVerified: true,
    },
  });

  return user;
}

export const authCookie = {
  name: SESSION_COOKIE,
  maxAge: SESSION_DURATION_SECONDS,
};
