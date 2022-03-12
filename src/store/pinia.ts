import { defineStore } from "pinia";
import { userDTO } from "../components/interfaces/userDTO";
import { responseError } from "../components/interfaces/responseError";

export const usepinia = defineStore("main", {
  state: () => ({
    user: {} as userDTO,
  }),
  getters: {},
  actions: {},
});
