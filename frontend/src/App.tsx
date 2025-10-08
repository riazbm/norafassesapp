import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const addToCart = (product) => setCart([...cart, product]);
  const removeFromCart = (index) =>
    setCart(cart.filter((_, i) => i !== index));

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white py-4 px-6 flex justify-between items-center shadow-md sticky top-0 z-50">
        <h1 className="text-xl font-bold tracking-wide">🛍️ NorwaAfrica Store</h1>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-2 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white w-48 sm:w-72"
          />
          <button
            onClick={() => setShowCart(!showCart)}
            className="bg-white text-blue-600 font-semibold px-4 py-2 rounded-lg hover:bg-blue-100 transition"
          >
            Cart ({cart.length})
          </button>
        </div>
      </nav>

      {/* Product List */}
      <main className="p-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white p-4 rounded-2xl shadow-sm hover:shadow-lg transition flex flex-col items-center"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-32 h-32 object-contain mb-3"
            />
            <h2 className="text-sm font-semibold text-center line-clamp-2 mb-2">
              {product.title}
            </h2>
            <p className="text-blue-600 font-bold mb-3">${product.price}</p>
            <button
              onClick={() => addToCart(product)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </main>

      {/* Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-11/12 max-w-md p-6 relative">
            <button
              onClick={() => setShowCart(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              ✖
            </button>
            <h3 className="text-lg font-bold mb-4 text-blue-600">Your Cart 🛒</h3>
            {cart.length === 0 ? (
              <p className="text-gray-500">No items added yet.</p>
            ) : (
              <ul className="space-y-2 max-h-60 overflow-y-auto">
                {cart.map((item, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center border-b pb-2"
                  >
                    <span className="text-sm w-48 truncate">{item.title}</span>
                    <span className="font-semibold">${item.price}</span>
                    <button
                      onClick={() => removeFromCart(index)}
                      className="text-red-500 hover:text-red-700 text-xs"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <p className="mt-4 font-bold text-lg">
              Total: <span className="text-blue-600">${total.toFixed(2)}</span>
            </p>
            <button
              className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

