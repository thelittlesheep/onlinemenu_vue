<template>
  <div class="container">
    <div class="row align-items-center">
      <div class="col"></div>
      <div class="col-auto">
        <el-card shadow="always" style="background-color: lightgrey">
          <menuform @ToF="tof" />
        </el-card>
      </div>
      <div class="col"></div>
    </div>
    <!-- <hr />
    <label class="switch">
      <input
        type="checkbox"
        v-model="isShowTestArea"
        v-on:change="showTestArea()"
      />
      <span class="slider round"></span>
    </label>

    <div id="testarea" v-if="isShowTestArea">
      <h1>Test area</h1>
      <p>account is: {{ user.useraccount }}</p>
      <p>name is: {{ user.name }}</p>
      <p>mail is: {{ user.mail }}</p>
      <p>phone is: {{ user.phone }}</p>
      <p>age is: {{ user.age }}</p>
    </div> -->
    <hr />
    <div v-show="isPostSubmmit">
      <div v-if="isPostSuccess">POST success</div>
      <div v-else>
        POST failed<br />
        {{ errorResponse.error }}<br />
        {{ errorResponse.statusCode }}<br />
        <ol type="I">
          <li v-for="msg in errorResponse.message" :key="msg">{{ msg }}</li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from "vue";
import { usepinia } from "@/store/pinia";
import { storeToRefs } from "pinia";
// import custom interface
import { responseError } from "../interfaces/responseError";
import { tofDTO } from "./createuserData";
// import child component
import menuform from "./createuser.form.vue";

export default defineComponent({
  name: "createuserbody",
  components: { menuform },
  setup() {
    let isPostSubmmit: Ref<boolean> = ref(false);
    let isPostSuccess: Ref<boolean> = ref(false);
    let isShowTestArea: Ref<boolean> = ref(false);
    let errorResponse: Ref<responseError> = ref({} as responseError);

    const pinia = usepinia();
    const { user } = storeToRefs(pinia);

    const tof = async (e: tofDTO) => {
      isPostSubmmit.value = e.isPostSubmmit.value;
      isPostSuccess.value = e.isPostSuccess.value;
      errorResponse.value = e.errorResponse.value;
    };

    const showTestArea = () => {
      isShowTestArea.value != isShowTestArea.value;
    };

    return {
      user,
      isPostSuccess,
      isPostSubmmit,
      errorResponse,
      isShowTestArea,
      showTestArea,
      tof,
    };
  },
});
</script>

<style>
/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #2196f3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
