import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import * as Vue from 'vue';

declare module 'vue-router' {
  interface RouteMeta {
    title?:string
  }
}

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "index",
    component: () => import("@/views/Main.vue"),
    meta: { title: '三一高空机械装备' }
  },
  {
    path: "/h5/main",
    name: "main",
    component: () => import("@/views/Main.vue"),
    meta: { title: '三一高空机械装备' }
  },
  {
    path: "/h5/news",
    name: "news",
    component: () => import("@/views/News.vue"),
    meta: { title: '企业资讯' }
  },
  {
    path: "/h5/products",
    name: "products",
    component: () => import("@/views/Products.vue"),
    meta: { title: '产品中心' }
  },
  {
    path: "/h5/rental-contact",
    name: "rental-contact",
    component: () => import("@/views/RentalContact.vue"),
    meta: { title: '租赁咨询' }
  },
  {
    path: "/h5/repair-contact",
    name: "repair-contact",
    component: () => import("@/views/RepairContact.vue"),
    meta: { title: '设备报修' }
  },
  {
    path: "/h5/productsDetail",
    name: "productsDetail",
    component: () => import("@/views/ProductsDetail.vue"),
    meta: { title: '设备详情' }
  },
  {
    path: "/h5/buy-contact",
    name: "buy-contact",
    component: () => import("@/views/BuyContact.vue"),
    meta: { title: '购车咨询' }
  },
  {
    path: "/h5/sub-list",
    name: "sub-list",
    component: () => import("@/views/SubList.vue"),
    meta: { title: '订阅列表' }
  },
  {
    path: "/h5/construction-list",
    name: "construction-list",
    component: () => import("@/views/constructionList.vue"),
    meta: { title: '施工设备' }
  },
  {
    path: "/h5/share/device",
    name: "shareDevice",
    component: () => import("@/views/deviceShare/device.vue"),
    meta: { title: '设备详情' }
  },
  {
    path: "/h5/share/workin",
    name: "shareWorkin",
    component: () => import("@/views/deviceShare/workin.vue"),
    meta: { title: '租赁咨询' }
  },
  {
    path: "/h5/share/workout",
    name: "shareWorkout",
    component: () => import("@/views/deviceShare/workout.vue"),
    meta: { title: '退车申请' }
  },
  {
    path: "/h5/share/repair",
    name: "shareRepair",
    component: () => import("@/views/deviceShare/repair.vue"),
    meta: { title: '设备报修' }
  },
  {
    path: "/h5/share/test",
    name: "shareTest",
    component: () => import("@/views/deviceShare/test.vue"),
    meta: { title: 'test' }
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
router.beforeEach((to, from) => {
});

const DEFAULT_TITLE = '三一高空机械装备'
router.afterEach((to, from) => {
  if(to.meta.title){
    setDocumentTitle(to.meta.title)
  }
});

export default router;
