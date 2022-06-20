import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { RootStore } from "../stores/rootStore";
import { client } from "./client";

interface IInterceptorsParams {
  accessToken?: string;
  companyId?: number;
  appLocale?: string;
}

export default {
  setup: (store: RootStore, params?: IInterceptorsParams) => {
    client.interceptors.request.use((config: AxiosRequestConfig) => {
      if (config && config.headers) {
        // SET ACCESS TOKEN HEADER
        if (params?.accessToken != null) {
          config.headers.Authorization = "Bearer " + params.accessToken;
        } else if (store.authStore.getAccessToken) {
          config.headers.Authorization = "Bearer " + store.authStore.getAccessToken;
        }
      }
      return config;
    });

    client.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        if (error.response?.status == 403) {
          // return
        }
        return error;
      }
    );
  },
};
