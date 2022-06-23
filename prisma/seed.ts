import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

(async() =>{
  // Default admin user
  const admin = {
    name: process.env.SEED_ADMIN_NAME || "admin",
    email: process.env.SEED_ADMIN_EMAIL || "admin@example.com",
    role: "ADMIN",
  };
  const user = await prisma.user.upsert({
    where: { email: admin.email },
    create: admin,
    update: admin,
  });
  console.log(user);
})()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
