import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";

//Intercepting the request
axios.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

//Intercepting the response
axios.interceptors.response.use(
  (response) => {
    // Any status code from range of 2xx
    // Do something with response data
    console.log("Status code in 200 range");
    return response;
  },
  (error) => {
    // Any status codes outside range of 2xx
    // Do something with response error
    console.log("Status code outside 200 range");
    return Promise.reject(error);
  }
);

createApp(App).use(store).use(router).mount("#app");
