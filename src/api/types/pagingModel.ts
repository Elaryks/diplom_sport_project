import { PagingOptions } from "./pagingOptions";

export type PagingModel<T> = {
  pagingOptions: PagingOptions;
  totalItems: number;
  totalPages: number;
  items: T[];
};
