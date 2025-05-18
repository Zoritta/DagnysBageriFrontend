const links = [
  { href: "/products.html", label: "Products" },
  { href: "/suppliers.html", label: "Suppliers" },
  { href: "/customers.html", label: "Customers" },
  { href: "/orders.html", label: "Orders" },
];
export function mountNavbar() {
  const nav = document.getElementById("navbar");
  nav.innerHTML = `
      <ul class="nav-list">
        ${links
          .map((l) => `<li><a href="${l.href}">${l.label}</a></li>`)
          .join("")}
      </ul>`;
}
