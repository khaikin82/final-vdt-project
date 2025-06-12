function AdminStaffTable({ staffList, currentPage, pageSize }) {
  return (
    <table className="w-full border">
      <thead>
        <tr className="bg-gray-200">
          <th className="border px-2 py-1">STT</th>
          <th className="py-2 px-4 border">Username</th>
          <th className="py-2 px-4 border">Full Name</th>
          <th className="py-2 px-4 border">Email</th>
          <th className="py-2 px-4 border">Phone</th>
        </tr>
      </thead>

      <tbody>
        {staffList.length === 0 ? (
          <tr>
            <td colSpan={5} className="py-2 text-center text-gray-500">
              Không có nhân viên nào.
            </td>
          </tr>
        ) : (
          staffList.map((staff, index) => {
            const rowClass = index % 2 === 0 ? "bg-white" : "bg-gray-100";
            const stt = currentPage * pageSize + index + 1;
            return (
              <tr key={staff.username} className={`${rowClass}`}>
                <td className="border px-2 py-1">{stt}</td>
                <td className="py-2 px-4 border">{staff.username}</td>
                <td className="py-2 px-4 border">{staff.fullName}</td>
                <td className="py-2 px-4 border">{staff.email}</td>
                <td className="py-2 px-4 border">{staff.phone}</td>
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  );
}

export default AdminStaffTable;
