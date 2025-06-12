import { useState } from "react";
import userAPI from "../api/userApi";
import Modal from "../components/Modal";

const CreateOrderForm = () => {
  const [form, setForm] = useState({
    receiverName: "",
    receiverPhone: "",
    receiverAddress: "",
    pickupAddress: "",
    deliveryAddress: "",
    description: "",
    weight: "",
    size: "",
    note: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  // State điều khiển popup
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (
      !form.receiverName ||
      !form.receiverPhone ||
      !form.receiverAddress ||
      !form.pickupAddress ||
      !form.deliveryAddress ||
      !form.description ||
      !form.size ||
      !form.weight
    ) {
      setError("Vui lòng điền đầy đủ các trường bắt buộc.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        receiverName: form.receiverName,
        receiverPhone: form.receiverPhone,
        receiverAddress: form.receiverAddress,
        pickupAddress: form.pickupAddress,
        deliveryAddress: form.deliveryAddress,
        description: form.description,
        size: form.size,
        weight: parseFloat(form.weight),
        note: form.note,
      };

      await userAPI.createOrder(payload);

      setSuccessMsg("Đơn hàng đã được tạo thành công!");
      setModalMessage("Đơn hàng đã được tạo thành công!");
      setModalVisible(true);

      setForm({
        receiverName: "",
        receiverPhone: "",
        receiverAddress: "",
        pickupAddress: "",
        deliveryAddress: "",
        description: "",
        weight: "",
        size: "",
        note: "",
      });
    } catch (err) {
      const errMsg =
        err.response?.data?.message || err.message || "Tạo đơn hàng thất bại";
      setError(errMsg);
      setModalMessage(errMsg);
      setModalVisible(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto pt-1">
      {/* <div className="bg-white p-6 rounded shadow-md"> */}
      <form onSubmit={handleSubmit} className="bg-white">
        {/* Hiển thị lỗi / thành công */}
        {error && (
          <div className="mb-4 text-red-600 font-semibold text-center">
            {error}
          </div>
        )}
        {successMsg && (
          <div className="mb-4 text-green-600 font-semibold text-center">
            {successMsg}
          </div>
        )}

        {/* Chia 2 cột */}
        <div className="flex flex-col md:flex-row gap-10">
          {/* Cột trái - Thông tin người nhận */}
          <div className="flex-1 space-y-4">
            <h2 className="text-xl font-semibold mb-4">Thông tin người nhận</h2>
            <div>
              <label className="block mb-1 font-medium">Tên người nhận *</label>
              <input
                type="text"
                name="receiverName"
                value={form.receiverName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
                disabled={loading}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">
                Số điện thoại người nhận *
              </label>
              <input
                type="tel"
                name="receiverPhone"
                value={form.receiverPhone}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
                disabled={loading}
                pattern="[0-9]{9,15}"
                title="Số điện thoại gồm 9 đến 15 chữ số"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">
                Địa chỉ người nhận *
              </label>
              <input
                type="text"
                name="receiverAddress"
                value={form.receiverAddress}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
                disabled={loading}
              />
            </div>
          </div>

          {/* Cột phải - Thông tin đơn hàng */}
          <div className="flex-1 space-y-4">
            <h2 className="text-xl font-semibold mb-4">Thông tin đơn hàng</h2>
            <div>
              <label className="block mb-1 font-medium">Mô tả đơn hàng *</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
                rows={3}
                required
                disabled={loading}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium">
                  Kích thước (cm) *
                </label>
                <input
                  type="text"
                  name="size"
                  value={form.size}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="Ví dụ: 30x20x10"
                  required
                  disabled={loading}
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">
                  Trọng lượng (kg) *
                </label>
                <input
                  type="number"
                  name="weight"
                  value={form.weight}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  step="0.01"
                  min="0"
                  required
                  disabled={loading}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Địa chỉ lấy & giao hàng - FULL WIDTH */}
        <div className="mt-8 space-y-6">
          <h2 className="text-xl font-semibold mb-4">
            Địa chỉ lấy & giao hàng
          </h2>
          <div>
            <label className="block mb-1 font-medium">Địa chỉ lấy hàng *</label>
            <input
              type="text"
              name="pickupAddress"
              value={form.pickupAddress}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
              disabled={loading}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">
              Địa chỉ giao hàng *
            </label>
            <input
              type="text"
              name="deliveryAddress"
              value={form.deliveryAddress}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
              disabled={loading}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">
              Ghi chú thêm (tùy chọn)
            </label>
            <textarea
              name="note"
              value={form.note}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              rows={2}
              disabled={loading}
            />
          </div>
        </div>

        {/* Submit */}
        <div className="mt-6">
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded text-white font-semibold transition cursor-pointer ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? "Đang xử lý..." : "Tạo đơn"}
          </button>
        </div>
      </form>

      {/* Modal hiển thị thông báo */}
      <Modal
        visible={modalVisible}
        message={modalMessage}
        onClose={() => setModalVisible(false)}
      />
    </div>
  );
};

export default CreateOrderForm;
