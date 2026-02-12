import "express-async-errors";
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import routes from "./routes/index.js";
import connectDB from "./config/db.js"; // Ensures we can trigger connection
import { errorHandler } from "./middleware/error.middleware.js";

const app = express();

// 1. TRUST PROXY (Essential for Vercel + Rate Limiting)
app.set("trust proxy", 1);

// 2. CONFIGURE CORS
// Added your specific localhost and Vercel origins
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "https://sjcs-web-a65p.vercel.app"
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or Postman)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Required for cookies and auth headers
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "x-request-id"]
}));

// 3. DATABASE GUARD MIDDLEWARE
// This forces the app to wait for MongoDB before running any route logic
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    res.status(503).json({ 
      error: "Database Unavailable", 
      message: "The server is currently unable to handle the request due to a connection issue." 
    });
  }
});

app.use(express.json());

// 4. RATE LIMITER
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false
});
app.use(limiter);

// 5. ROOT HTML ROUTE (Full Preservation)
app.get("/", (req, res) => {
  res.status(200).send(`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>SJCS API</title>
    <style>
      :root { color-scheme: light; }
      body {
        margin: 0;
        font-family: "Segoe UI", Tahoma, Arial, sans-serif;
        background: linear-gradient(135deg, #0f172a 0%, #1f2937 45%, #111827 100%);
        color: #e5e7eb;
      }
      .wrap {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 32px 20px;
      }
      .card {
        max-width: 720px;
        width: 100%;
        background: rgba(17, 24, 39, 0.85);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 16px;
        padding: 32px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.35);
      }
      .badge {
        display: inline-block;
        background: rgba(59, 130, 246, 0.15);
        color: #93c5fd;
        padding: 6px 12px;
        border-radius: 999px;
        font-size: 12px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }
      h1 { margin: 16px 0 8px; font-size: 32px; line-height: 1.2; }
      p { margin: 0 0 20px; color: #cbd5f5; line-height: 1.6; }
      .links { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 12px; }
      .links a {
        text-decoration: none;
        color: #111827;
        background: #e5e7eb;
        padding: 10px 16px;
        border-radius: 10px;
        font-weight: 600;
        transition: transform 0.15s ease, box-shadow 0.15s ease;
      }
      .links a:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.25);
      }
      .footer { margin-top: 24px; font-size: 12px; color: #9ca3af; }
      code {
        background: rgba(148, 163, 184, 0.18);
        padding: 2px 6px;
        border-radius: 6px;
        font-family: "Cascadia Mono", "Fira Code", Consolas, monospace;
        color: #e2e8f0;
      }
    </style>
  </head>
  <body>
    <div class="wrap">
      <div class="card">
        <span class="badge">SJCS Backend</span>
        <h1>API is running</h1>
        <p>
          Welcome to the SJCS backend. This server exposes JSON endpoints under
          <code>/api</code> and responds with data for the web app.
        </p>
        <div class="links">
          <a href="/api">Explore /api</a>
          <a href="/api/health">Health check</a>
        </div>
        <div class="footer">If you see this page, the server is online.</div>
      </div>
    </div>
  </body>
</html>`);
});

// 6. ROUTES
app.use("/api", routes);

// 7. GLOBAL ERROR HANDLER
app.use(errorHandler);

export default app;