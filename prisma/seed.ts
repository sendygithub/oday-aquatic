import { PrismaClient } from "@prisma/client";
import { createHash } from "crypto";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = "admin@odaygallery.com";
  const adminPassword = "admin123";

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const hashedPassword = createHash("sha256")
      .update(adminPassword)
      .digest("hex");

    await prisma.user.create({
      data: {
        name: "Admin Oday",
        email: adminEmail,
        password: hashedPassword,
        role: "admin",
      },
    });

    console.log(`Admin user created: ${adminEmail} / ${adminPassword}`);
  } else {
    console.log("Admin user already exists.");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
