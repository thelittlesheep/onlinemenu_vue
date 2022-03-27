import axios, { AxiosResponse } from "axios";
import { ImenuGroupByCategory } from "./menuDataInterface";
import axiosRetry from "axios-retry";
import { Ref } from "vue";
import { cartdataDTO } from "@/components/interfaces/cartDataDTO";

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

export async function axiosPostmenuCartDatas(
  payload: Ref<cartdataDTO>,
): Promise<AxiosResponse<cartdataDTO>> {
  // console.log(payload);

  return await axios
    .post("http://localhost:3000/menu/order", {
      user_id: 1,
      order_quantity: 1,
      order_orderdate: "2022-02-11 19:30:00",
      order_pickupdate: "2022-02-11 20:30:00",
      product_id: payload.value.product_id,
      order_product_quantity: payload.value.order_product_quantity,
      adjustitems: payload.value.adjustitems,
    })
    .then((res) => {
      return res;
    })
    .catch((e) => {
      //   console.log(e.response?.status);
      throw e;
    });
}
