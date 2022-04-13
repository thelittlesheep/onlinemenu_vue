import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./validators";

import RWDcontainer from "@/components/share/RWD.vue";
import Menucartdrawer from "@/components/menu/menu.CartDrawer.vue";
import Menuproductpopout from "@/components/menu/menu.ProductPopout.vue";
import Menuaddtocart from "@/components/menu/menu.AddToCart.vue";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

// import "@/scss/main.scss";

const app = createApp(App);
app.use(ElementPlus);
app.use(router);
app.use(createPinia());
app.component("MyRWDcontainer", RWDcontainer);
app.component("Menucartdrawer", Menucartdrawer);
app.component("Menuproductpopout", Menuproductpopout);
app.component("Menuaddtocart", Menuaddtocart);
app.mount("#app");
// createApp(App).use(ElementPlus).use(router).use(createPinia()).mount("#app");
