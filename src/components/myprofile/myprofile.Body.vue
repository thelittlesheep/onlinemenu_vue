<template>
  <el-row>
    <el-col :span="24">
      <div class="myprofileBody">
        <div class="title">
          <span class="title-text">使用者個人資料</span>
          <el-button
            v-if="!isEditMode"
            @click="editmode"
          >
            <el-icon :size="20"><Edit /></el-icon>
          </el-button>
        </div>
        <!-- <Myprofilepreview
        v-if="isEditMode === false"
        :user-info="userInfo"
      /> -->
        <Myprofileedit
          :userinfo="userInfo"
          :iseditmode="isEditMode"
          @canceledit="cancelEdit"
        />
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Edit } from '@element-plus/icons-vue';
import Myprofileedit from './myprofile.edit.vue';
import { userStore } from '@/store/user.store';
import { storeToRefs } from 'pinia';

export default defineComponent({
  name: 'MyProfileBody',
  components: { Myprofileedit, Edit },
  setup() {
    const userstore = userStore();
    const { userInfo } = storeToRefs(userstore);
    function getuserInfoFromSessionStorage() {
      const sessionStoragedata: string | null =
        sessionStorage.getItem('userInfo');
      sessionStoragedata !== null
        ? (userInfo.value = JSON.parse(sessionStoragedata))
        : null;
    }
    getuserInfoFromSessionStorage();
    const isEditMode = ref(false);
    function editmode() {
      isEditMode.value = !isEditMode.value;
    }
    function cancelEdit(isCancel: boolean) {
      if (isCancel === true) isEditMode.value = false;
    }

    return {
      userInfo,
      isEditMode,
      editmode,
      cancelEdit
    };
  }
});
</script>

<style scoped>
.myprofileBody {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.title {
  display: flex;
  justify-content: space-between;
  /* align-content: center; */
  align-items: center;
  height: 30px;
  width: 180px;
  margin-bottom: 2%;
}
.title-text {
  padding-right: 5px;
}
</style>
