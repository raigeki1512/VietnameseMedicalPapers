
import React from 'react';
import { useTableData } from './hooks/useTableData';
import { SearchInput } from './components/SearchInput';
import { DataTable } from './components/DataTable';
import { Pagination } from './components/Pagination';
import { LoadingSpinner, ErrorIcon } from './components/icons';

const DATA_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSHAAiPFIlWiXooENqd4nDAqOzUfUNUlQoH-qQlCdnFTVmtnyeh1fbS-HNvnCtWb2Xp4YP0Ws8Xm_xS/pub?output=csv';
const ITEMS_PER_PAGE = 10;

export default function App() {
  const {
    status,
    paginatedData,
    totalRecords,
    filteredCount,
    searchTerm,
    setSearchTerm,
    sortConfig,
    requestSort,
    currentPage,
    setCurrentPage,
    totalPages,
  } = useTableData(DATA_URL, ITEMS_PER_PAGE);

  const renderContent = () => {
    switch (status) {
      case 'loading':
        return (
          <div className="flex flex-col items-center justify-center h-64 text-brand-light">
            <LoadingSpinner />
            <p className="mt-4 text-lg">Fetching data...</p>
          </div>
        );
      case 'error':
        return (
          <div className="flex flex-col items-center justify-center h-64 text-red-400">
            <ErrorIcon />
            <p className="mt-4 text-lg">Failed to load data. Please try again later.</p>
          </div>
        );
      case 'success':
        return (
          <>
            <DataTable
              data={paginatedData}
              sortConfig={sortConfig}
              requestSort={requestSort}
            />
            {filteredCount > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        );
      default:
        return null;
    }
  };
  
  const getStatusMessage = () => {
    if (searchTerm) {
        return `Found ${filteredCount} results for "${searchTerm}". Showing page ${currentPage} of ${totalPages}.`;
    }
    return `Total records: ${totalRecords}. Showing page ${currentPage} of ${totalPages}.`;
  }

  return (
    <div className="min-h-screen bg-brand-dark text-brand-light font-sans p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto max-w-7xl">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-cyan-400 py-2">
            Live Data Explorer
          </h1>
          <p className="text-lg text-gray-400 mt-2">
            Instantly search, sort, and paginate through live data.
          </p>
        </header>

        <main className="bg-brand-secondary shadow-2xl rounded-xl p-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <SearchInput
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search across all fields..."
            />
            <div className="text-sm text-gray-300 self-center md:self-end whitespace-nowrap">
              {status === 'success' && getStatusMessage()}
            </div>
          </div>
          <div className="overflow-x-auto">
             {renderContent()}
          </div>
        </main>
        
        <footer className="text-center mt-8 text-gray-500 text-sm">
            <p>Powered by React & Tailwind CSS</p>
        </footer>
      </div>
    </div>
  );
}
