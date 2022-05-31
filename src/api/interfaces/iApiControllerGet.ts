import { PagingOptions } from "../types/pagingOptions";
import { PagingModel } from "../types/pagingModel";

export interface IApiControllerGet<T, TFilter> {
  getAll: (opts?: PagingOptions & TFilter & { [key: string]: any }) => Promise<PagingModel<T> | null>;
  // autocomplete: (opts?: PagingOptions & TFilter & { [key: string]: any }) => Promise<PagingModel<T> | null>;
  getById: (id: number, opts?: { [key: string]: any }) => Promise<T | null>;
}
