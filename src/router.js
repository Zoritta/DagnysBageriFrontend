export function route() {
  const path = window.location.pathname;
  switch (true) {
    case /products/.test(path):
      import("./pages/productsPage.js").then((m) => m.mountProductsPage());
      break;
    case /suppliers/.test(path):
      import("./pages/suppliersPage.js").then((m) => m.mountSuppliersPage());
      break;
    case /customers/.test(path):
      import("./pages/customersPage.js").then((m) => m.mountCustomersPage());
      break;
    case /orders/.test(path):
      import("./pages/ordersPage.js").then((m) => m.mountOrdersPage());
      break;
    default:
      document.getElementById("app").textContent = "Page not found.";
  }
}
