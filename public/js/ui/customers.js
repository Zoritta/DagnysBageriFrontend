import { get, post } from "../api.js";

export default async function renderCustomers(target) {
  /* ---------- List customers ---------- */
  const raw = await get("customers");
  const customers = Array.isArray(raw) ? raw : raw.customers ?? [];

  const table = document.createElement("table");
  table.innerHTML = `
    <thead><tr><th>Name</th><th>Email</th></tr></thead>
    <tbody>
      ${customers
        .map(
          (c) => `<tr>
                  <td data-label="Name">${c.name}</td>
                  <td data-label="Email">${c.email}</td>
                </tr>`
        )
        .join("")}
    </tbody>`;
  target.append(table);

  /* ---------- Add-new form ---------- */
  const form = document.createElement("form");
  form.innerHTML = `
    <h3>Add customer</h3>
    <input name="name" placeholder="Name" required />
    <input name="email" type="email" placeholder="Email" required />
    <button>Add</button>`;
  target.append(form);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    await post("customers", data);
    location.reload();
  });
}
