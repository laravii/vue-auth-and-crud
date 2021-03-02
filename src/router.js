import Vue from "vue";
import Router from "vue-router";
import Home from "./pages/Home";
import Login from "./pages/login/Login";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "home",
      meta: { title: "Home" },
      component: Home
    },
    {
      path: "/login",
      name: "login",
      meta: { title: "Home" },
      component: Login
    }
  ]
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  if (!window.uid && to.name !== "login") {
    next({ name: "login" });
  } else {
    next();
  }
});
export default router;
