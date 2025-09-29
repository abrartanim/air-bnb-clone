import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./lib/db.js";
import propertyRoutes from "./routes/properties.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
// FIX: Update CORS to allow requests from your deployed frontend
const allowedOrigins = [
  "http://localhost:5173", // For local development
  "https://air-bnb-clone-damf.vercel.app", // Your deployed frontend URL
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);
app.use(express.json());

// A simple test route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Use Routes
app.use("/api/properties", propertyRoutes);

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
  });
};

startServer();
