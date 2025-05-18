import { OrdersApi } from "../api/ordersApi.js";
import { CustomersApi } from "../api/customersApi.js";
import { ProductsApi } from "../api/productsApi.js";
import { Table } from "../components/table.js";

export async function mountOrdersPage() {
  const root = document.getElementById("app");
  root.textContent = "Loading…";
  const [orders, customers, products] = await Promise.all([
    OrdersApi.getAll(),
    CustomersApi.getAll(),
    ProductsApi.getAll(),
  ]);
  root.innerHTML = "";
  // show existing orders
  root.append(Table(["Id", "CustomerId", "Date", "Total"], orders));

  // simple order form
  const form = document.createElement("form");
  form.innerHTML = `<h2>Add Order</h2>
    <label>Customer
      <select name="customerId" required>
        ${customers
          .map(
            (c) =>
              `<option value="${c.id}">${c.firstName} ${c.lastName}</option>`
          )
          .join("")}
      </select>
    </label>
    <label>Product
      <select name="productId" required>
        ${products
          .map((p) => `<option value="${p.id}">${p.name}</option>`)
          .join("")}
      </select>
    </label>
    <label>Quantity <input name="quantity" type="number" min="1" value="1" required></label>
    <button>Add</button>`;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    data.quantity = parseInt(data.quantity, 10);
    await OrdersApi.create(data);
    mountOrdersPage();
  });

  root.append(form);
}
