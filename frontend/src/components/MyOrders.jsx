// src/components/MyOrders.jsx
import OrdersTable from "./OrdersTable";

const ORDER_STATUS_OPTIONS = [
  "",
  "CREATED",
  "ASSIGNED",
  "PICKED_UP",
  "IN_TRANSIT",
  "DELIVERED",
  "COMPLETED",
  "CANCELLED",
];

function MyOrders({
  orders,
  onReload,
  currentPage,
  pageSize,
  onSelectOrder,
  filters,
  onFiltersChange,
}) {
  const handleResetFilters = () => {
    onFiltersChange({
      orderCode: "",
      status: "",
      dateFrom: "",
      dateTo: "",
    });
  };

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Danh sách đơn hàng của tôi</h2>

      {/* Bộ lọc */}
      <div className="mb-4 grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          type="text"
          className="border px-3 py-2 rounded w-full"
          placeholder="Tìm kiếm theo Mã đơn..."
          value={filters.orderCode}
          onChange={(e) =>
            onFiltersChange((prev) => ({ ...prev, orderCode: e.target.value }))
          }
        />
        <select
          className="border px-3 py-2 rounded w-full"
          value={filters.status}
          onChange={(e) =>
            onFiltersChange((prev) => ({ ...prev, status: e.target.value }))
          }
        >
          {ORDER_STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>
              {status === "" ? "Tất cả trạng thái" : status}
            </option>
          ))}
        </select>
        <input
          type="date"
          className="border px-3 py-2 rounded w-full"
          value={filters.dateFrom}
          onChange={(e) =>
            onFiltersChange((prev) => ({ ...prev, dateFrom: e.target.value }))
          }
        />
        <input
          type="date"
          className="border px-3 py-2 rounded w-full"
          value={filters.dateTo}
          onChange={(e) =>
            onFiltersChange((prev) => ({ ...prev, dateTo: e.target.value }))
          }
        />
      </div>

      {/* Nút thao tác */}
      <div className="flex justify-end space-x-2 mb-4">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer"
          onClick={onReload}
        >
          Làm mới dữ liệu
        </button>
        <button
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded cursor-pointer"
          onClick={handleResetFilters}
        >
          Đặt lại bộ lọc
        </button>
      </div>

      {/* Bảng */}
      {orders.length === 0 ? (
        <p>Không tìm thấy đơn hàng nào phù hợp.</p>
      ) : (
        <OrdersTable
          orders={orders}
          onSelectOrder={onSelectOrder}
          currentPage={currentPage}
          pageSize={pageSize}
        />
      )}
    </div>
  );
}

export default MyOrders;
