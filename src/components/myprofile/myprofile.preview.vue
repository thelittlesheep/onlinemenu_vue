<template>
  <div>
    <el-descriptions
      direction="vertical"
      :column="1"
    >
      <el-descriptions-item label="使用者姓名">{{
        user.user_name
      }}</el-descriptions-item>
      <el-descriptions-item label="使用者電話">{{
        user.user_phone
      }}</el-descriptions-item>
      <el-descriptions-item label="使用者電子信箱">{{
        user.user_email
      }}</el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script lang="ts">
import { defineComponent, onUpdated, PropType, Ref, ref } from 'vue';
import { userDTO } from '../../interface/userDTO';

export default defineComponent({
  name: 'Myprofilepreview',
  // eslint-disable-next-line vue/require-default-prop
  props: { userInfo: { type: Object as PropType<userDTO> } },
  setup(props, { emit }) {
    const user: Ref<userDTO> = ref(props.userInfo as userDTO);
    onUpdated(() => {
      user.value = props.userInfo as userDTO;
    });
    return { user };
  }
});
</script>

<style scoped></style>
