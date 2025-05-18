// home.js
import { fetchProducts, fetchSuppliers, fetchCustomers } from "./api.js";

export async function renderHome() {
  const container = document.getElementById("main-content");
  container.innerHTML = `<h2>Welcome to Dagny's Bageri admin</h2>
  <p>Manage products, suppliers and customers from one place.</p>`;

  // fetch counts in parallel
  try {
    const [prodRes, suppRes, custRes] = await Promise.all([
      fetchProducts(),
      fetchSuppliers(),
      fetchCustomers(),
    ]);

    const statsHtml = `
      <div class="stats">
        <div class="stat"><span>${prodRes.products.length}</span><br>Products</div>
        <div class="stat"><span>${suppRes.suppliers.length}</span><br>Suppliers</div>
        <div class="stat"><span>${custRes.customers.length}</span><br>Customers</div>
      </div>
    `;
    container.insertAdjacentHTML("beforeend", statsHtml);

    // latest 3 products
    const latest = prodRes.products.slice(0, 3);
    if (latest.length) {
      container.insertAdjacentHTML(
        "beforeend",
        `<h3>Latest products</h3>
         <ul class="latest">
           ${latest.map((p) => `<li>${p.name} — ${p.price} SEK</li>`).join("")}
         </ul>`
      );
    }
  } catch (err) {
    container.insertAdjacentHTML(
      "beforeend",
      `<p class="error">Unable to load dashboard data: ${err.message}</p>`
    );
  }

  // quick navigation buttons
  container.insertAdjacentHTML(
    "beforeend",
    `<div class="quick-links">
        <button data-link="#/products">Products</button>
        <button data-link="#/suppliers">Suppliers</button>
        <button data-link="#/customers">Customers</button>
        <button data-link="#/add-product">Add product</button>
     </div>`
  );

  // delegate clicks to router
  container.querySelectorAll("[data-link]").forEach((btn) =>
    btn.addEventListener("click", (e) => {
      location.hash = btn.dataset.link;
    })
  );
}
