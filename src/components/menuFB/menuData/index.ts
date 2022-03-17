import axios, { AxiosResponse } from "axios";
import { Ref } from "vue";
import { ImenuGroupByCategory } from "./menuDataInterface";

export async function axiosGetmenuDatas(): Promise<
  AxiosResponse<Array<ImenuGroupByCategory>>
> {
  return await axios
    .get("http://localhost:3000/menu/product", {})
    .then((res) => {
      return res;
    })
    .catch((e) => {
      //   console.log(e.response?.status);
      throw e;
    });
}
