import { useEffect, useState } from "react";
import { fetchSuppliers, addSupplier, deleteSupplier } from "./services/api";

export default function App() {
  const [suppliers, setSuppliers] = useState([]);
  const [newSupplier, setNewSupplier] = useState({ name: "", location: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadSuppliers();
  }, []);

  async function loadSuppliers() {
    setLoading(true);
    try {
      const data = await fetchSuppliers();
      setSuppliers(data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch suppliers");
    }
    setLoading(false);
  }

  async function handleAddSupplier(e) {
    e.preventDefault();
    if (!newSupplier.name || !newSupplier.location) {
      alert("Please fill all fields");
      return;
    }
    try {
      await addSupplier(newSupplier);
      setNewSupplier({ name: "", location: "" });
      loadSuppliers();
    } catch (err) {
      console.error(err);
      alert("Failed to add supplier");
    }
  }

  async function handleDelete(id) {
    if (!confirm("Are you sure?")) return;
    try {
      await deleteSupplier(id);
      loadSuppliers();
    } catch (err) {
      console.error(err);
      alert("Failed to delete supplier");
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold text-center mb-4 text-blue-600">
          💧 Water Suppliers Management
        </h1>

        <form
          onSubmit={handleAddSupplier}
          className="flex flex-col sm:flex-row gap-2 mb-4"
        >
          <input
            type="text"
            placeholder="Supplier Name"
            value={newSupplier.name}
            onChange={(e) =>
              setNewSupplier({ ...newSupplier, name: e.target.value })
            }
            className="border p-2 rounded flex-1"
          />
          <input
            type="text"
            placeholder="Location"
            value={newSupplier.location}
            onChange={(e) =>
              setNewSupplier({ ...newSupplier, location: e.target.value })
            }
            className="border p-2 rounded flex-1"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add
          </button>
        </form>

        {loading ? (
          <p className="text-center text-gray-500">Loading suppliers...</p>
        ) : suppliers.length === 0 ? (
          <p className="text-center text-gray-500">No suppliers found.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {suppliers.map((s) => (
              <li
                key={s._id || s.id}
                className="flex items-center justify-between py-2"
              >
                <div>
                  <p className="font-semibold">{s.name}</p>
                  <p className="text-sm text-gray-500">{s.location}</p>
                </div>
                <button
                  onClick={() => handleDelete(s._id || s.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
