import { get, post } from "../api.js";

export default async function render(target) {
  // ---------- Listing ----------
  const raw = await get("products");
  const products = Array.isArray(raw) ? raw : raw.products ?? [];

  const table = document.createElement("table");
  table.innerHTML = `
    <thead><tr><th>Name</th><th>Price</th><th>Supplier</th></tr></thead>
    <tbody>
      ${products
        .map(
          (p) => `<tr>
                  <td data-label="Name">${p.name}</td>
                  <td data-label="Price">${p.price}</td>
                  <td data-label="Supplier">${p.supplierName}</td>
                </tr>`
        )
        .join("")}
    </tbody>`;
  target.append(table);

  // ---------- Add-new form ----------
  const form = document.createElement("form");
  form.innerHTML = `
    <h3>Add product</h3>
    <input name="name" placeholder="Name" required />
    <input name="price" type="number" placeholder="Price" required />
    <input name="supplierId" placeholder="Supplier id" required />
    <button>Add</button>`;
  target.append(form);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    data.price = +data.price;
    await post("products", data);
    location.reload(); // simple but effective refresh
  });
}
