import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
import { Salt } from "../src/auth/password.service";

export async function seedUser(bcryptSalt: Salt) {
  console.info("Seeding database...");

  const client = new PrismaClient();

  const data = {
    username: "admin",
    password: await hash("admin", bcryptSalt),
    roles: ["user"],
  };

  await client.user.upsert({
    where: {
      username: data.username,
    },
    update: {},
    create: data,
  });

  void client.$disconnect();

  console.info("Seeded database successfully");
}
