import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./lib/db.js";
import propertyRoutes from "./routes/properties.js"; // 1. IMPORT a new line

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// A simple test route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Use Routes
app.use("/api/properties", propertyRoutes); // 2. USE the router

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
  });
};

startServer();
