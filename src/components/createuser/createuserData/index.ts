import axios, { AxiosError, AxiosResponse } from "axios";
import { Ref } from "vue";
import { userDTO } from "../../interfaces/userDTO";
import { responseError } from "../../interfaces/responseError";

export interface tofDTO {
  isPostSubmmit: Ref<boolean>;
  isPostSuccess: Ref<boolean>;
  errorResponse: Ref<responseError>;
}

// export async function postForm(
//   user: Ref<userDTO>,
// ): Promise<AxiosResponse<userDTO>> {
//   return await axios
//     .post("http://localhost:3000/menu/user", {
//       user_account: user.value.user_account,
//       user_password: user.value.user_password,
//       user_name: user.value.user_name,
//       user_phone: user.value.user_phone,
//       user_age: user.value.user_age,
//       user_mail: user.value.user_mail,
//     })
//     .then((res) => {
//       return res;
//     })
//     .catch((e) => {
//       //   console.log(e.response?.status);
//       throw e;
//     });
// }
