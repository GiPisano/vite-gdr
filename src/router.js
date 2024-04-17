import { createRouter, createWebHistory } from "vue-router";

import AppMain from "./components/AppMain.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: AppMain,
    },
  ],
});
export { router };
