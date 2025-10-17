
import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const getPaginationItems = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (currentPage > 3) {
        pages.push('...');
      }
      if (currentPage > 2) {
        pages.push(currentPage - 1);
      }
      if (currentPage !== 1 && currentPage !== totalPages) {
        pages.push(currentPage);
      }
      if (currentPage < totalPages - 1) {
        pages.push(currentPage + 1);
      }
      if (currentPage < totalPages - 2) {
        pages.push('...');
      }
      pages.push(totalPages);
    }
    return pages;
  };
  
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  if (totalPages <= 1) return null;

  return (
    <nav className="flex items-center justify-center mt-6" aria-label="Pagination">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-600 bg-brand-secondary text-sm font-medium text-gray-300 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        <span className="sr-only">Previous</span>
        &lt;
      </button>
      {getPaginationItems().map((page, index) =>
        page === '...' ? (
          <span key={`ellipsis-${index}`} className="relative inline-flex items-center px-4 py-2 border border-gray-600 bg-brand-secondary text-sm font-medium text-gray-400">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => handlePageChange(page as number)}
            className={`relative inline-flex items-center px-4 py-2 border border-gray-600 text-sm font-medium transition ${
              currentPage === page
                ? 'z-10 bg-brand-primary border-brand-primary text-white'
                : 'bg-brand-secondary text-gray-300 hover:bg-gray-800'
            }`}
          >
            {page}
          </button>
        )
      )}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-600 bg-brand-secondary text-sm font-medium text-gray-300 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        <span className="sr-only">Next</span>
        &gt;
      </button>
    </nav>
  );
};
