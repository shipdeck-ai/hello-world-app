# Hello World Drizzle

This is a minimal Hello World application built using:
- **TypeScript**
- **Express** (HTTP Server)
- **Postgres** (Database)
- **Drizzle ORM** (Database queries and migrations)
- **pnpm** (Package manager)

It connects to a PostgreSQL database, runs migrations programmatically at startup, and provides a simple dark-themed web interface to view and add users to the database.

## Local Development (Docker)

Use Docker Compose for a fully containerized local environment with Postgres:
```bash
docker compose up --build
```
- App runs on http://localhost:3000
- Postgres available at localhost:5432
- Migrations run automatically on startup
- Health check: http://localhost:3000/health

## Local Development (Native)

Requires a running PostgreSQL instance.

1. **Install Dependencies:**
   ```bash
   pnpm install
   ```

2. **Setup environment variables:**
   ```bash
   cp .env.example .env
   ```

3. **Generate Migrations** (after schema changes):
   ```bash
   pnpm db:generate
   ```

4. **Run the app:**
   ```bash
   pnpm dev
   ```

## Production

Build and run the production Docker image:
```bash
docker build -t hello-world-drizzle .
docker run -p 3000:3000 --env-file .env hello-world-drizzle
```

Or use Docker Compose for production-like deployment:
```bash
docker compose up -d --build app
```

## Database Schema

The `users` table is managed via Drizzle ORM:

| Column     | Type      | Constraints                |
|------------|-----------|----------------------------|
| id         | serial    | PRIMARY KEY                |
| name       | text      | NOT NULL                   |
| email      | text      | NOT NULL                   |
| created_at | timestamp | DEFAULT now(), NOT NULL    |

## API Endpoints

| Method | Path    | Description                   |
|--------|---------|-------------------------------|
| GET    | /       | Web UI (list/add users)       |
| POST   | /users  | Add a new user                |
| GET    | /health | Health check                  |

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

