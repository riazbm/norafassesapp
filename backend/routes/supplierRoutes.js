import express from "express";
const router = express.Router();

const suppliers = [
  { id: 1, name: "Tech World Ltd", contact: "tech@world.com" },
  { id: 2, name: "Smart Gadgets", contact: "info@smartgadgets.com" },
  { id: 3, name: "Urban Electronics", contact: "sales@urban.com" },
];

// GET all suppliers
router.get("/", (req, res) => {
  res.json(suppliers);
});

// POST new supplier
router.post("/", (req, res) => {
  const { name, location } = req.body;
  if (!name || !location) {
    return res.status(400).json({ message: "Name and location are required" });
  }

  const newSupplier = {
    id: suppliers.length + 1,
    name,
    location,
  };

  suppliers.push(newSupplier);
  res.status(201).json(newSupplier);
});

// GET supplier by ID
router.get("/:id", (req, res) => {
  const supplier = suppliers.find((s) => s.id === parseInt(req.params.id));
  if (!supplier) return res.status(404).json({ message: "Supplier not found" });
  res.json(supplier);
});

export default router;

