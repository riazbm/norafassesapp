function App() {
  return (
    <h1 className="text-3xl font-bold text-blue-600 text-center mt-10">
      Tailwind is working 🚀
    </h1>
  );
}

export default App;


// import { useEffect, useState } from "react";
// import "./App.css";

// interface Supplier {
//   id: number;
//   name: string;
//   contact: string;
// }

// function App() {
//   const [suppliers, setSuppliers] = useState<Supplier[]>([]);
//   const [name, setName] = useState("");
//   const [contact, setContact] = useState("");

//   // Fetch suppliers from backend
//   const fetchSuppliers = async () => {
//     const res = await fetch("http://localhost:5000/api/suppliers");
//     const data = await res.json();
//     setSuppliers(data);
//   };

//   // Add new supplier
//   const addSupplier = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const res = await fetch("http://localhost:5000/api/suppliers", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ name, contact }),
//     });
//     if (res.ok) {
//       setName("");
//       setContact("");
//       fetchSuppliers();
//     }
//   };

//   // Delete supplier
//   const deleteSupplier = async (id: number) => {
//     await fetch(`http://localhost:5000/api/suppliers/${id}`, { method: "DELETE" });
//     fetchSuppliers();
//   };

//   useEffect(() => {
//     fetchSuppliers();
//   }, []);

//   return (
//     <div className="app">
//       <h1>Supplier Management</h1>

//       <form onSubmit={addSupplier}>
//         <input
//           type="text"
//           placeholder="Supplier Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//         />
//         <input
//           type="text"
//           placeholder="Contact"
//           value={contact}
//           onChange={(e) => setContact(e.target.value)}
//           required
//         />
//         <button type="submit">Add Supplier</button>
//       </form>

//       <ul>
//         {suppliers.map((s) => (
//           <li key={s.id}>
//             <strong>{s.name}</strong> - {s.contact}
//             <button onClick={() => deleteSupplier(s.id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;

