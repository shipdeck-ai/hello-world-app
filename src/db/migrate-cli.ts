import { runMigrations } from "./migrate.js";
import { client } from "./index.js";

async function main() {
  try {
    await runMigrations();
    await client.end();
    process.exit(0);
  } catch (err) {
    console.error("Migration failed:", err);
    await client.end();
    process.exit(1);
  }
}

main();
