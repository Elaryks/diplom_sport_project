import { AxiosInstance } from "axios";
import { PagingOptions } from "../types/pagingOptions";
import { ApiControllerBase } from "./apiControllerBase";
import { IApiControllerGet } from "../interfaces/iApiControllerGet";

export abstract class ApiControllerGet<T, TFilter> extends ApiControllerBase implements IApiControllerGet<T, TFilter> {
  protected constructor(cl: AxiosInstance, v: string, controllerName: string) {
    super(cl, v, controllerName);
  }

  async getById(id: number, opts?: any): Promise<T | null> {
    return await this.process<T>(this.get(id.toString(), { params: opts }));
  }

  async getAll(opts?: PagingOptions & TFilter & { [key: string]: any }): Promise<T[] | null> {
    return await this.process<T[]>(this.get("", { params: opts }));
  }
}
