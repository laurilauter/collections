<template>
  <div class="modal" v-if="showModal">
    <div v-if="showModal" class="modal-content">
      <div class="modal-body px-4">
        <div class="d-flex justify-content-between">
          <h3 class="px-5 pt-3 mb-0 align-bottom">Edit this Event</h3>
          <div @click="closeModal" class="align-top">
            <i class="align-top fs-2 bi bi-x"></i>
          </div>
        </div>

        <!-- START -->
        <div class="container py-4">
          <input
            v-model="newTitle"
            type="text"
            name="title"
            class="form-control"
            required
          />

          <div class="input-group">
            <input
              v-model="newImageUrl"
              type="url"
              class="form-control"
              placeholder="Image URL"
              required
            />
          </div>

          <div class="container">
            <div id="thumb-row" class="row d-flex flex-wrap">
              <div
                class="image-box col-6 col-md-4 col-lg-3 justify-content-center"
              >
                <img
                  class="tiny-image img-thumbnail"
                  width="100"
                  height="100"
                  :src="newImageUrl"
                  v-if="newImageUrl"
                  alt="no image"
                />
              </div>
            </div>
          </div>

          <textarea
            v-model="newDescription"
            class="form-control"
            id="description"
            name="description"
            placeholder="Description goes here"
            style="height: 8em"
          ></textarea>

          <input
            v-model="newLink"
            type="text"
            name="link"
            placeholder="Link"
            class="form-control"
          />

          <input
            v-model="newLocation"
            type="text"
            name="location"
            placeholder="Location"
            class="form-control"
          />

          <input
            v-model="newDay"
            type="date"
            name="new-day"
            placeholder="Date here"
            class="form-control"
          />

          <input
            v-model="newHour"
            type="time"
            name="new-hour"
            placeholder="Time here"
            class="form-control"
          />

          <button
            @click="editEvent"
            type="submit"
            class="homemade-button w-100 mt-1"
          >
            Save It
          </button>
        </div>

        <!-- END -->
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import axios from "axios";
import { useRoute /* useRouter */ } from "vue-router";
export default {
  name: "AddEvent",
  props: {
    showModal: Boolean,
  },

  setup(props, context) {
    const route = useRoute();
    let eventInfo = ref([]);
    //input variables
    const newTitle = ref("");
    const newImageUrl = ref("");
    const newDescription = ref("");
    const newLink = ref("");
    const newLocation = ref("");
    //datetime stuff
    const newEventTime = ref("");
    const newDay = ref("");
    const newHour = ref("");

    //GET request for a single event
    async function getEvent(id) {
      const result = await axios.get(`/api/get-event/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      console.log("eventInfo is called");
      eventInfo.value = result.data;
      console.log("eventInfo received: ", eventInfo.value);
      console.log(eventInfo.value.title);
      newTitle.value = eventInfo.value.title;
      newImageUrl.value = eventInfo.value.imageUrl;
      newDescription.value = eventInfo.value.description;
      newLink.value = eventInfo.value.link;
      newLocation.value = eventInfo.value.location;
      const date = new Date(eventInfo.value.eventTime);

      const d = date.getDate();
      const m = date.getMonth() + 1;
      const y = date.getFullYear();
      const dateString =
        y + "-" + (m <= 9 ? "0" + m : m) + "-" + (d <= 9 ? "0" + d : d);

      const minutes = date.getMinutes();
      const hours = date.getHours();
      const timeString = hours + ":" + minutes;
      // console.log("result date ", dateString);
      // console.log("result time ", timeString);

      newDay.value = dateString;
      newHour.value = timeString;
      newEventTime.value = eventInfo.value.eventTime;
    }
    // call the above function
    getEvent(route.params.id);

    //edit a event
    async function editEvent() {
      let id = route.params.id;
      let data = {
        title: newTitle.value,
        imageUrl: newImageUrl.value,
        description: newDescription.value,
        link: newLink.value,
        location: newLocation.value,
        eventTime: newDay.value + "T" + newHour.value,
        author: {
          userId: 1,
          userName: "Cody",
        },
        active: true,
      };
      console.log("Data from modal: ", data);
      await axios
        .patch(`/api/edit-event/${id}`, data, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response);
          context.emit("clicked");
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    //emit close modal to parent
    function closeModal() {
      context.emit("clicked");
    }

    return {
      newLink,
      newLocation,
      newDay,
      newHour,
      eventInfo,
      newImageUrl,
      newTitle,
      newDescription,
      newEventTime,
      editEvent,
      closeModal,
    };
  },
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  max-width: 100%;
  height: fit-content;
  max-height: 100%;
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  border-radius: 0.5em;
}
.modal-content {
  border: none;
}

.homemade-button {
  height: 50px;
  width: fit-content;
  margin-top: auto;
  background: hotpink;
  border: none;
  border-radius: 0.5em;
  font-weight: 600;
}

.form-control {
  margin-top: 0.5em;
  margin-bottom: 0.5em;
}

button {
  margin-top: 0em;
  margin-bottom: 0em;
}

.bi-x {
  cursor: pointer;
}

.tiny-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin: 10px 5px;
}
</style>
