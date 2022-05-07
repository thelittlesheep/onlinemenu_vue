import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
  RouteRecordRaw
} from "vue-router";
import Home from "@/views/Home.vue";
import menu from "@/views/Menu.vue";
import NotFound from "@/views/NotFound.vue";
// import Createuser from "@/views/Createuser.vue";
import Login from "@/views/Login.vue";
import Aboutme from "@/views/Aboutme.vue";
import Checkout from "@/views/Checkout.vue";
import Myorder from "@/views/Myorder.vue";
import { mainStore } from "@/store/main.store";
import { storeToRefs } from "pinia";
import { ElMessageBox } from "element-plus";
import { userStore } from "@/store/user.store";
import { userDTO } from "@/interface/userDTO";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  // { path: "/createuser", name: "Createuser", component: Createuser },
  { path: "/login", name: "Login", component: Login },
  {
    path: "/menu",
    name: "Menu",
    component: menu
  },
  // {
  //   path: "/aboutme",
  //   name: "Aboutme",
  //   component: Aboutme
  // },
  {
    path: "/checkout",
    name: "Checkout",
    component: Checkout
  },
  {
    path: "/myorder",
    name: "Myorder",
    component: Myorder
  },
  {
    // catch all 404
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFound
  }
];

const router = createRouter({
  history: createWebHistory("/"),
  routes
});

router.beforeEach(async (to, from, next) => {
  const mainstore = mainStore();
  const { isLogin } = storeToRefs(mainstore);
  const userstore = userStore();
  const { userInfo } = storeToRefs(userstore);
  // if (isLogin.value === true) {
  //   let userJsonStr: string = sessionStorage.getItem("userInfo")
  //     ? (sessionStorage.getItem("userInfo") as string)
  //     : "";
  //   userInfo.value = JSON.parse(userJsonStr);
  // } else {
  //   sessionStorage.removeItem("userInfo");
  // }

  const cookieObject = document.cookie
    .split("; ")
    .map((item) => {
      type cookie = {
        [key: string]: string;
      };
      const element: cookie = {};
      const i = item.split("=");
      element[i[0]] = i[1];
      return element;
    })
    .reduce((acc, prev) => {
      return { ...acc, ...prev };
    });
  cookieObject.user_session ? (isLogin.value = true) : (isLogin.value = false);

  if (to.name !== "Login" && isLogin.value === false) {
    if (to.name === "Home" || (to.name === "Menu" && isLogin.value === false)) {
      next();
      return;
    }
    next({ name: "Login" });
    return;
  }

  if (to.name === "Login" && isLogin.value === true) {
    next({ name: "Menu" });
    return;
  }

  if (to.name === "Checkout" && mainstore.isEmptyCart === true) {
    ElMessageBox.alert("請先選購商品", {
      type: "info",
      showClose: false
    });
    next({ name: "Menu" });
    return;
  }

  next();
  return;
});

export default router;
