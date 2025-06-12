import { useEffect, useState } from "react";
import adminAPI from "../api/adminApi";
import Pagination from "./Pagination";

function AssignStaffModal({ visible, onClose, onAssign }) {
  const pageSize = 5;

  const [staffList, setStaffList] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchStaff = async (currentPage) => {
    setLoading(true);
    try {
      // ✅ Gọi API đúng với object { page, size }
      const res = await adminAPI.getDeliveryStaff({
        page: currentPage,
        size: pageSize,
      });

      // ✅ Đảm bảo res.content tồn tại
      setStaffList(res.content || []);
      setTotalPages(res.totalPages || 1);

      console.log("Staff page data:", res);
    } catch (error) {
      console.error("Error fetching staff:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (visible) {
      setPage(0); // reset page khi mở lại modal
    }
  }, [visible]);

  useEffect(() => {
    if (visible) {
      fetchStaff(page);
    }
  }, [visible, page]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedStaff) {
      onAssign(selectedStaff);
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-gray-300/50 transition-opacity flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl font-semibold mb-4">Chọn nhân viên giao hàng</h2>
        <form
          onSubmit={handleSubmit}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
            }
          }}
        >
          <select
            className="border px-3 py-2 rounded w-full mb-4"
            value={selectedStaff}
            onChange={(e) => setSelectedStaff(e.target.value)}
          >
            <option value="">-- Chọn nhân viên --</option>
            {staffList.map((staff) => (
              <option key={staff.username} value={staff.username}>
                {staff.username} - {staff.fullName}
              </option>
            ))}
          </select>

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />

          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded"
              onClick={onClose}
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
              disabled={!selectedStaff}
            >
              Xác nhận giao
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AssignStaffModal;
