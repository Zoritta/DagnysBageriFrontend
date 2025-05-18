const routes = {};

function register(path, component) {
  routes[path] = component;
}

function resolve() {
  const view = document.getElementById("view");
  const hash = location.hash.slice(1) || "/products";
  const page = routes[hash];
  view.innerHTML = ""; // clear
  page ? page(view) : (view.textContent = "Page not found");
}

window.addEventListener("hashchange", resolve);
window.addEventListener("DOMContentLoaded", resolve);

export { register };
