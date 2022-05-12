import { LoadingInstance } from "element-plus/lib/components/loading/src/loading";
import axios, { AxiosInstance } from "axios";
import { IRequestConfig } from "./type";
import { ElLoading } from "element-plus";

const DEFAULT_LOADING = true;

class Request {
  public instance: AxiosInstance;
  public showLoading: boolean;
  public loadingInstance?: LoadingInstance;

  constructor(config: IRequestConfig) {
    // 默認不加載loading
    this.showLoading = config.showLoading ?? DEFAULT_LOADING;
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
        // console.log("全局請求成功創建的攔截器");
        if (this.showLoading) {
          // 添加加載loading
          this.loadingInstance = ElLoading.service({
            text: "Loading...",
            background: "rgba(0, 0, 0, .1)",
            lock: true
          });
        }
        return config;
      },
      (err) => {
        // console.log("全局請求失敗創建的攔截器");
        this.loadingInstance?.close();
        return err;
      }
    );
    // 創建全局響應攔截器
    this.instance.interceptors.response.use(
      (config) => {
        // console.log("全局響應成功創建的攔截器");
        setTimeout(() => {
          this.loadingInstance?.close();
        }, 1000);
        return config;
      },
      (err) => {
        // console.log("全局響應失敗創建的攔截器");
        // console.log(err);

        this.loadingInstance?.close();
        return err;
      }
    );
  }

  // 傳入的泛型是約束返回值
  request<T>(config: IRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 定製該請求是否加loading。當為傳入該參數時，默認為true
      if (config.showLoading === false) {
        this.showLoading = false;
      }
      // 創建單個請求的請求攔截器
      if (config.interceptors?.requestSuccessInterceptor) {
        // 直接調用，然後將處理後的config返回
        config = config.interceptors.requestSuccessInterceptor(config);
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          this.showLoading = DEFAULT_LOADING;
          // 調用傳入的響應攔截器
          if (config.interceptors?.responseSuccessInterceptor) {
            res = config.interceptors.responseSuccessInterceptor(res);
          }
          resolve(res);
        })
        .catch((err) => {
          this.showLoading = DEFAULT_LOADING;
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
}

export default Request;
