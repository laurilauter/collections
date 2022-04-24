import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import { Promise } from "es6-promise";

//Intercepting the response
axios.interceptors.response.use(
  (response) => {
    // Any status code from range of 2xx
    // Do something with response data
    console.log("Interceptor: Status code in 200 range");
    return response;
  },
  (error) => {
    // Any status codes outside range of 2xx
    // Do something with response error
    //router.push("/login");
    console.log("Interceptor: Status code outside 200 range");
    //return Promise.reject(error);

    if (error.response) {
      if (error.response.status === 401) {
        // Do something, call refreshToken() request for example;
        // return a request
        console.log("Status 401: Session expired, please login again.");
        return router.push("/login");
        //return axios_instance(config);
      } else {
        return error;
      }
    }
    return Promise.reject(error);
  }
);

createApp(App).use(store).use(router).mount("#app");
