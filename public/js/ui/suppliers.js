/*  public/js/ui/suppliers.js  */
import { get, post } from "../api.js";

export default async function renderSuppliers(target) {
  /* ─────────── Fetch & list suppliers ─────────── */
  const suppliers = await get("suppliers"); // expects a JSON array

  const table = document.createElement("table");
  table.innerHTML = `
    <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Address</th>
        <th>Contact</th>
        <th>Phone</th>
        <th>Email</th>
      </tr>
    </thead>
    <tbody>
      ${suppliers
        .map(
          (s) => `<tr>
                  <td data-label="#">${s.supplierId}</td>
                  <td data-label="Name">${s.name}</td>
                  <td data-label="Address">${s.address ?? ""}</td>
                  <td data-label="Contact">${s.contactPerson ?? ""}</td>
                  <td data-label="Phone">${s.phoneNumber ?? ""}</td>
                  <td data-label="Email">${s.email ?? ""}</td>
                </tr>`
        )
        .join("")}
    </tbody>`;
  target.append(table);

  /* ─────────── Add-new form ─────────── */
  const form = document.createElement("form");
  form.innerHTML = `
    <h3>Add supplier</h3>
    <input name="name"          placeholder="Name *"          required />
    <input name="address"       placeholder="Address"         />
    <input name="contactPerson" placeholder="Contact person"  />
    <input name="phoneNumber"   placeholder="Phone number"    />
    <input name="email" type="email" placeholder="Email"     />
    <button>Add</button>`;
  target.append(form);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    await post("suppliers", data); // backend will ignore empty optional fields
    location.reload(); // quick refresh to show the new row
  });
}
