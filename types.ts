export interface Publication {
  published_date: string;
  title: string;
  authors: string;
  journal: string;
  organization: string;
  pdf_url: string;
}

export type SortDirection = 'ascending' | 'descending';

export interface SortConfig {
  key: keyof Publication;
  direction: SortDirection;
}

export type FetchStatus = 'idle' | 'loading' | 'success' | 'error';
