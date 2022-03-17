import { defineStore } from "pinia";
import { userDTO } from "../components/interfaces/userDTO";
import { ImenuGroupByCategory } from "../components/menuFB/menuData/menuDataInterface";

export const usepinia = defineStore("main", {
  state: () => ({
    user: {} as userDTO,
    menudatas: [] as Array<ImenuGroupByCategory>,
  }),
  getters: {},
  actions: {},
});
