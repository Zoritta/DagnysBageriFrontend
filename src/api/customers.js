import { api } from "./httpClient.js";
export const CustomersApi = {
  getAll: () => api.get("/customers"),
  create: (dto) => api.post("/customers", dto),
};
