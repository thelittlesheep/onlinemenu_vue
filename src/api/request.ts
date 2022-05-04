import Request from "@/api";
import { BASE_URL, TIME_OUT } from "@/api/config";
import { ElMessageBox } from "element-plus";
import router from "@/router";

export const request = new Request({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  showLoading: true,
  interceptors: {
    requestSuccessInterceptor(config) {
      // console.log(config);
      console.log("Request實例請求成功的攔截器");
      return config;
    },
    requestErrorInterceptor(err) {
      //   console.log(err);
      console.log("Request實例請求失敗的攔截器");
      return err;
    },
    responseSuccessInterceptor(res) {
      //   console.log(res);
      console.log("Request實例響應成功的攔截器");
      return res;
    },
    responseErrorInterceptor(err) {
      if (err.response.data.statusCode === 401) {
        ElMessageBox.alert("您尚未登入系統。無法存取該資源。", "錯誤", {
          showClose: false,
          beforeClose: (action: string, instance, done) => {
            done();
          }
        })
          .then(() => {
            ElMessageBox.close();
          })
          .finally(() => {
            router.push("/login");
          });
      }
      //   console.log(err);

      return err.response;
    }
  }
});

export interface IRequestData {
  // 可依照各API回傳之資料格式自行修改
  data: any;
}
