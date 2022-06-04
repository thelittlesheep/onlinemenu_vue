import { ElMessageBox } from 'element-plus';
import { mainStore } from '@/store/main.store';
import { storeToRefs } from 'pinia';
import router from '@/router';
import { AxiosError } from 'axios';
import { IResponseError } from './type';
import { RWDElMessageBox } from '@/util/ElMessageBox.RWD';
import { useRoute } from 'vue-router';
enum routePath {
  menu = '/menu',
  login = '/login',
  myorder = '/myorder',
  home = '/'
}

// when response status is 401, it will redirect to login page
const errorAction = (
  err: AxiosError<IResponseError>,
  redirectRoute: routePath = routePath.login
) => {
  // 首先先確認錯誤種類，若為後端伺服器無法連接則不重新導向頁面，
  // 若為一般錯誤，則視後端傳來之錯誤代碼與訊息之種類展示給使用者，並導向後續操作之夜面。
  const mainstore = mainStore();
  const { isLogin } = storeToRefs(mainstore);
  let errorMessage;
  let isBackendDown = false;
  if (err.response?.data !== undefined) {
    isBackendDown = false;
    errorMessage = err.response.data.message;
  } else {
    isBackendDown = true;
    errorMessage = '無法連接後端伺服器，請聯繫網站管理者';
  }
  ElMessageBox.alert(errorMessage, '錯誤', {
    showClose: false,
    beforeClose: (action: string, instance, done) => {
      done();
    }
  })
    .then(() => {
      ElMessageBox.close();
    })
    .finally(() => {
      // isLogin.value = false;
      // console.log(isLogin.value);

      if (isBackendDown === false) {
        console.log('notBackendDown');

        console.log(router.currentRoute.value.path);
        console.log(redirectRoute);
        if (router.currentRoute.value.path === '/login') return;
        router.push(redirectRoute);
        // router.go(0);
      } else {
        console.log('BackendDown');
        console.log(router.currentRoute.value.path);
        console.log(redirectRoute);
        router.push(routePath.home);
      }
    });
  RWDElMessageBox();
};

export const responseErrorAction = (err: AxiosError<IResponseError>) => {
  const statusCode = err.response?.status;
  switch (statusCode) {
    case 401:
      console.log(401);

      errorAction(err, routePath.login);
      break;
    case 404:
      console.log(404);

      errorAction(err, routePath.menu);
      break;
    default:
      errorAction(err);
      break;
  }
};
