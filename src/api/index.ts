import axios, { AxiosError, AxiosInstance } from 'axios';
import { IRequestConfig } from './type';
import { ElLoading } from 'element-plus';
import { LoadingInstance } from 'element-plus/lib/components/loading/src/loading';
const DEFAULT_LOADING = true;
class Request {
  public instance: AxiosInstance;
  public showLoading: boolean;
  public loadingInstance?: LoadingInstance;
  constructor(config: IRequestConfig) {
    this.instance = axios.create(config);
    this.showLoading = config.showLoading ?? DEFAULT_LOADING;
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
        if (this.showLoading === true) {
          this.loadingInstance = ElLoading.service({
            text: '正在載入，請稍後...',
            background: 'rgba(0, 0, 0, .1)',
            lock: true
          });
        }
        return config;
      },
      (err) => {
        this.loadingInstance?.close();
        return err;
      }
    );
    // 創建全局響應攔截器
    this.instance.interceptors.response.use(
      (config) => {
        // setTimeout(() => {
        //   this.loadingInstance?.close();
        // }, 1000);
        this.loadingInstance?.close();
        return config;
      },
      (err) => {
        this.loadingInstance?.close();
        return err;
      }
    );
  }

  // 傳入的泛型是約束返回值
  request<T>(config: IRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
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
        .catch((err: AxiosError<T>) => {
          this.showLoading = DEFAULT_LOADING;
          reject(err);
        });
    });
  }

  get<T>(config: IRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' });
  }

  post<T>(config: IRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' });
  }

  delete<T>(config: IRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' });
  }

  patch<T>(config: IRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' });
  }

  put<T>(config: IRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PUT' });
  }
}

export default Request;
