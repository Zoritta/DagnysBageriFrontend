import { register } from "./router.js";
import products from "./ui/products.js";
import suppliers from "./ui/suppliers.js";
import customers from "./ui/customers.js";

// register routes
register("/products", products);
register("/suppliers", suppliers);
register("/customers", customers);
