// 必要
import { defineStore, acceptHMRUpdate } from "pinia";
import { userDTO, userBasicDTO } from "@/interface/userDTO";
import axios, { AxiosError, AxiosResponse } from "axios";
import axiosRetry from "axios-retry";
import { IuserStoreState } from "@/interface/userStore.interface";
import { request, IRequestData } from "@/api/request";

axiosRetry(axios, { retries: 3 });

export const userStore = defineStore("userStore", {
  state: (): IuserStoreState => ({
    user: {} as userDTO
  }),
  getters: {},
  actions: {
    // async getuserInfoAndOrders(
    //   user_id: number
    // ): Promise<AxiosResponse<userDTO>> {
    //   return await axios
    //     .get(`/backend/user/${user_id}/userInfoAndOrders`)
    //     .then((res) => {
    //       return res;
    //     })
    //     .catch((e) => {
    //       throw e;
    //     });
    // },
    async register(user: userBasicDTO): Promise<AxiosResponse<any>> {
      return await axios
        .post("/backend/user", user)
        .then((res) => {
          return res;
        })
        .catch((e: AxiosError) => {
          throw e;
        });
    },
    async getuserInfoAndOrders(user_id: number) {
      return request
        .get<IRequestData>({
          url: `/user/${user_id}/userInfoAndOrders`,
          showLoading: false,
          interceptors: {
            requestSuccessInterceptor(config) {
              console.log("get請求的攔截器");
              return config;
            }
          }
        })
        .then((res) => {
          return res;
        });
    },
    async login(payload: userBasicDTO): Promise<any> {
      // const jsonpayload = JSON.stringify({
      //   user_account: payload.user_account,
      //   user_password: payload.user_password
      // });
      // console.log(jsonpayload);

      return await axios
        .post(
          "/backend/login",
          payload
          // { withCredentials: true }
        )
        .then((res) => {
          // if (res.status === 201) {
          // 以下為使用JWT AUTH設定COOKIE之方法
          // const expiretime = moment().add(1, "days");
          // document.cookie =
          //   "access_token=" +
          //   res.data.access_token +
          //   ";" +
          //   expiretime +
          //   ";path=/";
          // return res.data;
          // }
          // console.log(res);
          // return res;
        })
        .catch((e) => {
          // console.log(e);

          throw e.response.data;
        });
    }
  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(userStore, import.meta.hot));
}
