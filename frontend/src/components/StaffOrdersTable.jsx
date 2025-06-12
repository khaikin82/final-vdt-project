// StaffOrdersTable.jsx
import React from "react";

const STATUS_FLOW = [
  "CREATED",
  "ASSIGNED",
  "PICKED_UP",
  "IN_TRANSIT",
  "DELIVERED",
  "COMPLETED",
  "CANCELLED",
];

function StaffOrdersTable({
  orders,
  updatingOrderId,
  onUpdateStatus,
  onCancelOrder,
  onOpenDetail,
}) {
  return (
    <table className="w-full border-collapse border border-gray-300 text-sm">
      <thead>
        <tr className="bg-blue-300">
          <th className="border px-2 py-1">Mã đơn</th>
          <th className="border px-2 py-1">Người nhận</th>
          <th className="border px-2 py-1">Địa chỉ giao</th>
          <th className="border px-2 py-1">Trạng thái</th>
          <th className="border px-2 py-1 text-center">Hành động</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order, index) => {
          const currentIndex = STATUS_FLOW.indexOf(order.status);
          const canUpdate =
            currentIndex !== -1 &&
            !["COMPLETED", "CANCELLED"].includes(order.status) &&
            currentIndex < STATUS_FLOW.length - 2;

          const canCancel = !["COMPLETED", "CANCELLED"].includes(order.status);

          // Thêm class cho background chẵn/lẻ
          const rowClass = index % 2 === 0 ? "bg-white" : "bg-blue-50";

          return (
            <tr
              key={order.orderCode}
              className={`${rowClass} hover:bg-gray-100 cursor-pointer`}
            >
              <td
                className="border px-2 py-1"
                onClick={() => onOpenDetail(order)}
              >
                {order.orderCode}
              </td>
              <td
                className="border px-2 py-1"
                onClick={() => onOpenDetail(order)}
              >
                {order.receiverName}
              </td>
              <td
                className="border px-2 py-1"
                onClick={() => onOpenDetail(order)}
              >
                {order.receiverAddress}
              </td>
              <td
                className="border px-2 py-1 font-semibold"
                onClick={() => onOpenDetail(order)}
              >
                {order.status}
              </td>
              <td className="border px-2 py-1 text-center space-x-2">
                {canUpdate ? (
                  <button
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
                    onClick={() => onUpdateStatus(order)}
                    disabled={updatingOrderId === order.orderCode}
                  >
                    {updatingOrderId === order.orderCode
                      ? "Đang cập nhật..."
                      : `Cập nhật: ${STATUS_FLOW[currentIndex + 1]}`}
                  </button>
                ) : (
                  <span>Không thể cập nhật</span>
                )}
                {canCancel && (
                  <button
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 cursor-pointer"
                    onClick={() => onCancelOrder(order)}
                    disabled={updatingOrderId === order.orderCode}
                  >
                    {updatingOrderId === order.orderCode
                      ? "Đang huỷ..."
                      : "Huỷ đơn"}
                  </button>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default StaffOrdersTable;
