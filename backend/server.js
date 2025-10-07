import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import supplierRoutes from "./routes/supplierRoutes.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/suppliers", supplierRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Backend API running successfully 🚀");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
