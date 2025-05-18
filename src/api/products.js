import { api } from "./httpClient.js";
export const ProductsApi = {
  getAll: () => api.get("/products"),
  create: (dto) => api.post("/products", dto),
  updatePrice: (id, price) => api.put(`/products/${id}/price`, { price }),
};
