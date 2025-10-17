import React from 'react';
import type { Publication, SortConfig } from '../types';
import { SortIcon } from './icons';

interface DataTableProps {
  data: Publication[];
  sortConfig: SortConfig | null;
  requestSort: (key: keyof Publication) => void;
}

const headers: { key: keyof Publication; label: string }[] = [
  { key: 'published_date', label: 'Published Date' },
  { key: 'title', label: 'Title' },
  { key: 'authors', label: 'Authors' },
  { key: 'journal', label: 'Journal' },
  { key: 'organization', label: 'Organization' },
  { key: 'pdf_url', label: 'PDF URL' },
];

export const DataTable: React.FC<DataTableProps> = ({ data, sortConfig, requestSort }) => {
  if (data.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <p className="text-xl">No results found.</p>
        <p>Try adjusting your search or filter criteria.</p>
      </div>
    );
  }

  return (
    <table className="min-w-full divide-y divide-gray-700">
      <thead className="bg-gray-800/50">
        <tr>
          {headers.map((header) => (
            <th
              key={header.key}
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
            >
              <div
                className="flex items-center gap-2 cursor-pointer select-none group"
                onClick={() => requestSort(header.key)}
              >
                <span className="group-hover:text-brand-primary transition-colors">{header.label}</span>
                <SortIcon
                  direction={sortConfig?.key === header.key ? sortConfig.direction : undefined}
                />
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-brand-secondary divide-y divide-gray-700">
        {data.map((item, index) => (
          <tr key={`${item.pdf_url}-${index}`} className="hover:bg-gray-800/50 transition-colors">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-brand-light">{item.published_date}</td>
            <td className="px-6 py-4 whitespace-normal text-sm text-gray-300 max-w-xs break-words">{item.title}</td>
            <td className="px-6 py-4 whitespace-normal text-sm text-gray-300">{item.authors}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{item.journal}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{item.organization}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
              <a 
                href={item.pdf_url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-brand-primary hover:text-cyan-400 hover:underline"
              >
                View PDF
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
