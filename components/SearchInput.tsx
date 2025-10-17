
import React from 'react';

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const SearchInput: React.FC<SearchInputProps> = (props) => {
  return (
    <div className="relative w-full md:w-1/2 lg:w-1/3">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
        </svg>
      </div>
      <input
        type="text"
        className="block w-full bg-brand-dark border border-gray-600 rounded-lg py-2 pl-10 pr-3 text-brand-light placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition duration-150 ease-in-out"
        {...props}
      />
    </div>
  );
};
