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
import Aboutme from "@/views/Aboutme.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  { path: "/createuser", name: "Createuser", component: Createuser },
  {
    path: "/menu",
    name: "Menu",
    component: menu,
  },
  {
    path: "/aboutme",
    name: "Aboutme",
    component: Aboutme,
  },
  // catch all 404
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

export default router;
