import { CustomersApi } from "../api/customersApi.js";
import { Table } from "../components/table.js";
import { SimpleForm } from "../components/simpleForm.js";

export async function mountCustomersPage() {
  const root = document.getElementById("app");
  root.textContent = "Loading…";
  const customers = await CustomersApi.getAll();
  root.innerHTML = "";
  root.append(
    Table(["Id", "FirstName", "LastName", "Email"], customers),
    SimpleForm(
      "Add Customer",
      [
        { name: "firstName", label: "First Name" },
        { name: "lastName", label: "Last Name" },
        { name: "email", label: "Email", type: "email" },
      ],
      async (dto) => {
        await CustomersApi.create(dto);
        mountCustomersPage();
      }
    )
  );
}
