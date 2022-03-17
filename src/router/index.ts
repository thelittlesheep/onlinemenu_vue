import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
  RouteRecordRaw,
} from "vue-router";
import Home from "@/views/Home.vue";
import menu from "@/views/Menu.vue";
import NotFound from "@/views/NotFound.vue";
import Createuser from "@/views/Createuser.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  // {
  //   path: "/weather",
  //   name: "Weather",
  //   component: Weather,
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   // component: () =>
  //   //   import(/* webpackChunkName: "about" */ "../views/About.vue"),
  // },
  { path: "/createuser", name: "Createuser", component: Createuser },
  {
    path: "/menu",
    name: "Menu",
    component: menu,
  },
  // catch all 404
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
