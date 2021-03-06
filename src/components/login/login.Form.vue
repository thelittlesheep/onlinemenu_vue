<template>
  <el-form
    ref="formRef"
    :model="formVal"
    label-position="top"
    label-width="100px"
    style="max-width: 460px"
    :rules="rules"
  >
    <h1 v-if="props.islogintab">使用者登入</h1>
    <h1 v-else>使用者註冊</h1>
    <el-form-item prop="account">
      <el-input
        id="username"
        v-model="formVal.account"
        type="text"
        name="username"
        placeholder="帳號"
        :clearable="true"
      />
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        id="password"
        v-model="formVal.password"
        type="password"
        name="password"
        placeholder="密碼"
        :clearable="true"
        show-password
      />
    </el-form-item>
    <el-form-item
      v-if="!props.islogintab"
      prop="passwordconfirm"
    >
      <el-input
        v-model="formVal.passwordconfirm"
        placeholder="再次輸入密碼"
        :clearable="true"
      />
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        @click="submitForm(formRef)"
        ><span v-if="props.islogintab">登入</span
        ><span v-else>註冊</span></el-button
      >
      <!-- <el-button @click="resetForm()">Reset</el-button> -->
    </el-form-item>
  </el-form>
  <!-- {{ props.islogin }} -->
</template>

<script lang="ts">
import { userStore } from '@/store/user.store';
import { defineComponent, reactive, Ref, ref, watch } from 'vue';
import type { FormRules } from 'element-plus';
import Schema from 'async-validator';
import { userBasicDTO } from '@/interface/userDTO';
import { loginForm } from './validator';
import type { FormInstance } from 'element-plus';
import { ElMessageBox } from 'element-plus';
import { useRouter } from 'vue-router';
import { mainStore } from '@/store/main.store';
import { storeToRefs } from 'pinia';
import { RWDElMessageBox } from '@/util/ElMessageBox.RWD';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { sessionStorageSet } from '@/util/utils';
// import { ILoginResponseError } from "@/api/request";

export default defineComponent({
  name: 'Loginform',
  props: { islogintab: { type: Boolean } },
  setup(props) {
    Schema.warning = function () {
      return null;
    };
    const router = useRouter();
    const userstore = userStore();
    const { userInfo } = storeToRefs(userstore);
    const { isLogin } = storeToRefs(mainStore());

    let payload: userBasicDTO;

    const form = new loginForm();

    const formRef = form.formRef;

    const formVal = form.formVal;

    const rules = reactive<FormRules>({
      account: [
        {
          required: true,
          validator: form.validateAccount,
          trigger: ['change', 'blur']
        }
      ],
      password: [
        {
          required: true,
          validator: form.validatePassword,
          trigger: ['change', 'blur']
        }
      ],
      passwordconfirm: [
        {
          required: true,
          validator: form.validatePasswordconfirm,
          trigger: ['change', 'blur']
        }
      ]
    });

    function resetForm(formEl: FormInstance | undefined) {
      if (!formEl) return;
      formEl.resetFields();
    }

    async function submitForm(formEl: FormInstance | undefined) {
      if (!formEl) return;
      formEl.validate(async (valid) => {
        if (valid) {
          payload = {
            user_account: formVal.account,
            user_password: formVal.password
          };
          if (props.islogintab) {
            resetForm(formEl);
            // Login User
            await userstore
              .login(payload)
              .then(async (res) => {
                if (res.data !== undefined) {
                  // console.log(typeof res.data);
                  isLogin.value = true;
                  userInfo.value = await userstore.getUserInfo(
                    userInfo.value.user_id
                  );
                  // const { orders, ...userinfo } = userdata;
                  // user.value = userdata;
                  // userInfo.value = userinfo;
                  // sessionStorageSet("userInfo", userInfo.value);
                  router.push({ name: 'Menu' });
                  resetForm(formEl);
                } else if (axios.isAxiosError(res)) {
                  resetForm(formEl);
                  throw res;
                }
              })
              .catch((e) => {
                console.log(e);
              })
              .finally(() => {
                sessionStorageSet('userInfo', userInfo.value);
                resetForm(formEl);
              });
          } else {
            resetForm(formEl);
            // Register User
            await userstore
              .register(payload)
              .then((res) => {
                ElMessageBox.alert(res.data.message, {
                  type: 'success'
                }).then(async () => {
                  // console.log('then');
                  const res = await userstore.login(payload);
                  userInfo.value.user_id = res.data.user_id;
                  userInfo.value = await userstore.getUserInfo(
                    userInfo.value.user_id
                  );

                  router.push({ name: 'Menu' });
                  resetForm(formEl);
                });
                RWDElMessageBox();
              })
              .catch((e) => {
                ElMessageBox.alert(e.message, {
                  type: 'error',
                  showClose: false
                }).then(() => {
                  resetForm(formEl);
                });
                RWDElMessageBox();
              })
              .finally(async () => {
                // console.log('final');
                // resetForm(formEl);
              });
          }
        } else {
          ElMessageBox.alert('請正確填寫帳號及密碼', {
            confirmButtonText: '確認',
            customClass: 'inputError',
            type: 'error'
          });
          RWDElMessageBox();
          return false;
        }
      });
    }

    watch(props, (newval, oldval) => {
      resetForm(formRef.value);
    });

    return { props, rules, formVal, formRef, submitForm };
  }
});
</script>

<style scoped></style>
