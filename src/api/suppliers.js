import { api } from "./httpClient.js";
export const SuppliersApi = {
  getAll: () => api.get("/suppliers"),
  create: (dto) => api.post("/suppliers", dto),
};
