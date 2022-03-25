import { defineStore } from "pinia";
import { ref } from "vue";
import { userDTO } from "../components/interfaces/userDTO";
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
  actions: {},
});
