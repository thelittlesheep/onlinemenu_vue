<template>
  <div class="form">
    <el-tabs
      v-model="activeName"
      type="card"
      class="demo-tabs"
      @tab-click="handleClick"
    >
      <el-tab-pane
        label="登入"
        name="Login"
      >
        <Loginform :islogintab="isLoginTab" />
      </el-tab-pane>
      <el-tab-pane
        label="註冊"
        name="Register"
      >
        <Loginform :islogintab="isLoginTab" />
      </el-tab-pane>
    </el-tabs>
  </div>
  <!-- <el-button
    type="primary"
    @click="getUserInfo()"
    >getUserInfo</el-button
  > -->
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import type { TabsPaneContext } from "element-plus";
import { mainStore } from "@/store/main.store";
import Loginform from "./login.Form.vue";
import { userStore } from "@/store/user.store";

export default defineComponent({
  name: "Loginbody",
  components: { Loginform },
  setup() {
    const activeName = ref("Login");
    const isLoginTab = ref(true);

    const handleClick = (tab: TabsPaneContext, event: Event) => {
      tab.paneName === "Login"
        ? (isLoginTab.value = true)
        : (isLoginTab.value = false);
      // console.log(tab.paneName, event);
    };

    const userstore = userStore();

    async function getUserInfo() {
      try {
        const UserInfo = await userstore.getUserInfo();
        console.log(UserInfo);
      } catch (e) {
        console.log(e);
      }
    }

    return {
      isLoginTab,
      activeName,
      handleClick,
      getUserInfo
    };
  }
});
</script>

<style scoped>
.form {
  max-width: 250px;
  margin: 50px auto;
  /* background: salmon; */
}
</style>
