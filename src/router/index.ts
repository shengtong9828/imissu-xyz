import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

export const Layout = () => import("@/layout/index.vue");

// 静态路由
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "/",
    component: Layout,
    redirect: "/special",
    children: [
      {
        path: "special",
        component: () => import("@/views/special/index.vue"),
        name: "Special", // 用于 keep-alive, 必须与SFC自动推导或者显示声明的组件name一致
        meta: {
          title: "精选打卡",
          icon: "language",
          affix: false,
          keepAlive: true,
          alwaysShow: false,
        },
      },
    ],
  },

  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "all",
        component: () => import("@/views/all/index.vue"),
        name: "All", // 用于 keep-alive, 必须与SFC自动推导或者显示声明的组件name一致
        meta: {
          title: "全部打卡",
          icon: "language",
          affix: false,
          keepAlive: true,
          alwaysShow: false,
        },
      },
    ],
  },

  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "exhibition",
        component: () => import("@/views/exhibition/index.vue"),
        name: "Exhibition", // 用于 keep-alive, 必须与SFC自动推导或者显示声明的组件name一致
        meta: {
          title: "横线展",
          icon: "language",
          affix: false,
          keepAlive: true,
          alwaysShow: false,
        },
      },
    ],
  },

  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "Q&A",
        component: () => import("@/views/Q&A/index.vue"),
        name: "Q&A", // 用于 keep-alive, 必须与SFC自动推导或者显示声明的组件name一致
        meta: {
          title: "学习答疑",
          icon: "language",
          affix: false,
          keepAlive: true,
          alwaysShow: false,
        },
      },
    ],
  },

  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "notes",
        component: () => import("@/views/notes/index.vue"),
        name: "Notes", // 用于 keep-alive, 必须与SFC自动推导或者显示声明的组件name一致
        meta: {
          hidden: true,
          title: "学习笔记",
          icon: "language",
          affix: false,
          keepAlive: true,
          alwaysShow: false,
        },
      },
    ],
  },
];

/**
 * 创建路由
 */
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
  // 刷新时，滚动条位置还原
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

/**
 * 重置路由
 */
export function resetRouter() {
  router.replace({ path: "/login" });
}

export default router;
