import { useEffect, useState } from "react";
import deliveryStaffAPI from "../api/deliveryStaffApi";
import Modal from "../components/Modal";
import OrderDetailModal from "../components/OrderDetailModal";
import StaffOrdersTable from "../components/StaffOrdersTable";
import Pagination from "../components/Pagination";

const STATUS_FLOW = [
  "CREATED",
  "ASSIGNED",
  "PICKED_UP",
  "IN_TRANSIT",
  "DELIVERED",
  "COMPLETED",
  "CANCELLED",
];

function DeliveryStaffDashboard() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [updatingOrderId, setUpdatingOrderId] = useState(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Pagination state
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;

  const fetchOrders = async () => {
    try {
      const res = await deliveryStaffAPI.getMyStaffOrders(page, pageSize);
      setOrders(res.content || []);
      setTotalPages(res.totalPages || 1);
      setError(null);
    } catch (err) {
      setError("Lấy đơn hàng thất bại.");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [page]);

  const handleUpdateStatus = async (order) => {
    if (updatingOrderId) return;
    const currentIndex = STATUS_FLOW.indexOf(order.status);
    if (
      currentIndex === -1 ||
      order.status === "COMPLETED" ||
      order.status === "CANCELLED" ||
      currentIndex >= STATUS_FLOW.length - 2
    ) {
      alert("Không thể cập nhật trạng thái tiếp theo.");
      return;
    }
    const nextStatus = STATUS_FLOW[currentIndex + 1];
    setUpdatingOrderId(order.orderCode);
    try {
      await deliveryStaffAPI.updateOrderStatus(order.orderCode, nextStatus);
      fetchOrders();
    } catch {
      alert("Cập nhật trạng thái thất bại.");
    } finally {
      setUpdatingOrderId(null);
    }
  };

  const handleCancelOrder = async (order) => {
    if (updatingOrderId) return;
    if (["COMPLETED", "CANCELLED"].includes(order.status)) {
      alert("Không thể huỷ đơn đã hoàn thành hoặc đã bị huỷ.");
      return;
    }
    const confirmed = window.confirm(
      `Bạn có chắc muốn huỷ đơn ${order.orderCode} không?`
    );
    if (!confirmed) return;

    setUpdatingOrderId(order.orderCode);
    try {
      await deliveryStaffAPI.updateOrderStatus(order.orderCode, "CANCELLED");
      fetchOrders();
    } catch {
      alert("Huỷ đơn thất bại.");
    } finally {
      setUpdatingOrderId(null);
    }
  };

  const openDetailModal = (order) => {
    setSelectedOrder(order);
    setDetailModalVisible(true);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Delivery Staff Dashboard</h1>
      <p className="mb-6 text-gray-700">
        Welcome to your Delivery Staff Dashboard. Here you can view your
        assigned orders and update their statuses.
      </p>

      {error ? (
        <p className="text-red-600">{error}</p>
      ) : orders.length === 0 ? (
        <p>Không có đơn hàng được giao.</p>
      ) : (
        <>
          <StaffOrdersTable
            orders={orders}
            updatingOrderId={updatingOrderId}
            onUpdateStatus={handleUpdateStatus}
            onCancelOrder={handleCancelOrder}
            onOpenDetail={openDetailModal}
          />
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}

      <Modal
        visible={detailModalVisible}
        message={selectedOrder && <OrderDetailModal order={selectedOrder} />}
        onClose={() => {
          setDetailModalVisible(false);
          setSelectedOrder(null);
        }}
      />
    </div>
  );
}

export default DeliveryStaffDashboard;
