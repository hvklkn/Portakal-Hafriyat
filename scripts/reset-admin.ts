import "dotenv/config";

import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

const fallbackEmail = "admin@portakal.com";
const fallbackPassword = "admin123.";

function getAdminEmail() {
  return (process.env.ADMIN_SEED_EMAIL ?? fallbackEmail).trim().toLowerCase();
}

function getAdminPassword() {
  return process.env.ADMIN_SEED_PASSWORD ?? fallbackPassword;
}

function getPasswordSource() {
  return process.env.ADMIN_SEED_PASSWORD
    ? "ADMIN_SEED_PASSWORD env"
    : "fallback password";
}

async function main() {
  const email = getAdminEmail();
  const password = getAdminPassword();
  const passwordHash = await hash(password, 12);

  await prisma.adminUser.upsert({
    where: { email },
    update: {
      passwordHash,
      isActive: true,
      role: "admin"
    },
    create: {
      email,
      name: "Site Yoneticisi",
      passwordHash,
      role: "admin",
      isActive: true
    }
  });

  console.log("Admin user reset successfully");
  console.log(`Email: ${email}`);
  console.log(`Password source: ${getPasswordSource()}`);
}

main()
  .catch((error) => {
    console.error("Admin user reset failed");
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
