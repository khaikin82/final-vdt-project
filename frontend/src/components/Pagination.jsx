import { useEffect, useState } from "react";

function Pagination({ currentPage, totalPages, onPageChange }) {
  const [pageInput, setPageInput] = useState(currentPage + 1);

  useEffect(() => {
    setPageInput(currentPage + 1);
  }, [currentPage]);

  const handleInputChange = (e) => {
    // let value = parseInt(e.target.value) || 1;
    let value = parseInt(e.target.value);

    if (value < 0) value = 0;
    if (value > totalPages) value = totalPages;
    setPageInput(value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      let value = pageInput;
      if (value < 0) value = 0;
      if (value > totalPages) value = totalPages;
      onPageChange(value - 1);
    }
  };

  return (
    <div className="flex items-center justify-center mt-4 space-x-2">
      <button
        type="button"
        onClick={() => onPageChange(Math.max(currentPage - 1, 0))}
        disabled={currentPage === 0}
        className="px-2 py-1 border rounded cursor-pointer"
      >
        Previous
      </button>
      <span>Trang:</span>
      <input
        type="number"
        value={pageInput}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        className="w-12 text-center border border-gray-300 rounded px-1"
      />
      <span> / {totalPages}</span>
      <button
        type="button"
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages - 1))}
        disabled={currentPage >= totalPages - 1}
        className="px-2 py-1 border rounded cursor-pointer"
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
