export function renderMenu(onSelect) {
  const nav = document.getElementById("nav-menu");
  nav.innerHTML = "";

  const pages = [
    { name: "Suppliers", id: "suppliers" },
    { name: "Products", id: "products" },
    { name: "Customers", id: "customers" },
  ];

  pages.forEach((page) => {
    const btn = document.createElement("button");
    btn.textContent = page.name;
    btn.addEventListener("click", () => onSelect(page.id));
    nav.appendChild(btn);
  });
}
