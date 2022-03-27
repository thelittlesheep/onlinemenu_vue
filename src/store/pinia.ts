import { defineStore } from "pinia";
import { ref } from "vue";
import { userDTO } from "../components/interfaces/userDTO";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Ref } from "vue";
import {
  ImenuGroupByCategory,
  IshoppingProduct,
} from "../components/menu/menuData/menuDataInterface";

export const usepinia = defineStore("main", {
  state: () => ({
    user: {} as userDTO,
    menudatas: [] as Array<ImenuGroupByCategory>,
    activeIndex: "/",
    dialogVis: false,
    cartData: [] as any[],
    singleProductTempData: {} as IshoppingProduct,
    checkbox: [] as number[],
  }),
  getters: {},
  actions: {
    async postForm(user: Ref<userDTO>): Promise<AxiosResponse<userDTO>> {
      console.log(user);

      return await axios
        .post("http://localhost:3000/menu/user", { ...user.value })
        .then((res) => {
          return res;
        })
        .catch((e) => {
          //   console.log(e.response?.status);
          throw e;
        });
    },
  },
});
