import { PrismaClient as PrismaClientDev } from "@prisma-db-dev/client";
import { PrismaClient as PrismaClientProd } from "@prisma-db-dev/client";
import { log } from "console";

const selectedPrismaClient =
  process.env.NODE_ENV !== "production"
    ? new PrismaClientDev({ log: ["query"] })
    : new PrismaClientProd({ log: ["query"] });

const globalForPrisma = global as unknown as {
  prisma: PrismaClientProd | PrismaClientDev;
};

export const prisma = globalForPrisma.prisma ?? selectedPrismaClient;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
