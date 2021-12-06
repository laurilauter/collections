<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light container-fluid">
    <a class="navbar-brand" href="#">Events</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-end" id="navbarTogglerDemo02">
      
      <ul class="navbar-nav mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link" @click="$router.push('/login')" v-if="!token">Login</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" @click="$router.push('/register')" v-if="!token">Register</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" @click="logout" v-if="token">Logout</a>
        </li>
      </ul>
    </div>
</nav>
</template>

<script>
    export default {
  props: {
      token: String,
  },

}
</script>

<style>
</style>