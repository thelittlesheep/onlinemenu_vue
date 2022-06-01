import axios, { AxiosError, AxiosInstance } from "axios";
import { IRequestConfig } from "./type";

class Request {
  public instance: AxiosInstance;
  constructor(config: IRequestConfig) {
    this.instance = axios.create(config);
    // 先創建實例請求攔截器
    this.instance.interceptors.request.use(
      config.interceptors?.requestSuccessInterceptor,
      config.interceptors?.requestErrorInterceptor
    );
    // 先創建實例響應攔截器
    this.instance.interceptors.response.use(
      config.interceptors?.responseSuccessInterceptor,
      config.interceptors?.responseErrorInterceptor
    );
    // 創建全局請求攔截器
    this.instance.interceptors.request.use(
      (config) => {
        return config;
      },
      (err) => {
        return err;
      }
    );
    // 創建全局響應攔截器
    this.instance.interceptors.response.use(
      (config) => {
        return config;
      },
      (err) => {
        return err;
      }
    );
  }

  // 傳入的泛型是約束返回值
  request<T>(config: IRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 創建單個請求的請求攔截器
      if (config.interceptors?.requestSuccessInterceptor) {
        // 直接調用，然後將處理後的config返回
        config = config.interceptors.requestSuccessInterceptor(config);
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 調用傳入的響應攔截器
          if (config.interceptors?.responseSuccessInterceptor) {
            res = config.interceptors.responseSuccessInterceptor(res);
          }
          resolve(res);
        })
        .catch((err: AxiosError<T>) => {
          reject(err);
        });
    });
  }

  get<T>(config: IRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "GET" });
  }

  post<T>(config: IRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "POST" });
  }

  delete<T>(config: IRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "DELETE" });
  }

  patch<T>(config: IRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "PATCH" });
  }

  put<T>(config: IRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "PUT" });
  }
}

export default Request;
