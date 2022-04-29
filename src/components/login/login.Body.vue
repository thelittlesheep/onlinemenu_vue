<template>
  <el-form
    v-model="loginpayload"
    label-position="top"
    label-width="100px"
    style="max-width: 460px"
  >
    <el-form-item label="帳號">
      <el-input v-model="loginpayload.account" />
    </el-form-item>
    <el-form-item label="密碼">
      <el-input v-model="loginpayload.password" />
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        @click="submitForm(loginpayload)"
        >Submit</el-button
      >
      <!-- <el-button @click="resetForm()">Reset</el-button> -->
    </el-form-item>
  </el-form>
  <el-button
    type="primary"
    @click="getUserInfo()"
    >getUserInfo</el-button
  >
</template>

<script lang="ts">
import { usepinia } from "@/store/pinia";
import { defineComponent, Ref, ref } from "vue";

export default defineComponent({
  name: "Loginbody",
  setup() {
    const pinia = usepinia();
    type payload = {
      account: string;
      password: string;
    };

    const loginpayload: Ref<payload> = ref({
      account: "",
      password: ""
    });

    async function submitForm(payload: payload) {
      console.log(payload.account);
      console.log(payload.password);
      await pinia.login(payload.account, payload.password);
    }

    async function getUserInfo() {
      try {
        const UserInfo = await pinia.getUserInfo();
        console.log(UserInfo);
      } catch (e) {
        console.log(e);
      }
    }
    return { loginpayload, submitForm, getUserInfo };
  }
});
</script>

<style scoped></style>
