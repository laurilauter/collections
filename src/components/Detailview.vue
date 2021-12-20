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
            @click="deleteEvent"
            v-if="!showModal && token"
          >
            <i class="fs-2 bi bi-trash"></i>
          </div>
        </div>
      </div>

      <div class="row d-flex justify-content-center mb-5">
        <!-- MODAL START -->
        <EditEvent
          v-if="showModal"
          :showModal="showModal"
          @clicked="onChildClick"
        >
          <slot>
            <h3 class="modal-title">Edit this Event</h3>
          </slot>
        </EditEvent>
        <!-- MODAL END -->

        <div class="row mx-3 image-text-box">
          <div
            class="col-12 col-lg-7 col-md-12 col-sm-12 margin-fix card-image-box-outer"
          >
            <div class="card-image-box">
              <img :src="eventInfo.imageUrl" alt="event image" />
            </div>
          </div>
          <div
            class="col-12 col-lg-5 col-md-12 col-sm-12 d-flex align-items-center"
          >
            <div class="row">
              <div class="row text-center">
                <h1>{{ eventInfo.title }}</h1>
              </div>
              <br />
              <div class="cardtext m-3">
                <p>{{ eventInfo.description }}</p>
                <p>{{ eventInfo.link }}</p>
                <div class="time-place justify-content-start mb-1">
                  <p class="text-start">
                    <span>{{ getDate(eventInfo.eventTime) }}</span>
                    <span>&nbsp;&nbsp;&nbsp;</span>
                    <span>{{ getTime(eventInfo.eventTime) }}</span>
                  </p>
                  <p class="text-start">{{ eventInfo.location }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import EditEvent from "@/components/EditEvent.vue";
import Footer from "@/components/Footer.vue";
import Navbar from "@/components/Navbar.vue";
import dayjs from "dayjs";

export default {
  name: "Detailview",
  components: {
    EditEvent,
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
    const eventInfo = ref([]);
    const currentNumber = ref(0);
    const images = ref([]);
    //const imagesLenght = computed(() => images.value.length);
    const showModal = ref(false);
    const id = route.params.id;
    const token = ref(localStorage.getItem("token"));

    //convert dates
    const getDate = (dateString) => {
      const date = dayjs(dateString);
      // Then specify how you want your dates to be formatted
      return date.format("DD.MM.YYYY");
    };

    const getTime = (dateString) => {
      const date = dayjs(dateString);
      // Then specify how you want your dates to be formatted
      return date.format("HH:mm");
    };

    //GET request for a single event
    async function getEvent(id) {
      const result = await axios.get(`/api/get-event/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      console.log("FE getEvent is called");
      eventInfo.value = result.data;
    }

    //Delete event
    function deleteEvent() {
      axios
        .delete(`/api/delete-event/${id}`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log("Evente Delete returned BE -> FE", response);
          //Send back to main page
          router.push("/");
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    //open modal
    function openModal() {
      showModal.value = true;
    }
    //close modal, reload events
    async function onChildClick() {
      showModal.value = false;
      await getEvent(id);
    }
    onMounted(() => {
      getEvent(route.params.id);
    });
    return {
      getDate,
      getTime,
      deleteEvent,
      eventInfo,
      token,
      openModal,
      onChildClick,
      showModal,
      images,
      currentNumber,
    };
  },
};
</script>

<style scoped>
/* .card-image-box .btnPrev {
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
} */

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

.cardtext {
  padding: 2em;
}

.time-place {
  font-weight: 700;
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
  border-radius: 0.25em;
  position: relative;
  cursor: pointer;
}
.btn-square {
  min-height: 50px !important;
  min-width: 50px !important;
  background: hotpink;
  border: none;
  border-radius: 0.25em;
  position: relative;
  cursor: pointer;
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
