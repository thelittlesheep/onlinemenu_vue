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
  {
    path: "/aboutme",
    name: "Aboutme",
    component: Aboutme
  },
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
  // catch all 404
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFound
  }
];

const router = createRouter({
  history: createWebHistory("/"),
  routes
});

export default router;
