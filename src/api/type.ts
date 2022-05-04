import type { AxiosRequestConfig, AxiosResponse } from "axios";

// 定義傳入的攔截器接口，並且都是可以可選的。
interface IRequestInterceptors<T = AxiosResponse> {
  // 請求成功時的攔截器
  requestSuccessInterceptor?: (
    config: AxiosRequestConfig
  ) => AxiosRequestConfig;
  // 請求失敗時的攔截器
  requestErrorInterceptor?: (err: any) => any;
  // 響應成功時的攔截器
  responseSuccessInterceptor?: (res: T) => T;
  // 響應失敗時的攔截器
  responseErrorInterceptor?: (err: any) => any;
}

// 這個接口將要代替AxiosRequestConfig
export interface IRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  // 每個request實例可以不傳入攔截器
  interceptors?: IRequestInterceptors<T>;
  // 是否顯示loading
  showLoading?: boolean;
}
