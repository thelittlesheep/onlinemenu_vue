import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "@/util/validators";

import RWDcontainer from "@/components/share/RWD.vue";
import Menucartdrawer from "@/components/menu/menu.CartDrawer.vue";
import Menuproductpopout from "@/components/menu/menu.ProductPopout.vue";
import Menuaddtocart from "@/components/menu/menu.AddToCart.vue";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import zhTw from "element-plus/es/locale/lang/zh-tw";
import { markRaw } from "vue";
// import "@/scss/main.scss";

const app = createApp(App);
app.use(ElementPlus, {
  locale: zhTw
});
// const pinia = createPinia();
// app.use(pinia);
// pinia.use(({ store }) => {
//   store.$router = markRaw(router);
// });
app.use(createPinia());
app.use(router);
app.component("MyRWDcontainer", RWDcontainer);
app.component("Menucartdrawer", Menucartdrawer);
app.component("Menuproductpopout", Menuproductpopout);
app.component("Menuaddtocart", Menuaddtocart);

app.mount("#app");
// createApp(App).use(ElementPlus).use(router).use(createPinia()).mount("#app");
