import * as dotenv from "dotenv";
import { customSeed } from "./customSeed";
import { parseSalt } from "../src/auth/password.service";
import { seedUser } from "./userSeed";

if (require.main === module) {
  dotenv.config();

  const { BCRYPT_SALT } = process.env;

  if (!BCRYPT_SALT) {
    throw new Error("BCRYPT_SALT environment variable must be defined");
  }
  const salt = parseSalt(BCRYPT_SALT);

  seedUser(salt).catch((error) => {
    console.error(error);
    process.exit(1);
  });

  console.info("Seeding database with custom seed...");
  customSeed();
}
