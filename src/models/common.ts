
export interface Option {
  label: string;
  value: string | number | boolean;
}

export type OptionsType = Option[];

export interface Paginate<T> {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalRecord: number;
  data?: T[];
}