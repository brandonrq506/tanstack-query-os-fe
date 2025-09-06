export type PaginationMeta = {
  page: number;
  per_page: number;
  total_pages: number;
  total_count: number;
  next: number | null;
  prev: number | null;
};

