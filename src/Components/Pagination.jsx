
const Pagination = ({ totalPages, currentPage, handlePageChange }) => {
  if (totalPages <= 1) return null;

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    handlePageChange?.(page);
  };

  const getPaginationRange = () => {
    const totalPageNumbersToShow = 7;
    const pages = [];

    if (totalPages <= totalPageNumbersToShow) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      const leftSibling = Math.max(currentPage - 1, 2);
      const rightSibling = Math.min(currentPage + 1, totalPages - 1);

      pages.push(1);

      if (leftSibling > 2) pages.push('...');
      for (let i = leftSibling; i <= rightSibling; i++) pages.push(i);
      if (rightSibling < totalPages - 1) pages.push('...');

      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex justify-center items-center gap-1 mt-6 flex-wrap">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 border rounded disabled:opacity-40"
      >
        Prev
      </button>

      {getPaginationRange().map((page, index) =>
        page === '...' ? (
          <span key={index} className="px-3 py-1 text-gray-500 select-none">...</span>
        ) : (
          <button
            key={index}
            onClick={() => goToPage(page)}
            className={`px-3 py-1 rounded border ${
              page === currentPage
                ? 'bg-blue-500 text-white font-bold'
                : 'hover:bg-gray-100'
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 border rounded disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
