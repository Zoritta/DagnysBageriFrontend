import { api } from "./httpClient.js";
export const OrdersApi = {
  getAll: () => api.get("/orders"),
  create: (dto) => api.post("/orders", dto),
};
