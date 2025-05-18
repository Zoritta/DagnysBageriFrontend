import { fetchCustomers } from "./api.js";

export async function renderCustomers() {
  const container = document.getElementById("main-content");
  container.innerHTML = "<h2>Customers</h2>";

  try {
    const customers = await fetchCustomers();

    if (customers.length === 0) {
      container.innerHTML += "<p>No customers found.</p>";
      return;
    }

    const ul = document.createElement("ul");

    customers.forEach((customer) => {
      const li = document.createElement("li");
      li.textContent = `${customer.firstName} ${customer.lastName} - ${
        customer.email || "No email"
      }`;
      ul.appendChild(li);
    });

    container.appendChild(ul);
  } catch (error) {
    container.innerHTML += `<p>Error loading customers: ${error.message}</p>`;
  }
}
