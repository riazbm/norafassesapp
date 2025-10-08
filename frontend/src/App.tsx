import { useEffect, useState } from "react";
import { fetchSuppliers, addSupplier, deleteSupplier } from "./services/api";

export default function App() {
  const [suppliers, setSuppliers] = useState([]);
  const [newSupplier, setNewSupplier] = useState({ name: "", location: "" });
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);

  // Load suppliers from backend
  useEffect(() => {
    loadSuppliers();
  }, []);

  async function loadSuppliers() {
    setLoading(true);
    try {
      const data = await fetchSuppliers();
      // Assign mock prices if they don't exist
      const dataWithPrice = data.map(s => ({ ...s, price: s.price || Math.floor(Math.random() * 100) + 10 }));
      setSuppliers(dataWithPrice);
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

  // CART FUNCTIONS
  function addToCart(item) {
    setCart([...cart, item]);
  }

  function removeFromCart(id) {
    setCart(cart.filter(i => i.id !== id));
  }

  const filteredSuppliers = suppliers.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalCost = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-6">

        <h1 className="text-2xl font-bold text-center mb-4 text-blue-600">
          💧 Water Suppliers Management
        </h1>

       <input
  type="text"
  placeholder="Search items..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  className="border p-2 rounded w-full mb-4"
/>


        {/* ADD SUPPLIER */}
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
        ) : filteredSuppliers.length === 0 ? (
          <p className="text-center text-gray-500">No suppliers found.</p>
        ) : (
          <ul className="divide-y divide-gray-200 mb-4">
            {filteredSuppliers.map((s) => (
              <li
                key={s._id || s.id}
                className="flex items-center justify-between py-2"
              >
                <div>
                  <p className="font-semibold">{s.name}</p>
                  <p className="text-sm text-gray-500">{s.location}</p>
                  <p className="text-sm text-gray-700 font-medium">${s.price}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => addToCart(s)}
                    className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => handleDelete(s._id || s.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* CART */}
        <div className="bg-gray-100 p-4 rounded">
          <h2 className="font-bold text-lg mb-2">🛒 Cart</h2>
          {cart.length === 0 ? (
            <p>No items in cart.</p>
          ) : (
            <ul>
              {cart.map((item) => (
                <li key={item._id || item.id} className="flex justify-between py-1">
                  <span>{item.name} - ${item.price}</span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
          <p className="mt-2 font-semibold">Total: ${totalCost}</p>
        </div>

      </div>
    </div>
  );
}
