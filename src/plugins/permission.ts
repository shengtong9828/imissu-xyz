import router from "@/router";
import { usePermissionStore } from "@/store";
import NProgress from "@/utils/nprogress";
import { RouteRecordRaw } from "vue-router";

export function setupPermission() {
  // 白名单路由
  const whiteList = ["/login"];

  router.beforeEach(async (to, from, next) => {
    NProgress.start();
    // 未登录可以访问白名单页面
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      const permissionStore = usePermissionStore();
      const accessRoutes = await permissionStore.initialRoutes();
      accessRoutes.forEach((route: RouteRecordRaw) => {
        router.addRoute(route);
      });
      // 未匹配到任何路由，跳转404
      if (to.matched.length === 0) {
        from.name ? next({ name: from.name }) : next("/404");
      } else {
        next();
      }
    }
  });

  router.afterEach(() => {
    NProgress.done();
  });
}
