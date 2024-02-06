import { createApp } from "vue";
import { router } from "./router/router";
import { store } from "./store/store";
import "./style.css";
import App from "./App.vue";
const app = createApp(App);
app.use(router);
app.use(store);
app.mount("#app");
