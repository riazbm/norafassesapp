// models/Supplier.js
import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  contact: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Supplier = mongoose.model("Supplier", supplierSchema);

export default Supplier;

