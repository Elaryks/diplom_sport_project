import { PagingOptions } from "../types/pagingOptions";

export interface IApiControllerGet<T, TFilter> {
  getAll: (opts?: PagingOptions & TFilter & { [key: string]: any }) => Promise<T[] | null>;
  // autocomplete: (opts?: PagingOptions & TFilter & { [key: string]: any }) => Promise<PagingModel<T> | null>;
  getById: (id: number, opts?: { [key: string]: any }) => Promise<T | null>;
}
