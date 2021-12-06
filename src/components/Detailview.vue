<template>
  <div class="layout">
    <div class="container-fluid body-section py-3">
      <div class="row text-center mt-5 my-3">
        <h1>{{ landmarkInfo.title }}</h1>
      </div>

      <div class="row d-flex justify-content-center">
        <div class="row btn-row m-3 justify-content-end">
          <!-- MODAL START -->
          <button
            class="align-middle btn btn-info m-1"
            @click="openModal"
            v-if="!showModal && token"
          >
            Edit Landmark
          </button>
          <EditLandmark
            v-if="showModal"
            :showModal="showModal"
            @clicked="onChildClick"
          >
            <slot>
              <h3 class="modal-title">Edit this Landmark</h3>
            </slot>
          </EditLandmark>
          <!-- MODAL END -->
        </div>

        <div class="row mx-3 image-text-box">
          <div class="col-12 col-lg-7 col-md-12 col-sm-12 margin-fix">
            <div class="card-image">
              <!-- <div class="card" v-for="i in landmarkInfo.imageUrlSet" :key="i">
          <img :src="i" alt="landmark image" /> -->
              <!-- </div> -->

              <!-- SLIDER START -->

              <div
                id="carouselExampleControls"
                class="carousel slide"
                data-ride="carousel"
              >
                <div class="carousel-inner">
                  <div
                    class="carousel-item active"
                    v-for="i in landmarkInfo.imageUrlSet"
                    :key="i"
                  >
                    <img class="d-block w-100" :src="i" alt="First slide" />
                  </div>
                </div>
                <a
                  class="carousel-control-prev"
                  href="#carouselExampleControls"
                  role="button"
                  data-slide="prev"
                >
                  <span
                    class="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span class="sr-only">Previous</span>
                </a>
                <a
                  class="carousel-control-next"
                  href="#carouselExampleControls"
                  role="button"
                  data-slide="next"
                >
                  <span
                    class="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span class="sr-only">Next</span>
                </a>
              </div>

              <!-- SLIDER END -->
            </div>
          </div>

          <div
            class="col-12 col-lg-5 col-md-12 col-sm-12 d-flex align-items-center"
          >
            <div class="cardtext m-2">
              <h4>{{ landmarkInfo.description }}</h4>
            </div>
          </div>
        </div>
        <div class="row btn-row m-3 justify-content-end">
          <button @click="$router.push('/')">Main Menu</button>
        </div>
      </div>
      <!-- changed from go to push, otherwise it acted like 'back' on browser controls -->
    </div>
    <Footer />
    <!-- old image -->
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import EditLandmark from "@/components/EditLandmark.vue";
import Footer from "@/components/Footer.vue";
export default {
  name: "Detailview",
  components: {
    EditLandmark,
    Footer,
  },
  props: {
    msg: String,
    id: Number,
    title: String,
    imageUrl: String,
    description: String,
  },
  data() {
    let landmarkInfo = ref([]);
    let token = ref(localStorage.getItem("token"));
    console.log("token: ", token);
    let showModal = ref(false);
    let id = this.$route.params.id;

    //GET request for a single landmark
    async function getLandmark(id) {
      const result = await axios.get(`/api/get-landmark/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      console.log("landmarkInfo is called");
      landmarkInfo.value = result.data;
      console.log("landmarkInfo ", landmarkInfo.value);
      console.log(landmarkInfo.value.title);
    }
    // call the above function
    getLandmark(this.$route.params.id);

    //console.log(this.$route.params.id);

    //open modal
    function openModal() {
      showModal.value = true;
    }
    //close modal, reload landmarks
    async function onChildClick() {
      showModal.value = false;
      await getLandmark(id);
    }

    return {
      landmarkInfo,
      token,
      openModal,
      onChildClick,
      showModal,
    };
  },
};
</script>

<style scoped>
.image-text-box {
  border: 1px solid rgb(192, 192, 192);
  border-radius: 0.5em;
  width: fit-content;
  max-width: 80vw;
  padding: 0px;
  box-shadow: 3px 5px 5px rgb(26, 46, 65);
}

.btn-row {
  max-width: 80vw;
}

.margin-fix {
  padding-left: 0 !important;
  padding-right: 0 !important;
}

.card-image img {
  object-fit: cover;
  height: 500px;
  width: 700px;
}

h1 {
  color: azure;
}

h4 {
  color: #ffffff;
  text-align: center;
  padding-right: 15px;
  padding-left: 15px;
}

button {
  float: right;
  margin-right: 20px;
  height: 52px;
  width: 200px;
  padding: 0 40px;
  background: linear-gradient(to right, #16c0b0, #84cf6a);
  border: none;
  border-radius: 6px;
  font-weight: 600;
}

/* big screen */
@media only screen and (min-width: 992px) {
  .card-image img {
    border-radius: 0.5em 0em 0em 0.5em;
  }
}
/* small screen */
@media only screen and (max-width: 992px) {
  .card-image img {
    border-radius: 0.5em 0.5em 0em 0em;
  }
}

.layout {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
</style>
