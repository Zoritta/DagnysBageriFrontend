import { fetchSuppliers } from "./api.js";

export async function renderSuppliers() {
  const container = document.getElementById("main-content");
  container.innerHTML = "<h2>Suppliers</h2>";

  try {
    const suppliers = await fetchSuppliers();

    if (suppliers.length === 0) {
      container.innerHTML += "<p>No suppliers found.</p>";
      return;
    }

    const ul = document.createElement("ul");

    suppliers.forEach((supplier) => {
      const li = document.createElement("li");
      li.textContent = `${supplier.name} - ${
        supplier.contactEmail || "No email"
      }`;
      ul.appendChild(li);
    });

    container.appendChild(ul);
  } catch (error) {
    container.innerHTML += `<p>Error loading suppliers: ${error.message}</p>`;
  }
}
