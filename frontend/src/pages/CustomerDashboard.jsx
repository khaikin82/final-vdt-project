// src/pages/CustomerDashboard.jsx
import { useState } from "react";
import userAPI from "../api/userApi";
import Modal from "../components/Modal";
import CreateOrderForm from "../components/CreateOrderForm";
import MyOrders from "../components/MyOrders";
import OrderDetailModal from "../components/OrderDetailModal";
import Pagination from "../components/Pagination";
import usePaginatedData from "../hooks/usePaginatedData";

function CustomerDashboard() {
  const pageSize = 10;
  const [tab, setTab] = useState("create"); // "create" | "myOrders"
  const [orderPage, setOrderPage] = useState(0);

  // Lọc server-side
  const [orderFilters, setOrderFilters] = useState({
    orderCode: "",
    status: "",
    dateFrom: "",
    dateTo: "",
  });

  const {
    data: orders,
    totalPages: orderTotalPages,
    loading: loadingOrders,
    refetch: fetchOrders,
  } = usePaginatedData(
    (page, pageSize) =>
      userAPI.getMyOrders({ page, pageSize, ...orderFilters }),
    orderPage,
    [tab === "myOrders", orderFilters],
    pageSize
  );

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);

  const handleViewDetailClick = (order) => {
    setSelectedOrder(order);
    setDetailModalVisible(true);
  };

  const handleCreateOrderSuccess = (message) => {
    setModalMessage(message);
    setModalVisible(true);
    if (tab === "myOrders") {
      fetchOrders(); // Tự động refetch nếu đang ở tab "Đơn hàng của tôi"
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto pt-1">
      <h1 className="text-3xl font-bold mb-2">Customer Dashboard</h1>
      <p className="mb-6 text-gray-700">
        Welcome to your Customer Dashboard. You can place orders and track their
        status here.
      </p>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded cursor-pointer ${
            tab === "create"
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => setTab("create")}
        >
          Tạo đơn hàng
        </button>
        <button
          className={`px-4 py-2 rounded cursor-pointer ${
            tab === "myOrders"
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => {
            setTab("myOrders");
            setOrderPage(0);
          }}
        >
          Đơn hàng của tôi
        </button>
      </div>

      {/* Nội dung từng tab */}
      {tab === "create" && (
        <div className="bg-white p-6 rounded shadow-md">
          <CreateOrderForm onSuccess={handleCreateOrderSuccess} />
        </div>
      )}

      {tab === "myOrders" && (
        <>
          <MyOrders
            orders={orders}
            onReload={fetchOrders}
            currentPage={orderPage}
            pageSize={pageSize}
            onSelectOrder={handleViewDetailClick}
            filters={orderFilters}
            onFiltersChange={setOrderFilters}
          />
          <Pagination
            currentPage={orderPage}
            totalPages={orderTotalPages}
            onPageChange={setOrderPage}
          />
        </>
      )}

      {/* Modal thông báo */}
      <Modal
        visible={modalVisible}
        message={modalMessage}
        onClose={() => setModalVisible(false)}
      />

      {/* Modal chi tiết order */}
      {detailModalVisible && selectedOrder && (
        <Modal
          visible={true}
          message={<OrderDetailModal order={selectedOrder} />}
          onClose={() => {
            setDetailModalVisible(false);
            setSelectedOrder(null);
          }}
        />
      )}
    </div>
  );
}

export default CustomerDashboard;
