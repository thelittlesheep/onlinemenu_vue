import axios, { AxiosError, AxiosResponse } from "axios";
import { Ref } from "vue";
import { userDTO } from "../../interfaces/userDTO";

interface errror {
  error: string;
  message: [];
  statusCode: number;
}

type response = AxiosResponse<userDTO> | AxiosError<userDTO>;

export async function postForm(
  user: Ref<userDTO>
): Promise<AxiosResponse<userDTO>> {
  return await axios
    .post("http://localhost:3000/menu/user", {
      useraccount: user.value.useraccount,
      userpassword: user.value.userpassword,
      name: user.value.name,
      phone: user.value.phone,
      age: user.value.age,
      mail: user.value.mail,
    })
    .then((res) => {
      return res;
    })
    .catch((e) => {
      //   console.log(e.response?.status);
      throw e;
    });
}
