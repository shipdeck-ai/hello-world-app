import express from "express";
import { db } from "./db/index.js";
import { type User, users } from "./db/schema.js";
import { env } from "./env.js";

const app = express();
app.use(express.json());

app.get("/", async (_req, res) => {
  try {
    const allUsers = await db.select().from(users);
    const now = new Date().toISOString();

    // Simple, neat HTML interface
    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Hello World</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            background: #0b0f19;
            color: #f3f4f6;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
          }
          .card {
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.08);
            backdrop-filter: blur(16px);
            padding: 40px;
            border-radius: 16px;
            box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
            max-width: 500px;
            width: 100%;
            text-align: center;
          }
          h1 {
            background: linear-gradient(135deg, #a78bfa, #ec4899);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-size: 2.2rem;
            margin-bottom: 8px;
          }
          p {
            color: #9ca3af;
            font-size: 0.95rem;
            line-height: 1.5;
          }
          .status {
            display: inline-block;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 600;
            background: rgba(16, 185, 129, 0.1);
            color: #10b981;
            margin-top: 10px;
            margin-bottom: 24px;
          }
          .user-list {
            text-align: left;
            margin-top: 20px;
            border-top: 1px solid rgba(255, 255, 255, 0.08);
            padding-top: 20px;
          }
          .user-item {
            background: rgba(255, 255, 255, 0.02);
            padding: 10px 14px;
            border-radius: 8px;
            margin-bottom: 8px;
            font-size: 0.9rem;
            display: flex;
            justify-content: space-between;
          }
          form {
            display: flex;
            flex-direction: column;
            gap: 10px;
            margin-top: 20px;
            text-align: left;
          }
          input {
            background: rgba(0, 0, 0, 0.2);
            border: 1px solid rgba(255, 255, 255, 0.1);
            padding: 10px;
            border-radius: 8px;
            color: white;
            font-size: 0.9rem;
          }
          button {
            background: linear-gradient(135deg, #8b5cf6, #d946ef);
            color: white;
            border: none;
            padding: 12px;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: opacity 0.2s;
          }
          button:hover {
            opacity: 0.9;
          }
        </style>
      </head>
      <body>
        <div class="card">
          <h1>🚀 Hello World!</h1>
          <p>This is a minimal Hello World app running on Node.js, TypeScript, Postgres, and Drizzle ORM.</p>
          <div class="status">✓ Database Connected & Migrated</div>

          <div class="user-list">
            <h3 style="margin-top: 0;">Server Info</h3>
            <div class="user-item">
              <strong>Current Datetime</strong>
              <span style="color: #9ca3af;">${now}</span>
            </div>
            <div class="user-item">
              <strong>Users in Database</strong>
              <span style="color: #9ca3af;">${allUsers.length}</span>
            </div>
          </div>

          <div class="user-list">
            <h3 style="margin-top: 0;">All Users</h3>
            ${
              allUsers.length === 0
                ? '<p style="color: #6b7280; font-style: italic;">No users created yet. Add one below!</p>'
                : allUsers
                    .map(
                      (u: User) => `
              <div class="user-item">
                <strong>${u.name}</strong>
                <span style="color: #9ca3af;">${u.email}</span>
              </div>
            `
                    )
                    .join("")
            }

            <form action="/users" method="POST" id="userForm">
              <input type="text" name="name" placeholder="Name" required />
              <input type="email" name="email" placeholder="Email" required />
              <button type="submit">Add User</button>
            </form>
          </div>
        </div>
        <script>
          document.getElementById('userForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData);

            const res = await fetch('/users', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data)
            });
            if (res.ok) {
              window.location.reload();
            } else {
              alert('Failed to add user');
            }
          });
        </script>
      </body>
      </html>
    `;
    res.send(html);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    res.status(500).send(`<h1>Database Connection Error</h1><pre>${message}</pre>`);
  }
});

app.post("/users", async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required" });
    }
    const newUser = await db.insert(users).values({ name, email }).returning();
    res.status(201).json(newUser[0]);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    res.status(500).json({ error: message });
  }
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`);
});
