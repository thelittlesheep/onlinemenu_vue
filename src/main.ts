import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./validators";

// const app = createApp(App);
// app.use(router);
// app.use(createPinia());
// app.mount("#app");

createApp(App).use(router).use(createPinia()).mount("#app");
