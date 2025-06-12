function OrderDetailModal({ order }) {
  return (
    <div className="text-left space-y-2 max-h-[70vh] overflow-y-auto">
      <h3 className="text-xl font-bold mb-2">Chi tiết đơn hàng</h3>
      <p>
        <strong>Mã đơn:</strong> {order.orderCode}
      </p>
      <p>
        <strong>Người nhận:</strong> {order.receiverName} ({order.receiverPhone}
        )
      </p>
      <p>
        <strong>Địa chỉ người nhận:</strong> {order.receiverAddress}
      </p>
      <p>
        <strong>Địa chỉ lấy hàng:</strong> {order.pickupAddress}
      </p>
      <p>
        <strong>Địa chỉ giao hàng:</strong> {order.deliveryAddress}
      </p>
      <p>
        <strong>Mô tả:</strong> {order.description}
      </p>
      <p>
        <strong>Kích thước:</strong> {order.size}
      </p>
      <p>
        <strong>Trọng lượng:</strong> {order.weight} kg
      </p>
      <p>
        <strong>Ghi chú:</strong> {order.note || "Không có"}
      </p>
      <p>
        <strong>Trạng thái:</strong> {order.status}
      </p>
      <p>
        <strong>Ngày tạo:</strong>{" "}
        {new Date(order.createdAt).toLocaleString("vi-VN")}
      </p>
      <p>
        <strong>Người tạo:</strong> {order.customerUsername}
      </p>
      <p>
        <strong>Nhân viên giao hàng:</strong>{" "}
        {order.deliveryStaffUsername || "Chưa phân công"}
      </p>

      {/* Tracking history */}
      <div>
        <strong>Lịch sử trạng thái:</strong>
        <ul className="list-disc ml-5 mt-1">
          {order.trackingHistory.map((item, index) => (
            <li key={index}>
              {item.status} - {new Date(item.changedAt).toLocaleString("vi-VN")}{" "}
              bởi {item.changedBy}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default OrderDetailModal;
