import { ProductsApi } from "../api/productsApi.js";
import { Table } from "../components/table.js";
import { ProductForm } from "../components/form.js";

export async function mountProductsPage() {
  const root = document.getElementById("app");
  root.textContent = "Loading…";
  const products = await ProductsApi.getAll();
  root.innerHTML = "";
  root.append(
    Table(["Id", "Name", "Price", "SupplierId"], products),
    ProductForm(async (dto) => {
      await ProductsApi.create(dto);
      mountProductsPage();
    })
  );
}
