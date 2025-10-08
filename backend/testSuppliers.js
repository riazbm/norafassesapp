import axios from "axios";

const BASE_URL = "http://localhost:5000/api/suppliers";

async function testSuppliers() {
  try {
    console.log("➡️  1. Get all suppliers (should be empty)");
    let res = await axios.get(BASE_URL);
    console.log(res.data);

    console.log("\n➡️  2. Add a new supplier");
    res = await axios.post(BASE_URL, {
      name: "Supplier A",
      email: "suppliera@example.com",
      phone: "0712345678"
    });
    console.log(res.data);

    const supplierId = res.data.id;

    console.log("\n➡️  3. Get supplier by ID");
    res = await axios.get(`${BASE_URL}/${supplierId}`);
    console.log(res.data);

    console.log("\n➡️  4. Update supplier");
    res = await axios.put(`${BASE_URL}/${supplierId}`, {
      name: "Updated Supplier A",
      phone: "0798765432"
    });
    console.log(res.data);

    console.log("\n➡️  5. Delete supplier");
    res = await axios.delete(`${BASE_URL}/${supplierId}`);
    console.log(res.data);

    console.log("\n➡️  6. Get all suppliers (should be empty again)");
    res = await axios.get(BASE_URL);
    console.log(res.data);

  } catch (err) {
    console.error(err.response ? err.response.data : err.message);
  }
}

testSuppliers();
