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
import axios from "axios";
export default {
  props: {},
  setup() {
    //const route = useRoute();
    //const router = useRouter();
    const token = ref(localStorage.getItem("token"));
    console.log("token from nav1: ", token);

    //Just checking the token with a POST request
    async function checkToken() {
      const result = await axios
        .get("/api/check-token", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .catch(function (error) {
          if (error.response.status === 401) {
            localStorage.removeItem("token");
            //router.push("/");
          }
        });
      console.log("Token status:", result);
    }

    const logout = () => {
      //localStorage.clear();
      localStorage.removeItem("token");
      console.log("token removed");
      checkToken();
      location.reload();
      //router.push('/login'); //NOT WORKING
    };

    onMounted(() => {
      checkToken();
    });

    return {
      token,
      checkToken,
      logout,
    };
  },
};
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
