import { createRouter, createWebHistory } from "vue-router";

import AppMain from "./components/AppMain.vue";
import AppFight from "./components/AppFight.vue";

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: "/",
			name: "home",
			component: AppMain,
		},
		{
			path: "/:character",
			name: "fight",
			component: AppFight,
		},
	],
});
export { router };
