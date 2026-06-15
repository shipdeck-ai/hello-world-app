# Hello World Drizzle (Shipdeck Demo App)

This is a minimal Hello World application built using:
- **TypeScript**
- **Express** (HTTP Server)
- **Postgres** (Database)
- **Drizzle ORM** (Database queries and migrations)
- **pnpm** (Package manager)

It connects to a PostgreSQL database, runs migrations programmatically at startup, and provides a simple dark-themed web interface to view and add users to the database.

## Running Locally

1. **Install Dependencies:**
   ```bash
   pnpm install
   ```

2. **Setup environment variables:**
   Copy `.env.example` to `.env` and configure your local Postgres instance:
   ```bash
   cp .env.example .env
   ```

3. **Generate Migrations:**
   Generate the initial database migration files:
   ```bash
   pnpm db:generate
   ```

4. **Run the app in Development Mode:**
   ```bash
   pnpm dev
   ```

5. **Build & Start for Production:**
   ```bash
   pnpm build
   pnpm start
   ```

## Deploying on Shipdeck

This app is fully compatible with Shipdeck's zero-config setup out-of-the-box. When you import this repo into Shipdeck:
1. **Auto-provisioning:** Shipdeck will automatically detect Drizzle/Postgres and provision a dedicated, isolated database space.
2. **Auto-injection:** Shipdeck will inject the correct `DATABASE_URL` and `PORT` environment variables dynamically.
3. **Auto-migration:** The application's startup script runs programmatic Drizzle migrations, making database schema updates completely automatic.
