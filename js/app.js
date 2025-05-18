import { renderHome } from "./home.js";
import { renderProducts } from "./products.js";
import { renderSuppliers } from "./suppliers.js";
import { renderCustomers } from "./customers.js";

const routes = {
  "#/": renderHome,
  "#/products": renderProducts,
  "#/suppliers": renderSuppliers,
  "#/customers": renderCustomers,
  // you may add "#/add-product" that simply calls renderProducts() and scrolls to the form
};

export function navigateTo() {
  const route = routes[location.hash] || routes["#/"];
  route();
}

// initial load & hash change
window.addEventListener("hashchange", navigateTo);
window.addEventListener("DOMContentLoaded", navigateTo);
