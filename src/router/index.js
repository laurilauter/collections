import { createRouter, createWebHistory } from "vue-router";
import LandMarks from "@/components/LandMarks.vue";
import AddLandmark from "@/components/AddLandmark.vue";
import Detail from "@/views/Detail.vue";
import Register from "@/views/Register.vue";
import Login from "@/views/Login.vue";
import Detailview from "@/components/Detailview.vue";
import EditLandmark from "@/components/EditLandmark.vue";
import PageNotFound from "@/views/PageNotFound.vue";
//const jwt = require('jsonwebtoken');
//const { SECRET } = require("../../server/config.js");

const routes = [
  {
    path: "/",
    name: "LandMarks",
    component: LandMarks,
    meta: {
      auth: false,
    },
    children: [
      {
        path: "/add-landmark/:id",
        name: "AddLandmark",
        component: AddLandmark,
        meta: {
          auth: true,
        },
      },
    ],
  },
  {
    path: "/landmark",
    name: "Detail",
    component: Detail,
    meta: {
      auth: false,
    },
    children: [
      {
        path: "/landmark/:id",
        name: "Detailview",
        component: Detailview,
        meta: {
          auth: false,
        },
      },

      {
        path: "/edit-landmark/:id",
        name: "EditLandmark",
        component: EditLandmark,
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


// GOOD INFINITE LOOP
/* router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  //check token
  jwt.verify(token, SECRET, (err, decoded) => {
      if (err) {
          localStorage.clear();
          next({ route: "/login" });
          console.log('Token was old and had to be deleted', decoded);
      } else {
        next();
      }
      console.log("Login logic passed");
});
}); */





// GOOD, but will not check EXPIRATION
router.beforeEach((to, from, next) => {
  if (to.meta.auth === true && !localStorage.getItem("token"))
    next({ route: "/" });
  //Might be set to '/login' as well
  else next();
  console.log("Login logic passed");
});




//this gives a warning of double next() in some cases
/* router.beforeEach((to, from, next) => {
  if (to.meta.auth) {
    if (localStorage.getItem("token")) {
      next();
    } else {
      console.log('Login needed')
      next({ name: "Login" });
    }
  } else {
    next();
  }
  console.log("Token check block");
}); */

export default router;
