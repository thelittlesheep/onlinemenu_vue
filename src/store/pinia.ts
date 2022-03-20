import { defineStore } from "pinia";
import { ref } from "vue";
import { userDTO } from "../components/interfaces/userDTO";
import { ImenuGroupByCategory } from "../components/menu/menuData/menuDataInterface";

export const usepinia = defineStore("main", {
  state: () => ({
    user: {} as userDTO,
    menudatas: [] as Array<ImenuGroupByCategory>,
    activeIndex: "/",
    dialogVis: false,
  }),
  getters: {},
  actions: {},
});
