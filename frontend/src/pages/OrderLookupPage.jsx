import { useState } from "react";
import OrderDetailModal from "../components/OrderDetailModal";
import userAPI from "../api/userApi";

function OrderLookupPage() {
  const [orderCode, setOrderCode] = useState("");
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // ⛔ Ngăn form submit reload trang
    setError("");
    setOrder(null);

    if (!orderCode.trim()) {
      setError("Vui lòng nhập mã đơn hàng.");
      return;
    }

    try {
      const fetchedOrder = await userAPI.findOrder(orderCode);
      if (fetchedOrder) {
        setOrder(fetchedOrder);
      } else {
        setError("Không tìm thấy đơn hàng.");
      }
    } catch (err) {
      setError("Không tìm thấy đơn hàng.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold mb-6">Tra cứu đơn hàng</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <input
          type="text"
          placeholder="Nhập mã đơn hàng..."
          value={orderCode}
          onChange={(e) => setOrderCode(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit" // ✅ Đây là submit, không dùng onClick
          className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer"
        >
          Tra cứu
        </button>
        {error && (
          <div className="mt-2 text-red-500 font-medium text-center">
            {error}
          </div>
        )}
      </form>

      {order && (
        <div className="mt-8 w-full max-w-3xl bg-white p-6 rounded-lg shadow">
          <OrderDetailModal order={order} />
        </div>
      )}
    </div>
  );
}

export default OrderLookupPage;
