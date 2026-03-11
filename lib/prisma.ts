import "server-only";
import path from "path";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function getDatabaseUrl() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("Missing DATABASE_URL in environment.");
  }

  if (!url.startsWith("file:")) {
    return url;
  }

  const sqlitePath = url.slice("file:".length);
  if (sqlitePath.startsWith("./") || sqlitePath.startsWith("../")) {
    const absolute = path.resolve(process.cwd(), sqlitePath);
    return `file:${absolute}`;
  }

  return url;
}

export const prisma: PrismaClient =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: {
      db: {
        url: getDatabaseUrl(),
      },
    },
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
