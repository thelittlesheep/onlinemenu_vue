<template>
  <div class="container p-3">
    <div
      id="formTitle"
      class="row gx-5 mb-1"
    >
      <div
        id="formTitleCol"
        class="col-auto align-items-center"
      >
        <h6 class="display-6">
          建立使用者帳號
        </h6>
      </div>
      <div class="col" />
    </div>
    <div class="row gx-5">
      <!-- <Form @submit="onSubmit" class="form" ref="target" v-slot="{ errors }"> -->
      <form @submit="onSubmit">
        <div
          class="col"
          name="accountInput"
        >
          <div class="form-floating mb-3">
            <input
              id="floatingInputAccount"
              v-model="account"
              type="text"
              name="account"
              class="form-control"
              placeholder=""
              autocomplete="off"
            >
            <label for="floatingInputAccount">請輸入用使用者名稱</label>
            <span>{{ accountError }}</span>
          </div>
        </div>
        <div
          class="col"
          name="passwordInput"
        >
          <div class="row gx-5">
            <div
              id="passwordInput"
              class="col"
            >
              <div class="form-floating mb-3">
                <input
                  id="floatingInputPassword"
                  v-model="password"
                  type="password"
                  name="password"
                  class="form-control"
                  placeholder=""
                  autocomplete="off"
                >
                <label for="floatingInputPassword">Password</label>
                <span>{{ passwordError }}</span>
              </div>
            </div>
            <div
              id="pwdInputConfirm"
              class="col"
            >
              <div class="form-floating mb-3">
                <input
                  id="floatingInputPwdConfirm"
                  v-model="confirm"
                  type="password"
                  name="confirm"
                  class="form-control"
                  placeholder=""
                  autocomplete="off"
                >
                <label for="floatingInputPwdConfirm">Password Confirm</label>
                <span>{{ confirmError }}</span>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="col" name="nameInput">
          <div class="form-floating mb-3">
            <input
              type="text"
              name="name"
              v-model="name"
              class="form-control"
              id="floatingInputName"
              placeholder=""
              autocomplete="off"
            />
            <label for="floatingInputName">Name</label>
            <span>{{ nameError }}</span>
          </div>
        </div>
        <div class="col" name="phoneInput">
          <div class="form-floating mb-3">
            <input
              type="text"
              name="phone"
              v-model="phone"
              class="form-control"
              id="floatingInputPhone"
              placeholder=""
              autocomplete="off"
            />
            <label for="floatingInputPhone">Phone</label>
            <span>{{ phoneError }}</span>
          </div>
        </div>
        <div class="col" name="ageInput">
          <div class="form-floating mb-3">
            <input
              type="text"
              name="age"
              v-model="age"
              class="form-control"
              id="floatingInputPhone"
              placeholder=""
              autocomplete="off"
            />

            <label for="floatingInputAge">Age</label>
            <span>{{ ageError }}</span>
          </div>
        </div>
        <div class="col" name="emailInput">
          <div class="form-floating mb-3">
            <input
              type="email"
              name="mail"
              v-model="mail"
              class="form-control"
              id="floatingInputEmail"
              placeholder=""
              autocomplete="off"
            />
            <label for="floatingInputEmail">Email address</label>
            <span>{{ mailError }}</span>
          </div>
        </div> -->
        <div class="row gx-5">
          <div class="col" />
          <div class="col-4">
            <button
              type="submit"
              class="btn btn-primary"
              :disabled="isSubmitting"
            >
              Sign in
            </button>
          </div>
          <div class="col-4">
            <button
              type="reset"
              class="btn btn-primary"
            >
              Reset all
            </button>
          </div>
        </div>
      </form>
      <!-- </Form> -->
      <!-- <button class="btn btn-primary" @click="emitToF">Reset all</button> -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from "vue";
import { useField, useForm } from "vee-validate";
import { usepinia } from "@/store/pinia";
import { storeToRefs } from "pinia";
import { userDTO } from "../interfaces/userDTO";
import { AxiosError } from "axios";
import { tofDTO } from "./createuserData";
import { responseError } from "../interfaces/responseError";

export default defineComponent({
  name: "Createuserform",
  emits: ["ToF"],
  setup(props, { emit }) {
    let isPostSubmmit: Ref<boolean> = ref(false);
    let isPostSuccess: Ref<boolean> = ref(false);
    let errorResponse: Ref<responseError> = ref({} as responseError);

    const tureOrFalse: tofDTO = {
      isPostSubmmit: isPostSubmmit,
      isPostSuccess: isPostSuccess,
      errorResponse: errorResponse,
    };
    // pinia data 宣告
    const pinia = usepinia();
    const { user } = storeToRefs(pinia);

    const clearForm = () => {
      user.value = {} as userDTO;
      resetForm();
    };
    // 定義 form validating 相關變數
    const { isSubmitting, handleSubmit, resetForm } =
      useForm<{ account: string; password: string }>();

    const { errorMessage: accountError, value: account } = useField(
      "account",
      "useraccount",
    );
    const { errorMessage: passwordError, value: password } = useField(
      "password",
      "userpassword",
    );
    const { errorMessage: confirmError, value: confirm } = useField(
      "confirm",
      "pwdconfirm:password",
    );

    async function emitToF(): Promise<void> {
      return new Promise((resolve) => {
        resolve(emit("ToF", tureOrFalse));
      });
    }

    async function postform(user: Ref<userDTO>) {
      // user.value = {} as userDTO;
      try {
        const res = await pinia.postForm(user);
        // console.log(res.data);
        isPostSuccess.value = true;
      } catch (e: unknown) {
        const errors = e as AxiosError<responseError>;
        // console.log(errors.response!.data);

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        errorResponse.value = errors.response!.data;
        isPostSuccess.value = false;
      } finally {
        isPostSubmmit.value = true;
        clearForm();
        // console.log("End");
      }
      // wait untile ajax finished then emit ToF data to createuser .body
      await emitToF();

      // 另一種寫法

      // await postForm(user)
      //   .then((res: AxiosResponse<userDTO>) => {
      //     console.log(res.data);
      //     isPostSuccess.value = true;
      //   })
      //   .catch((e: AxiosError<responseError>) => {
      //     console.log(e.response!.data);
      //     errorResponse.value = e.response!.data;
      //     isPostSuccess.value = false;
      //   })
      //   .finally(() => {
      //     isPostSubmmit.value = true;
      //     clearForm();
      //     console.log("End");
      //   });
    }

    const onSubmit = handleSubmit((values) => {
      user.value.user_account = values.account;
      user.value.user_password = values.password;
      return new Promise((resolve, reject) => {
        if (user.value.user_account && user.value.user_password) {
          resolve(postform(user));
        }
        reject("error FROM onSubmit");
      }).catch((e) => {
        console.log(e);
      });
    });

    return {
      user,
      onSubmit,
      clearForm,
      accountError,
      account,
      passwordError,
      password,
      confirmError,
      confirm,
      isSubmitting,
    };
  },
});
</script>

<style lang="css"></style>
