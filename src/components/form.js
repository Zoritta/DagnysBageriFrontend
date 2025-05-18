export function ProductForm(onSubmit) {
  const form = document.createElement("form");
  form.innerHTML = `
      <h2>Add Product</h2>
      <label>Name <input name="name" required></label>
      <label>Price <input name="price" type="number" step="0.01" required></label>
      <label>SupplierId <input name="supplierId" type="number" required></label>
      <button>Add</button>`;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    data.price = parseFloat(data.price);
    data.supplierId = parseInt(data.supplierId, 10);
    onSubmit(data).then(() => form.reset());
  });
  return form;
}
