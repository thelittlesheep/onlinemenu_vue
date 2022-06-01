<template>
  <div class="title">
    <span class="title-text">使用者個人資料</span>
    <el-button @click="editmode">
      <el-icon v-if="isEditMode === false"><Edit /></el-icon>
      <el-icon v-else
        ><svg
          style="width: 24px; height: 24px"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z"
          /></svg
      ></el-icon>
    </el-button>
  </div>
  <Myprofilepreview
    v-if="isEditMode === false"
    :user-info="userInfo"
  />
  <Myprofileedit
    v-else
    :user-info="userInfo"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { Edit } from "@element-plus/icons-vue";
import Myprofilepreview from "./myprofile.preview.vue";
import Myprofileedit from "./myprofile.edit.vue";
import { userStore } from "@/store/user.store";
import { storeToRefs } from "pinia";

export default defineComponent({
  name: "MyProfileBody",
  components: { Myprofilepreview, Myprofileedit, Edit },
  setup() {
    const userstore = userStore();
    const { userInfo } = storeToRefs(userstore);
    const isEditMode = ref(false);
    function editmode() {
      isEditMode.value = !isEditMode.value;
    }
    return { userInfo, isEditMode, editmode };
  }
});
</script>

<style scoped>
.title {
  display: block;
  margin-bottom: 2%;
}
.title-text {
  padding-right: 5px;
}
</style>
