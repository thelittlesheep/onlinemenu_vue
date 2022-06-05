<template>
  <div class="myprofileEditBody">
    <el-form
      ref="formRef"
      :model="formVal"
      label-position="right"
      label-width="130px"
      style="width: 350px"
      :inline="false"
      :rules="rules"
    >
      <el-form-item
        label="使用者名稱"
        prop="user_name"
      >
        <span
          v-if="props.iseditmode === false"
          class="previewtext"
          >{{ formVal.user_name }}</span
        >
        <el-input
          v-else
          id="user_name"
          v-model="formVal.user_name"
          type="text"
          name="user_name"
          placeholder="使用者名稱"
        />
      </el-form-item>
      <el-form-item
        label="使用者電話"
        prop="user_phone"
      >
        <span
          v-if="props.iseditmode === false"
          class="previewtext"
          >{{ formVal.user_phone }}</span
        >
        <el-input
          v-else
          id="user_phone"
          v-model="formVal.user_phone"
          type="text"
          name="user_phone"
          placeholder="使用者電話"
        />
      </el-form-item>
      <el-form-item
        label="使用者電子信箱"
        prop="user_email"
      >
        <span
          v-if="props.iseditmode === false"
          class="previewtext"
          >{{ formVal.user_email }}</span
        >
        <el-input
          v-else
          id="user_email"
          v-model="formVal.user_email"
          type="text"
          name="user_email"
          placeholder="使用者電子信箱"
        />
      </el-form-item>
    </el-form>
    <div class="myprofileEditButtons">
      <el-button
        v-if="props.iseditmode === true"
        @click="submitForm(formRef)"
      >
        <el-icon>
          <svg
            style="width: 24px; height: 24px"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z"
            />
          </svg>
        </el-icon>
        <span>儲存</span>
      </el-button>
      <el-button
        v-if="props.iseditmode === true"
        @click="cancelEdit"
      >
        <span>取消</span>
      </el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { updateUserProfile } from '@/api/users/user.profie';
import { userDTO } from '@/interface/userDTO';
import { userStore } from '@/store/user.store';
import { RWDElMessage } from '@/util/ElMessageBox.RWD';
import { ElMessage, FormInstance, FormRules } from 'element-plus';
import { defineComponent, PropType, reactive, Ref, ref } from 'vue';
import { userInfoForm } from './validator';
import { storeToRefs } from 'pinia';
import { sessionStorageSet } from '@/util/utils';

export default defineComponent({
  name: 'Myprofileedit',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    userinfo: { type: Object as PropType<userDTO> },
    // eslint-disable-next-line vue/require-default-prop
    iseditmode: { type: Boolean as PropType<boolean> }
  },
  emits: ['canceledit'],
  setup(props, { emit }) {
    const user: userDTO = props.userinfo as userDTO;
    const form = new userInfoForm(user);
    const formRef = form.formRef;
    const formVal = form.formVal;
    const rules = reactive<FormRules>({
      user_phone: [
        {
          required: true,
          validator: form.validatePhone,
          trigger: ['change', 'blur']
        }
      ],
      user_email: [
        {
          required: true,
          validator: form.validateEmail,
          trigger: ['change', 'blur']
        }
      ]
    });
    const userstore = userStore();
    const { userInfo } = storeToRefs(userstore);
    // function resetForm(formEl: FormInstance) {
    //   if (!formEl) return;
    //   formEl.resetFields();
    // }
    async function submitForm(formEl: FormInstance) {
      if (!formEl) return;
      formEl.validate(async (valid) => {
        if (valid) {
          await updateUserProfile(formVal).then(async (res) => {
            if (res.status === 200) {
              cancelEdit();
              ElMessage({
                type: 'success',
                message: '修改成功'
              });
              userInfo.value = await userstore.getUserInfo();
              sessionStorageSet('userInfo', userInfo.value);
            }
          });
        } else {
          ElMessage({
            type: 'error',
            message: '修改失敗，請依照提示填寫正確資料'
          });
        }
        RWDElMessage();
      });
    }
    function cancelEdit() {
      emit('canceledit', true);
    }
    // function cancelSuccessUpdateEdit() {
    //   emit('updatesessionstorageuserinfo', true);
    //   cancelEdit();
    // }

    return {
      user,
      formVal,
      formRef,
      rules,
      submitForm,
      cancelEdit,
      props
    };
  }
});
</script>

<style scoped>
.previewtext {
  padding-left: 10px;
}
.myprofileEditButtons {
  display: flex;
  justify-content: center;
}
</style>
