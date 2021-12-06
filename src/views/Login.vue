<template>
  <div class="container layout">
    <div
      class="row justify-content-center align-items-center"
      style="height: 100vh"
    >
      <div class="col-12 col-md-6 col-lg-4">
        <div class="card p-3">
          <h3>Login</h3>
          <!-- HINT -->
          <br>
          <p>example@test.ee</p>
          <p>example</p>
          <!-- HINT -->
          <div class="card-body">
            <div class="form-group">
              <input
                type="text"
                class="form-control"
                name="email"
                v-model="email"
                placeholder="exmaple@test.ee"
              />
            </div>
            <br />
            <div class="form-group">
              <input
                type="password"
                class="form-control"
                name="password"
                v-model="password"
                placeholder="Password"
              />
            </div>
            <br />
            <div class="d-flex justify-content-between">
              <button type="button" @click="login" class="btn btn-primary">
                Login
              </button>
              <button
                class="btn btn-secondary"
                @click="$router.push('/register')"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import { ref } from "vue";
import axios from "axios";
import router from "./../router";
export default defineComponent({
  setup() {
    let email = ref("");
    let password = ref("");
    async function login() {
      const { data } = await axios.post("/api/auth/login", {
        email: email.value,
        password: password.value,
      });
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      router.push("/");
    }
    return {
      email,
      password,
      login,
    };
  },
});
</script>
