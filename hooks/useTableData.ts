import { useState, useEffect, useMemo, useCallback } from 'react';
import type { Publication, SortConfig, SortDirection, FetchStatus } from '../types';
import { fetchPublications } from '../services/dataService';

export function useTableData(url: string, itemsPerPage: number) {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [status, setStatus] = useState<FetchStatus>('idle');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const loadData = async () => {
      setStatus('loading');
      try {
        const data = await fetchPublications(url);
        setPublications(data);
        setStatus('success');
      } catch (error) {
        setStatus('error');
      }
    };
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  const filteredData = useMemo(() => {
    if (!searchTerm) return publications;
    
    const lowercasedFilter = searchTerm.toLowerCase();
    return publications.filter(item => 
      Object.values(item).some(value => 
        String(value).toLowerCase().includes(lowercasedFilter)
      )
    );
  }, [publications, searchTerm]);

  const sortedData = useMemo(() => {
    let sortableItems = [...filteredData];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [filteredData, sortConfig]);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const paginatedData = useMemo(() => {
    if(currentPage > totalPages && totalPages > 0) {
        setCurrentPage(totalPages);
    } else if (currentPage < 1 && totalPages > 0) {
        setCurrentPage(1);
    }
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedData, currentPage, itemsPerPage, totalPages]);
  
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortConfig]);

  const requestSort = useCallback((key: keyof Publication) => {
    let direction: SortDirection = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  }, [sortConfig]);

  return {
    status,
    paginatedData,
    totalRecords: publications.length,
    filteredCount: filteredData.length,
    searchTerm,
    setSearchTerm,
    sortConfig,
    requestSort,
    currentPage,
    setCurrentPage,
    totalPages,
  };
}
