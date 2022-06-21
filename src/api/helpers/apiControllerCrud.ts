import { ApiControllerGet } from "./apiControllerGet";
import { IApiControllerCrud } from "../interfaces/iApiControllerCrud";
import { AxiosInstance } from "axios";

export abstract class ApiControllerCrud<T, TFilter>
  extends ApiControllerGet<T, TFilter>
  implements IApiControllerCrud<T>
{
  protected constructor(cl: AxiosInstance, v: string, controllerName: string) {
    super(cl, v, controllerName);
  }

  async create(m: T): Promise<T | null> {
    return await this.process<T>(this.post("", { data: m }));
  }

  async del(m: T): Promise<boolean | null> {
    return await this.process<boolean>(
      this.delete("", { data: m }),
      () => true,
      () => false
    );
    // return await this.process<boolean>(
    //   this.delete(m),
    //   () => true,
    //   () => false
    // );
  }

  async edit(id: number, m: T, params?: any): Promise<T | null> {
    // id.toString()
    return await this.process<T>(this.put("", { data: m, params: params }));
  }

  async editPartially(
    id: number,
    currentState: T,
    beforeState: T,
    params?: any,
    sendEmpty: boolean = false
  ): Promise<T | null> {
    const data: any = [];
    if (!sendEmpty && (!data || data.length == 0)) {
      return null;
    }
    return await this.process<T>(this.patch(id.toString(), { data: data, params: params }));
  }
}
