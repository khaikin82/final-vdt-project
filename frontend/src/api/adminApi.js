// src/api/adminApi.js
import apiClient from "./apiClient";

// Lấy danh sách tất cả đơn hàng có phân trang
// const getOrders = (page = 0, size = 10) => {
//   const url = `/v1/orders?page=${page}&size=${size}`;
//   return apiClient.get(url);
// };

const getOrders = (params) => {
  const url = "/v1/orders";
  return apiClient.get(url, { params });
};

const getDeliveryStaff = (params) => {
  const url = "/v1/users/delivery-staff";
  return apiClient.get(url, { params });
};

// // Lấy danh sách nhân viên giao hàng có phân trang
// const getDeliveryStaff = (page = 0, size = 5) => {
//   const url = `/v1/users/delivery-staff?page=${page}&size=${size}`;
//   return apiClient.get(url);
// };

// Giao đơn cho nhân viên
const assignOrderToStaff = (orderCode, staffUsername) => {
  const url = `/v1/orders/by-code/${orderCode}/assign`;
  return apiClient.put(url, { staffUsername });
};

// Export theo object
const adminAPI = {
  getOrders,
  getDeliveryStaff,
  assignOrderToStaff,
};

export default adminAPI;
