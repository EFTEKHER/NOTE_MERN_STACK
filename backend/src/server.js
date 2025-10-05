// backend/src/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import notesRoutes from "./routes/notesRoutes.js";
import connectDB from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// ESM-safe __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
if (process.env.NODE_ENV !== "production") {
  app.use(cors({ origin: "http://localhost:5173", credentials: true }));
}
app.use(express.json());
app.use(rateLimiter);

// API routes
app.use("/api/notes", notesRoutes);

// Health check
app.get("/health", (_req, res) =>
  res.status(200).json({ ok: true, env: process.env.NODE_ENV || "development" })
);

// Serve React build (folder is 'frontend')
if (process.env.NODE_ENV === "production") {
  const distDir = path.resolve(__dirname, "../../frontend/dist"); // << FIX
  app.use(express.static(distDir));

  // Regex catch-all (avoids path-to-regexp string parsing issues)
  app.get(/^\/(?!api\/).*/, (_req, res) => {
    res.sendFile(path.join(distDir, "index.html")); // << FIX
  });
}

// 404 for unknown API routes
app.use((req, res, next) => {
  if (req.path.startsWith("/api/")) {
    return res.status(404).json({ error: "API route not found" });
  }
  next();
});

// Error handler
app.use((err, _req, res, _next) => {
  console.error("Unhandled error:", err);
  res.status(err.status || 500).json({ error: err.message || "Server Error" });
});

// Start after DB connects
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
    process.exit(1);
  });
