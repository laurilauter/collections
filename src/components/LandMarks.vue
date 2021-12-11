<template>
  <div class="layout">
    <Navbar />
    <header class="container-fluid banner">
      <div
        class="row d-flex justify-content-between align-items-center header-row"
      >
        <div class="col-sm-12 col col-md-12 col-lg-3 float-left d-flex justify-content-start">
          <div class="row m-3 justify-content-end">
            <div
              class="btn-square btn-long m-1 mt-1 mb-3 d-inline-flex align-items-center fs-5 justify-content-center"
              @click="$router.push('/login')"
              v-if="!token"
            >
              Login
            </div>
            <div
              class="btn-square btn-long m-1 mt-1 mb-3 d-inline-flex align-items-center fs-5 justify-content-center"
              @click="$router.push('/register')"
              v-if="!token"
            >
              Register
            </div>
            <div
              class="btn-square btn-long m-1 mt-1 mb-3 d-inline-flex align-items-center fs-5 justify-content-center"
              @click="logout"
              v-if="token"
            >
              Logout
            </div>
          </div>
        </div>
        <div
          class="col col-xs-12 col-sm-12 col-md-12 col-lg-6 p-5 d-flex justify-content-center"
        >
          <h1 class="header">Events</h1>
        </div>
        <div class="text-center col-lg-3 col-md-12 col-sm-12 float-right">
          <!-- MODAL START -->
          <div
            class="btn-square m-1 mt-1 mb-3 d-inline-flex align-items-center"
            @click="openModal"
            v-if="!showModal && token"
          >
            <i class="plus fs-2 bi bi-plus text-dark"></i>
          </div>
          <AddLandmark
            v-if="showModal"
            :showModal="showModal"
            @clicked="onChildClick"
          >
            <slot>
              <h3 class="modal-title">Add a Landmark</h3>
            </slot>
          </AddLandmark>
          <!-- MODAL END -->
        </div>
      </div>
    </header>

    <div class="container-fluid body-section">
      <div class="row justify-content-center">
        <div
          class="col-auto p-3"
          v-for="landmark in landmarksFromServer"
          :key="landmark"
        >
          <div class="box mx-auto d-block">
            <router-link :to="`/landmark/${landmark._id}`" class="col">
              <div class="img-frame">
                <img
                  class="mx-auto d-block"
                  :src="landmark.imageUrlSet[0]"
                  alt="landmark image"
                />
              </div>
              <p class="title" id="title">{{ landmark.title }}</p>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import AddLandmark from "@/components/AddLandmark.vue";
import Footer from "@/components/Footer.vue";
import Navbar from "@/components/Navbar.vue";
export default {
  name: "Landmarks",
  components: {
    AddLandmark,
    Footer,
    Navbar,
  },
  props: {
    title: String,
    imageUrl: String,
    description: String,
  },

  data() {
    let landmarksFromServer = ref([]);
    const newTitle = ref("");
    const newImageUrl = ref("");
    const newDescription = ref("");
    let showModal = ref(false);
    let token = ref(localStorage.getItem("token"));
    console.log("token: ", token);

    //GET request for a list of landmarks
    async function getLandmarks() {
      const result = await axios
        .get("/api/get-landmarks", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .catch(function (error) {
          if (error.response.status === 401) {
            this.$router.push("/login");
          }
        });
      landmarksFromServer.value = result.data;
      console.log("landmarksFromServer ", landmarksFromServer.value);
    }
    // call the above function
    getLandmarks();

    //open modal
    function openModal() {
      showModal.value = true;
    }
    //close modal, reload landmarks
    async function onChildClick() {
      showModal.value = false;
      await getLandmarks();
    }

    const logout = () => {
      localStorage.clear(); //WORKS
      //localStorage.removeItem("token");
      console.log("token removed");
      getLandmarks();
      location.reload();
      //this.$router.push('../views/login'); //NOT WORKING
    };

    return {
      token,
      logout,
      openModal,
      onChildClick,
      showModal,
      landmarksFromServer,
      newTitle,
      newImageUrl,
      newDescription,
    };
  },
};
</script>

<style scoped>

.box {
  margin: 1em 0;
  text-align: center;
  border: 1px solid silver;
  border-radius: 0.25em;
  width: fit-content;
  padding: 0px;
  box-shadow: 5px 10px 8px silver;
  background: lightgrey;
}

.box img {
  width: 300px;
  height: 250px;
  object-fit: cover;
  border-radius: 0.25em 0.25em 0 0;
}

.header {
  font-size: 5em;
  color: #454545;
}

.title {
  margin-top: 5%;
  font-size: 1.4em;
  text-decoration: none;
  color: #454545;
}

a {
  text-decoration: none;
}
.banner {
  min-height: fit-content;
  width: 100vw;
}


.btn-square {
  min-height: 50px !important;
  min-width: 50px !important;
  background: hotpink;
  border: none;
  position: relative;
  cursor: pointer;

}

.btn-long {
  width: 100px;
}
.btn-square i {
  position: absolute;
  -ms-transform: translate(-10%, -10%);
  transform: translate(10px, -10%);
}

.layout {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
</style>
