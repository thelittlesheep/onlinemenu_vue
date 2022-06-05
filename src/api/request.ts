import Request from '@/api';
import { BASE_URL, TIME_OUT } from '@/api/config';
import { userDTO } from '@/interface/userDTO';
import { ImenuGroupByCategory } from '@/interface/menuData.Interface';
import { AxiosError } from 'axios';
import { IResponseError } from './type';
import { responseErrorAction } from './utils';

export const request = new Request({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestSuccessInterceptor(config) {
      return config;
    },
    requestErrorInterceptor(err) {
      return err;
    },
    responseSuccessInterceptor(res) {
      return res;
    },
<<<<<<< HEAD
    responseErrorInterceptor(err) {
      // if (err.data.statusCode === 401) {
      //   ElMessageBox.alert("您尚未登入系統。無法存取該資源。", "錯誤", {
      //     showClose: false,
      //     beforeClose: (action: string, instance, done) => {
      //       done();
      //     }
      //   })
      //     .then(() => {
      //       ElMessageBox.close();
      //     })
      //     .finally(() => {
      //       router.push("/login");
      //     });
      // }
      // throw err;
=======
    responseErrorInterceptor(err: AxiosError<IResponseError>) {
      // 預期後端回傳之錯誤訊息格式為 IResponseError
      // 且err為一個AxiosError type
      responseErrorAction(err);
      return err;
>>>>>>> FixCartItemDateStructure
    }
  }
});

export interface IRequestData {
  // 可依照各API回傳之資料格式自行修改
  data: any | userDTO | ImenuGroupByCategory[];
}
