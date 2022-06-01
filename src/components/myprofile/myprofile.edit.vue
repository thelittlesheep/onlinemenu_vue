<template>
  <el-form
    ref="formRef"
    :model="formVal"
    label-position="right"
    label-width="120px"
    style="max-width: 400px"
    :inline="false"
    :rules="rules"
  >
    <el-form-item
      label="使用者名稱"
      prop="user_name"
    >
      <el-input
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
      <el-input
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
      <el-input
        id="user_email"
        v-model="formVal.user_email"
        type="text"
        name="user_email"
        placeholder="使用者電子信箱"
      />
    </el-form-item>
  </el-form>
  {{ formVal }}
</template>

<script lang="ts">
import { userDTO } from "@/interface/userDTO";
import { FormInstance, FormRules } from "element-plus";
import { defineComponent, PropType, reactive, Ref, ref } from "vue";
import { userInfoForm } from "./validator";

export default defineComponent({
  name: "Myprofileedit",
  // eslint-disable-next-line vue/require-default-prop
  props: { userInfo: { type: Object as PropType<userDTO> } },
  setup(props) {
    const user: userDTO = props.userInfo as userDTO;
    const form = new userInfoForm(user);
    const formRef = form.formRef;
    const formVal = form.formVal;
    const rules = reactive<FormRules>({
      user_phone: [
        {
          required: true,
          validator: form.validatePhone,
          trigger: ["change", "blur"]
        }
      ],
      user_email: [
        {
          required: true,
          validator: form.validateEmail,
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
          console.log("v");
        } else {
          console.log("not v");
        }
      });
    }
    return {
      user,
      formVal,
      formRef,
      rules,
      submitForm
    };
  }
});
</script>

<style scoped></style>
