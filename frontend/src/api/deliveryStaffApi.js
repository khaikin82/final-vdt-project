// src/api/deliveryStaffApi.js
import apiClient from "./apiClient";

const getMyStaffOrders = (page = 0, size = 10) => {
  const url = `/v1/orders/staff/my?page=${page}&size=${size}`;
  return apiClient.get(url);
};

const updateOrderStatus = (orderCode, newStatus) => {
  const url = `/v1/orders/by-code/${orderCode}/status?status=${newStatus}`;
  return apiClient.put(url);
};

const deliveryStaffAPI = {
  getMyStaffOrders,
  updateOrderStatus,
};

export default deliveryStaffAPI;
