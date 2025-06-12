function OrdersTable({ orders, onSelectOrder, currentPage, pageSize }) {
  return (
    <table className="w-full border-collapse border border-gray-300 text-sm">
      <thead>
        <tr className="bg-blue-300">
          <th className="border px-2 py-1">STT</th>
          <th className="border px-2 py-1">Mã đơn</th>
          <th className="border px-2 py-1">Mô tả</th>
          <th className="border px-2 py-1">Người nhận</th>
          <th className="border px-2 py-1">Địa chỉ giao</th>
          <th className="border px-2 py-1">Trạng thái</th>
          <th className="border px-2 py-1">Ngày tạo</th>
          <th className="border px-2 py-1">Hành động</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order, index) => {
          // Thêm class cho background chẵn/lẻ
          const rowClass = index % 2 === 0 ? "bg-white" : "bg-blue-50";
          const stt = currentPage * pageSize + index + 1;

          return (
            <tr key={order.orderCode} className={`${rowClass}`}>
              <td className="border px-2 py-1">{stt}</td>
              <td className="border px-2 py-1">{order.orderCode}</td>
              <td className="border px-2 py-1">{order.description}</td>
              <td className="border px-2 py-1">{order.receiverName}</td>
              <td className="border px-2 py-1">{order.deliveryAddress}</td>
              <td className="border px-2 py-1">{order.status}</td>
              <td className="border px-2 py-1">
                {new Date(order.createdAt).toLocaleString("vi-VN")}
              </td>
              <td className="border px-2 py-1 text-center">
                <button
                  className="text-blue-600 underline hover:text-blue-900 cursor-pointer"
                  onClick={() => onSelectOrder(order)}
                >
                  Xem chi tiết
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default OrdersTable;
