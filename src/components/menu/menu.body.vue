<template>
  <h1>Test area</h1>
  <p>account is: {{ user.useraccount }}</p>
  <p>name is: {{ user.name }}</p>
  <p>phone is: {{ user.phone }}</p>
  <p>age is: {{ user.age }}</p>
  <p>mail is: {{ user.phone }}</p>
  <hr />
  <div v-show="isPostSubmmit">
    <div v-if="isPostSuccess">POST success</div>
    <div v-else>
      POST failed<br />
      {{ errorResponse.error }}<br />
      {{ errorResponse.statusCode }}<br />
      <li v-for="msg in errorResponse.message" :key="msg">
        {{ msg }}
      </li>
    </div>
  </div>
  <form>
    account:
    <input type="text" id="account" v-model="user.useraccount" /><br />
    name:
    <input type="text" id="name" v-model="user.name" /><br />
    phone:
    <input type="text" id="phone" v-model="user.phone" /><br />
    age:
    <input type="number" id="age" v-model="user.age" /><br />
    mail:
    <input type="text" id="mail" v-model="user.mail" /><br />
  </form>
  <button @click="postFrom">Submit Form</button>
  <button @click="clearForm">Reset All</button>
  <!-- <menuTableVue /> -->
  <!-- <p>{{ message }}</p> -->
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from "vue";
import { usepinia } from "@/store/pinia";
import { storeToRefs } from "pinia";
import { userDTO } from "../interfaces/userDTO";
import menuTableVue from "./menu.table.vue";
import { AxiosError, AxiosResponse } from "axios";
import { postForm } from "./menuData";
import { responseError } from "../interfaces/responseError";

export default defineComponent({
  // components: { menuTableVue },
  setup() {
    const isPostSubmmit: Ref<boolean> = ref(false);
    const isPostSuccess: Ref<boolean> = ref(false);
    const errorResponse: Ref<responseError> = ref({} as responseError);
    const pinia = usepinia();
    const { user } = storeToRefs(pinia);

    const clearForm = () => {
      user.value = {} as userDTO;
      isPostSubmmit.value = false;
    };

    const postFrom = async () => {
      await postForm(user)
        .then((res: AxiosResponse<userDTO>) => {
          // console.log(res.data);
          isPostSuccess.value = true;
        })
        .catch((e: AxiosError<responseError>) => {
          errorResponse.value = e.response!.data;
          isPostSuccess.value = false;
        })
        .finally(() => {
          isPostSubmmit.value = true;
        });

      // if (response?.statusCode===201){}
    };

    return {
      user,
      clearForm,
      postFrom,
      isPostSuccess,
      isPostSubmmit,
      errorResponse,
    };
  },
});
</script>

<style></style>
