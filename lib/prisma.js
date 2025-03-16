import { PrismaClient } from "@prisma/client";

// Initialize Prisma Client only once
const prisma = new PrismaClient();

export default prisma;
