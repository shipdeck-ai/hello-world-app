import path from "node:path";
import { fileURLToPath } from "node:url";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { db } from "./index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function runMigrations() {
  console.log("Running migrations...");
  const migrationsFolder = path.resolve(__dirname, "../../drizzle");
  await migrate(db, { migrationsFolder });
  console.log("Migrations successfully completed!");
}
