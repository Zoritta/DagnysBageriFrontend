import { SuppliersApi } from "../api/suppliersApi.js";
import { Table } from "../components/table.js";
import { SimpleForm } from "../components/simpleForm.js";

export async function mountSuppliersPage() {
  const root = document.getElementById("app");
  root.textContent = "Loading…";
  const suppliers = await SuppliersApi.getAll();
  root.innerHTML = "";
  root.append(
    Table(["Id", "Name", "City"], suppliers),
    SimpleForm(
      "Add Supplier",
      [
        { name: "name", label: "Name" },
        { name: "city", label: "City" },
      ],
      async (dto) => {
        await SuppliersApi.create(dto);
        mountSuppliersPage();
      }
    )
  );
}
