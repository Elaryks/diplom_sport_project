import { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export abstract class ApiControllerBase {
  protected client: AxiosInstance;
  protected v: string;
  protected controllerName: string;

  protected constructor(cl: AxiosInstance, v: string, controllerName: string) {
    this.client = cl;
    this.v = v;
    this.controllerName = controllerName;
  }

  protected url(next: string = "") {
    // + this.v + "/" + this.controllerName +
    const controllersToIgnorePrefix: string[] = ["auth"];

    return (
      "api" +
      (controllersToIgnorePrefix.indexOf(this.controllerName) == -1 ? "/" + this.controllerName : "") +
      (next != "" ? "/" + next : "")
    );
  }

  protected async process<T>(
    request: Promise<T>,
    onSuccess: ((x: T) => any) | null = null,
    onError: ((y: AxiosError) => T | any) | null = null
  ): Promise<T | null> {
    try {
      const r = await request;
      return onSuccess == null ? (r as T) : onSuccess(r);
    } catch (e: any) {
      // console.log(Object.values(e), Object.keys(e), e.response);
      // return onError == null ? null : onError(e as AxiosError);
      if (onError == null) {
        // throw Error;
        return null;
      } else return onError(e as AxiosError);
    }
  }

  protected async get<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<T> {
    return await ApiControllerBase.requestInternal(this.client.get(this.url(url), { ...config }));
  }

  protected async post<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<T> {
    return await ApiControllerBase.requestInternal(this.client.post(this.url(url), config?.data, config));
  }

  protected async patch<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<T> {
    return await ApiControllerBase.requestInternal(this.client.patch(this.url(url), config?.data, config));
  }

  protected async put<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<T> {
    return await ApiControllerBase.requestInternal(this.client.put(this.url(url), config?.data, config));
  }

  protected async delete<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<T> {
    return await ApiControllerBase.requestInternal(this.client.delete(this.url(url), { data: config?.data }));
    // return await ApiControllerBase.requestInternal(this.client.delete(this.url(""), config?.data));
  }

  private static async requestInternal<T = any>(req: Promise<AxiosResponse<T>>) {
    const r = await req;
    return r.data;
  }
}
