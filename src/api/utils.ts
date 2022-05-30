import { ElMessageBox } from "element-plus";
import { mainStore } from "@/store/main.store";
import { storeToRefs } from "pinia";
import router from "@/router";
import { AxiosError } from "axios";
import { IResponseError } from "./type";
enum routePath {
  menu = "/menu",
  login = "/login",
  myorder = "/myorder"
}

// when response status is 401, it will redirect to login page
const errorAction = (
  err: AxiosError<IResponseError>,
  redirectRoute: routePath
) => {
  const mainstore = mainStore();
  const { isLogin } = storeToRefs(mainstore);
  ElMessageBox.alert(err.response?.data.message, "錯誤", {
    showClose: false,
    beforeClose: (action: string, instance, done) => {
      done();
    }
  })
    .then(() => {
      ElMessageBox.close();
    })
    .finally(() => {
      isLogin.value = false;
      router.push(redirectRoute);
    });
};

export const responseErrorAction = (err: AxiosError<IResponseError>) => {
  const statusCode = err.response?.status;
  switch (statusCode) {
    case 401:
      errorAction(err, routePath.login);
      break;
    case 404:
      errorAction(err, routePath.myorder);
      break;
  }
};
