const API_URL = "/api/suppliers";

export async function fetchSuppliers() {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch suppliers");
  }
  return await response.json();
}

export async function addSupplier(supplier) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(supplier),
  });
  if (!response.ok) {
    throw new Error("Failed to add supplier");
  }
  return await response.json();
}

export async function deleteSupplier(id) {
  const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!response.ok) {
    throw new Error("Failed to delete supplier");
  }
  return await response.json();
}
