const API_BASE = "http://localhost:5093/api"; // change {port} to your backend port

async function request(url, options = {}) {
  const res = await fetch(url, options);
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
}

// --- Supplier endpoints -----------------------------
export const fetchSuppliers = () => request(`${API_BASE}/suppliers`);

// --- Product endpoints ------------------------------
export const fetchProducts = () => request(`${API_BASE}/products`);
export const fetchProductByName = (name) =>
  request(`${API_BASE}/products/name/${encodeURIComponent(name)}`);

export const addProduct = (product) =>
  request(`${API_BASE}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });

export const updateProductPrice = (productName, newPrice) =>
  request(
    `${API_BASE}/products/name/${encodeURIComponent(productName)}/price`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ NewPrice: newPrice }),
    }
  );

// --- Customer endpoints -----------------------------
export const fetchCustomers = () => request(`${API_BASE}/customers`);