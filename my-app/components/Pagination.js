import { useState, useEffect } from "react";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";

export default function Pagination({ totalItems, itemsPerPage, currentPage, onPageChange }) {
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    setTotalPages(Math.ceil(totalItems / itemsPerPage));
  }, [totalItems, itemsPerPage]);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    onPageChange(page);
  };

  return (
    <div className="flex justify-center items-center mt-6 space-x-3">
      {/* Previous Button */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-2 flex items-center justify-center border rounded-full shadow-md transition-all duration-200 ${
          currentPage === 1
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-white text-black hover:bg-gray-100 hover:shadow-lg"
        }`}
      >
        <FaLongArrowAltLeft />
      </button>

      {/* Page Numbers */}
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          onClick={() => handlePageChange(i + 1)}
          className={`w-10 h-10 flex items-center justify-center border rounded-full shadow-md transition-all duration-200 ${
            currentPage === i + 1
              ? "bg-gray-800 text-white"
              : "bg-white text-black hover:bg-gray-100 hover:shadow-lg"
          }`}
        >
          {i + 1}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-2 flex items-center justify-center border rounded-full shadow-md transition-all duration-200 ${
          currentPage === totalPages
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-white text-black hover:bg-gray-100 hover:shadow-lg"
        }`}
      >
        <FaLongArrowAltRight />
      </button>
    </div>
  );
}
