import "./assets/main.css";

import { createApp, ref } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import Antd from "ant-design-vue";
import App from "./App.vue";
import router from "./router";

// languages
import { LANG_GR } from "./translations/lang-gr.enum";
import { LANG_US } from "./translations/lang-us.enum";
import { createI18n } from "vue-i18n";

const app = createApp(App);
const pinia = createPinia();
const i18n = createI18n({
  legacy: false,
  locale: "gr",
  fallbackLocale: "us",
  useScope: "global",
  messages: {
    gr: LANG_GR,
    us: LANG_US,
  },
});

app.use(i18n);
app.use(pinia.use(piniaPluginPersistedstate));
app.use(router);
app.use(Antd);
app.mount("#app");
