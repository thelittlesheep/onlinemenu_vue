import { defineStore } from "pinia";
import { userDTO } from "../components/interfaces/userDTO";

export const usepinia = defineStore("main", {
  state: () => ({
    user: {} as userDTO,
  }),
  getters: {},
  actions: {},
});
