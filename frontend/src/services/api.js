// services/api.js

const API_URL = "http://localhost:5000/api/suppliers"; // backend URL

// GET all suppliers
export async function fetchSuppliers() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Failed to fetch suppliers");
    return await res.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
}

// ADD a supplier
export async function addSupplier(supplier) {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(supplier),
    });
    if (!res.ok) throw new Error("Failed to add supplier");
    return await res.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
}

// DELETE a supplier
export async function deleteSupplier(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete supplier");
    return await res.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
}
