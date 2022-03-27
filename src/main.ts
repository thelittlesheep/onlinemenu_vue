import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./validators";

import RWDcontainer from "@/components/share/RWD.vue";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

// import "@/scss/main.scss";

const app = createApp(App);
app.use(ElementPlus);
app.use(router);
app.use(createPinia());
app.mount("#app");
app.component("MyRWDcontainer", RWDcontainer);
// createApp(App).use(ElementPlus).use(router).use(createPinia()).mount("#app");
