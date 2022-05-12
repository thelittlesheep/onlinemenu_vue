import Request from "@/api";
import { BASE_URL, TIME_OUT } from "@/api/config";
import { ElMessageBox } from "element-plus";
import router from "@/router";
import { userDTO } from "@/interface/userDTO";
import { ImenuGroupByCategory } from "@/interface/menuData.Interface";

export const request = new Request({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  showLoading: true,
  interceptors: {
    requestSuccessInterceptor(config) {
      // console.log(config);
      console.log("requestSuccessInterceptor實例請求成功的攔截器");
      return config;
    },
    requestErrorInterceptor(err) {
      // console.log(err);
      console.log("requestErrorInterceptor實例請求失敗的攔截器");
      return err;
    },
    responseSuccessInterceptor(res) {
      // console.log(res);
      console.log("responseSuccessInterceptor實例響應成功的攔截器");
      return res;
    },
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
      // console.log(err);
      console.log("responseErrorInterceptor實例響應失敗的攔截器");
      throw err;
    }
  }
});

export interface IRequestData {
  // 可依照各API回傳之資料格式自行修改
  data: any | userDTO | ImenuGroupByCategory[];
}

export interface ILoginResponseError {
  // 可依照各API回傳之資料格式自行修改
  message: string;
  statusCode: number;
}
