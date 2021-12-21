import { createRouter, createWebHistory } from "vue-router";
import Events from "@/components/Events.vue";
import AddEvent from "@/components/AddEvent.vue";
import Detail from "@/views/Detail.vue";
import Register from "@/views/Register.vue";
import Login from "@/views/Login.vue";
import Detailview from "@/components/Detailview.vue";
import EditEvent from "@/components/EditEvent.vue";
import DeleteEvent from "@/components/EditEvent.vue";
import PageNotFound from "@/views/PageNotFound.vue";

const routes = [
  {
    path: "/",
    name: "Events",
    component: Events,
    meta: {
      auth: false,
    },
    children: [
      {
        path: "/add-event/:id",
        name: "AddEvent",
        component: AddEvent,
        meta: {
          auth: true,
        },
      },
    ],
  },
  {
    path: "/event",
    name: "Detail",
    component: Detail,
    meta: {
      auth: false,
    },
    children: [
      {
        path: "/event/:id",
        name: "Detailview",
        component: Detailview,
        meta: {
          auth: false,
        },
      },

      {
        path: "/edit-event/:id",
        name: "EditEvent",
        component: EditEvent,
        meta: {
          auth: true,
        },
      },
      {
        path: "/delete-event/:id",
        name: "DeleteEvent",
        component: DeleteEvent,
        meta: {
          auth: true,
        },
      },
    ],
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/:catchAll(.*)*",
    name: "PageNotFound",
    component: PageNotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// GOOD
router.beforeEach((to, from, next) => {
  if (to.meta.auth === true && !localStorage.getItem("token"))
    next({ route: "/" });
  //Might be set to '/login' as well
  else next();
  console.log("Login logic passed");
});

export default router;
