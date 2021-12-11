<template>
  <div class="layout">
    <Navbar />
    <div class="container-fluid body-section py-3">
      <div class="row ms-0 mx-3 justify-content-between">
        <div class="col-12 col-lg-6 d-flex justify-content-start">
          <div
            class="btn-square m-1 mt-1 mb-3 d-inline-flex align-items-center"
            @click="$router.push('/')"
          >
            <i class="bi bi-arrow-left fs-2"></i>
          </div>
        </div>
        <div class="col-12 col-lg-6 d-flex justify-content-end">
          <div
            class="btn-square m-1 mt-1 mb-3 d-inline-flex align-items-center"
            @click="openModal"
            v-if="!showModal && token"
          >
            <i class="bi bi-pencil fs-2"></i>
          </div>
          <div
            class="btn-square m-1 mt-1 mb-3 d-inline-flex align-items-center"
            @click="deleteLandmark"
            v-if="!showModal && token"
          >
            <i class="fs-2 bi bi-trash"></i>
          </div>
        </div>
      </div>

      <div class="row d-flex justify-content-center mb-5">
        <!-- MODAL START -->
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

        <div class="row mx-3 image-text-box">
          <div
            class="col-12 col-lg-7 col-md-12 col-sm-12 margin-fix card-image-box-outer"
          >
            <!-- SLIDER START -->
            <div class="card-image-box">
              <img :src="images[currentNumber]" alt="landmark image" />

              <div class="btnNext btn-grey float-end me-3" @click="next">
                <i class="bi bi-arrow-right fs-2"></i>
              </div>
              <div class="btnPrev btn-grey float-start ms-3" @click="prev">
                <i class="bi bi-arrow-left fs-2"></i>
              </div>
            </div>
          </div>
          <!-- SLIDER END -->
          <div
            class="col-12 col-lg-5 col-md-12 col-sm-12 d-flex align-items-center"
          >
            <div class="row">
              <div class="row text-center">
                <h1>{{ landmarkInfo.title }}</h1>
              </div>
              <br />
              <div class="cardtext m-2">
                <h4>{{ landmarkInfo.description }}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    <!-- old image -->
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import EditLandmark from "@/components/EditLandmark.vue";
import Footer from "@/components/Footer.vue";
import Navbar from "@/components/Navbar.vue";
export default {
  name: "Detailview",
  components: {
    EditLandmark,
    Footer,
    Navbar,
  },
  props: {
    id: Number,
    title: String,
    imageUrl: String,
    description: String,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const landmarkInfo = ref([]);
    const currentNumber = ref(0);
    const images = ref([]);
    const imagesLenght = computed(() => images.value.length);
    const token = ref(localStorage.getItem("token"));
    const showModal = ref(false);
    const id = route.params.id;
    //GET request for a single landmark
    async function getLandmark(id) {
      const result = await axios.get(`/api/get-landmark/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      console.log("FE getLandmark is called");
      landmarkInfo.value = result.data;
      images.value = landmarkInfo.value.imageUrlSet;
    }
    // call the above function
    getLandmark(route.params.id);
    //Delete landmark
    function deleteLandmark() {
      axios
        .delete(`/api/delete-landmark/${id}`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log("Landmarke Delete returned BE -> FE", response);
          //Send back to main page
          router.push("/");
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    //Slider next, previous logic
    function next() {
      if (currentNumber.value == imagesLenght.value - 1) {
        currentNumber.value = 0;
      } else {
        currentNumber.value += 1;
      }
    }
    function prev() {
      if (currentNumber.value == 0) {
        currentNumber.value = imagesLenght.value - 1;
      } else {
        currentNumber.value -= 1;
      }
    }
    //open modal
    function openModal() {
      showModal.value = true;
    }
    //close modal, reload landmarks
    async function onChildClick() {
      showModal.value = false;
      await getLandmark(id);
    }
    onMounted(() => {
      console.log("token: ", token);
    });
    return {
      deleteLandmark,
      landmarkInfo,
      token,
      openModal,
      onChildClick,
      showModal,
      next,
      prev,
      images,
      currentNumber,
      imagesLenght,
    };
  },
};
</script>

<style scoped>
.card-image-box .btnPrev {
  position: absolute;
  top: 45%;
  left: 0%;
  cursor: pointer;
}
.card-image-box .btnNext {
  position: absolute;
  top: 45%;
  right: 0%;
  cursor: pointer;
}
.card-image-box .btnNext i {
  position: absolute;
  -ms-transform: translate(-10%, -10%);
  transform: translate(-15px, -5%);
}
.card-image-box .btnPrev i {
  position: absolute;
  -ms-transform: translate(-10%, -10%);
  transform: translate(-15px, -5%);
}

div.image-box div.delete {
  top: 35px;
  right: 35px;
}
.image-text-box {
  margin: 0.5em 0.5em;
  border: 1px solid darkgrey;
  width: fit-content;
  max-width: 80vw;
  padding: 0px;
  box-shadow: 3px 5px 5px darkgray;
  border-radius: 0.25em;
  background: whitesmoke;
}
.btn-row {
  max-width: 80vw;
}
.margin-fix {
  padding-left: 0 !important;
  padding-right: 0 !important;
}
.card-image-box-outer {
  height: 60vh;
}
.card-image-box {
  width: 100%;
  height: 100%;
  text-align: center;
  object-fit: cover;
  position: relative;
  border-radius: 0.25em;
  padding: 0.5em;
}
.card-image-box img {
  width: inherit;
  height: inherit;
  object-fit: cover;
  border-radius: 0.25em;
}
h1 {
  color: #454545;
}
h4 {
  color: #454545;
  text-align: center;
  padding-right: 15px;
  padding-left: 15px;
}

.btn-grey {
  min-height: 50px !important;
  min-width: 50px !important;
  opacity: 0.3;
  background: white;
  border: none;
  position: relative;
}
.btn-square {
  min-height: 50px !important;
  min-width: 50px !important;
  background: hotpink;
  border: none;
  position: relative;
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
