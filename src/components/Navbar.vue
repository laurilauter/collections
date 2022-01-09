<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light container-fluid">
    <a class="navbar-brand-link nav-link" @click="$router.push('/')">Events</a>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarTogglerDemo02"
      aria-controls="navbarTogglerDemo02"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div
      class="collapse navbar-collapse justify-content-end"
      id="navbarTogglerDemo02"
    >
      <ul class="navbar-nav mb-2 me-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link" @click="$router.push('/login')" v-if="!token"
            >Login</a
          >
        </li>
        <li class="nav-item">
          <a class="nav-link" @click="$router.push('/register')" v-if="!token"
            >Register</a
          >
        </li>
        <li class="nav-item">
          <a class="nav-link" @click="logout" v-if="token">Logout</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { ref, onMounted } from "vue";
//import { useRouter } from "vue-router";
import { defineComponent } from "vue";
import axios from "axios";
//import { response } from "express";
//import func from "../../vue-temp/vue-editor-bridge";
export default defineComponent({
  name: "Navbar",
  emits: ["refresh"],
  props: {},
  setup(props, context) {
    //const route = useRoute();
    //const router = useRouter();
    const token = ref(localStorage.getItem("token"));
    console.log("token from nav1: ", token);

    //Checking the token with a POST request
    async function checkToken() {
      const result = await axios
        .get("/api/check-token", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .catch(function (error) {
          if (error.response.status === 401) {
            console.log("Token is BAD");
          }
        });
      console.log("FE is checking the token ", result);
    }

    const logout = () => {
      localStorage.removeItem("token");
      console.log("token removed");
      context.emit("refresh");
      //checkToken();
    };

    onMounted(() => {
      checkToken();
    });

    return {
      token,
      //longpollToken,
      checkToken,
      logout,
    };
  },
});
</script>

<style>
.nav-link {
  cursor: pointer;
  font-size: 1.2em;
}

.navbar-brand-link {
  font-size: 2.2em;
  color: hotpink;
}
</style>
