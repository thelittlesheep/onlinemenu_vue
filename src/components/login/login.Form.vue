<template>
  <el-form
    ref="formRef"
    :model="formVal"
    label-position="top"
    label-width="100px"
    style="max-width: 460px"
    :rules="rules"
  >
    <h1 v-if="props.islogin">使用者登入</h1>
    <h1 v-else>使用者註冊</h1>
    <el-form-item prop="account">
      <el-input
        v-model="formVal.account"
        placeholder="帳號"
        :clearable="true"
      />
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        v-model="formVal.password"
        placeholder="密碼"
        :clearable="true"
      />
    </el-form-item>
    <el-form-item
      v-if="!props.islogin"
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
        >登入</el-button
      >
      <!-- <el-button @click="resetForm()">Reset</el-button> -->
    </el-form-item>
  </el-form>
  <!-- {{ props.islogin }} -->
</template>

<script lang="ts">
import { userStore } from "@/store/user.store";
import { defineComponent, reactive, Ref, ref, watch } from "vue";
import type { FormRules } from "element-plus";
import Schema from "async-validator";
import { userBasicDTO } from "@/interface/userDTO";
import {
  // validateAccount,
  // validatePassword,
  // validatePasswordconfirm,
  // formVal,
  // formRef,
  loginForm
} from "./validator";
import { FormInstance } from "element-plus/lib/components";
import { ElMessageBox } from "element-plus";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Loginform",
  props: { islogin: { type: Boolean } },
  setup(props) {
    Schema.warning = function () {
      return null;
    };
    const router = useRouter();
    const userstore = userStore();

    let payload: userBasicDTO;

    // const formRef = ref<FormInstance>();

    // type formType = {
    //   account: string;
    //   password: string;
    //   passwordconfirm: string;
    // };

    // let formVal: formType = reactive({
    //   account: "",
    //   password: "",
    //   passwordconfirm: ""
    // });

    // const validateAccount = (rule: any, value: any, callback: any) => {
    //   if (!value) {
    //     callback(new Error("請輸入使用者名稱"));
    //   } else {
    //     if (!/^[a-zA-Z]\w{5,9}$/.test(value)) {
    //       callback(new Error("開頭必需為英文字母，且需為6-9位元"));
    //     }
    //   }
    //   callback();
    // };

    // const validatePassword = (rule: any, value: any, callback: any) => {
    //   if (value === "") {
    //     callback(new Error("請輸入密碼"));
    //   } else {
    //     if (!/^\w{6,24}$/.test(value)) {
    //       callback(new Error("密碼是6-24個字符"));
    //     }
    //     if (formVal.passwordconfirm !== "") {
    //       if (!formRef.value) return;
    //       formRef.value.validateField("passwordconfirm", () => null);
    //       callback();
    //     }
    //   }
    // };

    // const validatePasswordconfirm = (rule: any, value: any, callback: any) => {
    //   if (value === "") {
    //     callback(new Error("請再次輸入密碼"));
    //   } else if (value !== formVal.password) {
    //     callback(new Error("密碼不相符，請再次確認"));
    //   } else {
    //     callback();
    //   }
    // };

    const form = new loginForm();

    const formRef = form.formRef;

    const formVal = form.formVal;

    const rules = reactive<FormRules>({
      account: [
        {
          required: true,
          validator: form.validateAccount,
          trigger: ["change", "blur"]
        }
      ],
      password: [
        {
          required: true,
          validator: form.validatePassword,
          trigger: ["change", "blur"]
        }
      ],
      passwordconfirm: [
        {
          required: true,
          validator: form.validatePasswordconfirm,
          trigger: ["change", "blur"]
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
          if (props.islogin) {
            // Login User
            await userstore
              .login(payload)
              .then(() => {
                router.push("/menu");
              })
              .catch((e) => {
                ElMessageBox.alert(e.message, "錯誤", {
                  type: "error",
                  showClose: false
                }).then(() => {
                  resetForm(formEl);
                });
              })
              .finally(() => {
                resetForm(formEl);
              });
          } else {
            // Register User
            await userstore.register(payload).then((res) => {
              ElMessageBox.alert(res.data.message, "成功", {
                type: "success"
              });
            });
          }
        } else {
          ElMessageBox.alert("請正確填寫帳號及密碼", "錯誤", {
            confirmButtonText: "確認",
            type: "error"
          });
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
