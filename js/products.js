import {
  fetchProducts,
  fetchProductByName,
  addProduct,
  updateProductPrice,
} from "./api.js";

export async function renderProducts() {
  const container = document.getElementById("main-content");
  container.innerHTML = "<h2>Products</h2>";

  try {
    const response = await fetchProducts();

    if (
      !response.success ||
      !Array.isArray(response.products) ||
      response.products.length === 0
    ) {
      container.innerHTML += "<p>No products found.</p>";
    } else {
      const ul = document.createElement("ul");
      response.products.forEach((product) => {
        const li = document.createElement("li");
        li.textContent = `${product.name} - ${product.price} SEK`;
        ul.appendChild(li);
      });
      container.appendChild(ul);
    }

    // Form: Add new product
    const addForm = document.createElement("form");
    addForm.innerHTML = `
      <h3>Add New Product</h3>
      <label>
        Name:<br />
        <input type="text" name="name" required />
      </label><br />
      <label>
        Price:<br />
        <input type="number" name="price" required min="0" step="0.01" />
      </label><br />
      <label>
        Weight:<br />
        <input type="number" name="weight" min="0" step="0.01" />
      </label><br />
      <label>
        Quantity Per Package:<br />
        <input type="number" name="quantityPerPackage" min="0" step="1" />
      </label><br />
      <label>
        Expiration Date:<br />
        <input type="date" name="expirationDate" />
      </label><br />
      <label>
        Manufacturing Date:<br />
        <input type="date" name="manufacturingDate" />
      </label><br />
      <button type="submit">Add Product</button>
    `;

    addForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData(addForm);
      const newProduct = {
        ProductName: formData.get("name"),
        PricePerUnit: parseFloat(formData.get("price")),
        Weight: parseFloat(formData.get("weight")) || 0,
        QuantityPerPackage: parseInt(formData.get("quantityPerPackage")) || 0,
        ExpirationDate: formData.get("expirationDate") || null,
        ManufacturingDate: formData.get("manufacturingDate") || null,
      };

      try {
        const res = await addProduct(newProduct);
        if (res.success) {
          alert(res.message);
          renderProducts(); // refresh list
        } else {
          alert("Failed to add product.");
        }
      } catch (err) {
        alert("Failed to add product: " + err.message);
      }
    });
    container.appendChild(addForm);

    // Form: Fetch product by name
    const fetchByNameForm = document.createElement("form");
    fetchByNameForm.innerHTML = `
      <h3>Find Product By Name</h3>
      <input type="text" name="searchName" placeholder="Product name" required />
      <button type="submit">Search</button>
      <div id="search-result"></div>
    `;

    fetchByNameForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const searchName = fetchByNameForm.searchName.value.trim();
      const resultDiv = fetchByNameForm.querySelector("#search-result");
      resultDiv.textContent = "";

      try {
        const res = await fetchProductByName(searchName);
        if (res.success && res.product) {
          const p = document.createElement("p");
          p.textContent = `Name: ${res.product.name}, Price: ${res.product.price} SEK`;
          resultDiv.appendChild(p);
        } else {
          resultDiv.textContent = `Product "${searchName}" not found.`;
        }
      } catch (err) {
        resultDiv.textContent = "Error fetching product: " + err.message;
      }
    });
    container.appendChild(fetchByNameForm);

    // Form: Update product price by name
    const updatePriceForm = document.createElement("form");
    updatePriceForm.innerHTML = `
      <h3>Update Product Price</h3>
      <label>
        Product Name:<br />
        <input type="text" name="updateName" required />
      </label><br />
      <label>
        New Price:<br />
        <input type="number" name="newPrice" required min="0" step="0.01" />
      </label><br />
      <button type="submit">Update Price</button>
    `;

    updatePriceForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData(updatePriceForm);
      const productName = formData.get("updateName").trim();
      const newPrice = parseFloat(formData.get("newPrice"));

      try {
        const res = await updateProductPrice(productName, newPrice);
        if (res.success) {
          alert(res.message);
          renderProducts(); // refresh list with updated price
        } else {
          alert("Failed to update price.");
        }
      } catch (err) {
        alert("Failed to update price: " + err.message);
      }
    });
    container.appendChild(updatePriceForm);
  } catch (error) {
    container.innerHTML += `<p>Error loading products: ${error.message}</p>`;
  }
}
