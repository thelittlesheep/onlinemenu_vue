import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
  RouteRecordRaw
} from 'vue-router';
import Home from '@/views/Home.vue';
import menu from '@/views/Menu.vue';
import NotFound from '@/views/NotFound.vue';
// import Createuser from "@/views/Createuser.vue";
import Login from '@/views/Login.vue';
import Myprofile from '@/views/Myprofile.vue';
import Checkout from '@/views/Checkout.vue';
import Myorder from '@/views/Myorder.vue';
import MyorderSingleOrderDetail from '@/components/myorder/myorder.SingleOrderDetail.vue';
import { mainStore } from '@/store/main.store';
import { storeToRefs } from 'pinia';
import { ElMessageBox } from 'element-plus';
import { userStore } from '@/store/user.store';

import { RWDElMessageBox } from '@/util/ElMessageBox.RWD';
import { getSingleOrder } from '@/api/users/user.order';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  // { path: "/createuser", name: "Createuser", component: Createuser },
  { path: '/myorder/:orderid(\\d+)', component: MyorderSingleOrderDetail },
  { path: '/login', name: 'Login', component: Login },
  {
    path: '/menu',
    name: 'Menu',
    component: menu
  },
  {
    path: '/myprofile',
    name: 'Myprofile',
    component: Myprofile
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: Checkout
  },
  {
    path: '/myorder',
    name: 'Myorder',
    component: Myorder
  },
  {
    // catch all 404
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound
  }
];

const router = createRouter({
  history: createWebHistory('/'),
  routes
});

router.beforeEach(async (to, from, next) => {
  const mainstore = mainStore();
  const { isLogin } = storeToRefs(mainstore);
  const userstore = userStore();
  const { userInfo, user } = storeToRefs(userstore);

  // if (isLogin.value === true) {
  //   let userJsonStr: string = sessionStorage.getItem("userInfo")
  //     ? (sessionStorage.getItem("userInfo") as string)
  //     : "";
  //   userInfo.value = JSON.parse(userJsonStr);
  // } else {
  //   sessionStorage.removeItem("userInfo");
  // }
  // 在每次router導向新頁面之時，檢查使用者之cookie是否為正確且有效，則重新導向至LoginPage
  async function checkCookie() {
    const cookieObject = document.cookie
      .split('; ')
      .map((item) => {
        type cookie = {
          [key: string]: string;
        };
        const element: cookie = {};
        const i = item.split('=');
        element[i[0]] = i[1];
        return element;
      })
      .reduce((acc, prev) => {
        return { ...acc, ...prev };
      });
    cookieObject.user_session
      ? (isLogin.value = true)
      : (isLogin.value = false);
    // if (isLogin.value === true) {
    //   console.log('router.beforeEach: user_session cookie is valid');
    //   userInfo.value = await userstore.getUserInfo();
    // }
  }
  checkCookie();
  // const re = /^\/myorder\/\d+$/;
  // console.log(to.params);
  // console.log(re.test(to.path));
  // console.log(isInUserOrders);
  // console.log(`/myorder/${to.params.orderid}`);
  // 若使用者試圖在url中鍵入不屬於該使用者之訂單編號，則顯示錯誤視窗並重新導向至MyorderPage。
  // let isInUserOrders = false;
  // if (user.value.orders) {
  //   user.value.orders.forEach((order) => {
  //     order.order_id === Number(to.params.orderid)
  //       ? (isInUserOrders = true)
  //       : null;
  //   });
  // }
  async function checkIsInOrder(order_id: number) {
    let isInUserOrders = false;
    const remoteOrder = await getSingleOrder(userInfo.value.user_id, order_id);
    remoteOrder.status === 200 ? (isInUserOrders = true) : null;
    return isInUserOrders;
  }

  if (to.path === `/myorder/${to.params.orderid}`) {
    const isInUserOrders = await checkIsInOrder(Number(to.params.orderid));
    console.log(to.params.orderid);

    if (isInUserOrders === false) {
      // ElMessageBox.alert('錯誤的訂單編號', {
      //   type: 'info',
      //   showClose: false
      // });
      next({ name: 'Myorder' });
      return;
    }
    next();
    return;
  }

  if (to.name !== 'Login' && isLogin.value === false) {
    switch (to.name) {
      case 'Home':
        next();
        return;
      case 'Menu':
        next();
        return;
      default:
        next({ name: 'Login' });
        return;
    }
    // if (to.name === "Menu" && isLogin.value === false) {
    //   next();
    //   return;
    // }
  }

  if (to.name === 'Login' && isLogin.value === true) {
    next({ name: 'Menu' });
    return;
  }

  if (to.name === 'Checkout' && mainstore.isEmptyCart === true) {
    ElMessageBox.alert('請先選購商品', {
      type: 'info',
      showClose: false
    });
    RWDElMessageBox();
    next({ name: 'Menu' });
    return;
  }

  next();
  return;
});

export default router;
