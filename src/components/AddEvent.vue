<template>
  <div class="modal" v-if="showModal">
    <div v-if="showModal" class="modal-content">
      <div class="modal-body px-4">
        <div class="d-flex justify-content-between">
          <h3 class="px-5 pt-3 mb-0 align-bottom">Add a new event</h3>
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
            placeholder="Title"
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
            @click="addNewEvent"
            type="submit"
            class="homemade-button w-100 mt-1"
          >
            Add It
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
export default {
  name: "AddEvent",
  props: {
    showModal: Boolean,
  },

  setup(props, context) {
    const newTitle = ref("");
    const newImageUrl = ref("");
    const newDescription = ref("");
    const newLink = ref("");
    const newLocation = ref("");
    //datetime stuff
    const newDay = ref("");
    const newHour = ref("");

    

    async function addNewEvent() {
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
        .post("/api/add-event", data, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          console.log(res);
          context.emit("clicked");
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    function closeModal() {
      context.emit("clicked");
    }


    return {
      newDay,
      newHour,
      newTitle,
      newImageUrl,
      newDescription,
      newLink,
      newLocation,
      addNewEvent,
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

.homemade-button {
  min-height: 50px !important;
  min-width: 50px !important;
  background: hotpink;
  border: none;
  position: relative;
  border-radius: 0.25em;
}

.btn-square i {
  position: absolute;
  -ms-transform: translate(-10%, -10%);
  transform: translate(10px, -10%);
}

.form-control {
  margin-top: 0.5em;
  margin-bottom: 0.5em;
}

button {
  margin-top: 0em;
  margin-bottom: 0em;
}

/* .btn-height {
  margin-top: 8px;
  height: 38px;
  border: 0px;
  background: linear-gradient(to right, #16c0b0, #84cf6a);
}
 */
.tiny-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin: 10px 5px;
}

.plus-box {
  position: relative;
  width: 2.5em;
}

.plus {
  margin: 0;
  position: absolute;
  top: 40%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.image-box {
  position: relative;
}

div.image-box:hover img {
  opacity: 0.3;
}
div.image-box:hover div {
  position: absolute;
  display: block;
}
div.image-box div {
  display: none;
}
div.image-box div.delete {
  top: 35px;
  right: 35px;
}
</style>
