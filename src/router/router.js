import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../views/LoginPage.vue";
import RegisterPage from "../views/RegisterPage.vue";
import HomePage from "../views/HomePage.vue";
import ProfilePage from "../views/ProfilePage.vue";
import SearchPage from "../views/SearchPage.vue";
import AddItemPage from "../views/AddItemPage.vue";
import ItemPage from "../views/ItemPage.vue";
import CategoryItems from "../views/CategoryItems.vue";
import MyItems from "../views/MyItems.vue";
import ItemsLiked from "../views/ItemsLiked.vue";

export const routes = [
  {
    path: "/",
    name: "root",
    redirect: "/auth/login",
    // redirect: "/admin/home",
  },
  {
    path: "/auth",
    name: "authentication",
    children: [
      {
        path: "login",
        name: "login",
        component: LoginPage,
      },
      {
        path: "register",
        name: "register",
        component: RegisterPage,
      },
    ],
  },
  {
    path: "/admin",
    name: "admin",
    children: [
      {
        path: "home",
        name: "home",
        component: HomePage,
      },
      {
        path: "profile",
        name: "profile",
        children: [
          {
            path: "my-items",
            name: "items i created",
            component: MyItems,
          },
          {
            path: "items-liked",
            name: "items i liked",
            component: ItemsLiked,
          },
          {
            path: "main",
            name: "main",
            component: ProfilePage,
          },
        ],
      },
      {
        path: "search",
        name: "search",
        component: SearchPage,
      },
      {
        path: "add",
        name: "add item",
        component: AddItemPage,
      },
      {
        path: "item/:_id",
        name: "item presentation",
        component: ItemPage,
      },
      {
        path: "category/:_id",
        name: "all items of a category",
        component: CategoryItems,
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    redirect: "/auth/login",
  },
];
export const router = createRouter({
  history: createWebHistory(),
  routes,
});
