import axios, { AxiosResponse } from "axios";
import { ImenuGroupByCategory } from "./menuDataInterface";
import axiosRetry from "axios-retry";

axiosRetry(axios, { retries: 3 });

export async function axiosGetmenuDatas(): Promise<
  AxiosResponse<Array<ImenuGroupByCategory>>
> {
  return await axios
    .get("http://localhost:3000/menu/product", {})
    .then((res) => {
      return res;
    })
    .catch((e) => {
      if (!e.status) {
        throw "Network Error Axios Can't reach server";
      } else {
        //   console.log(e.response?.status);
        throw e;
      }
    });
}
