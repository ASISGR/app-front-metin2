import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { userInfoInterface } from "@/interfaces/interfaces";

export const useUserStore = defineStore(
  "userStore",
  () => {
    // state:
    const loggedUser = ref<userInfoInterface>({
      token: "",
      userInfo: null,
      login: false,
    });

    // Getters:
    const getToken = computed(() => loggedUser.value.token);

    const isLogged = computed(() => loggedUser.value.login);

    const getUser = computed(() => loggedUser.value.userInfo);

    // Functions
    function clearLoggedUser() {
      loggedUser.value.token = "";
      loggedUser.value.login = false;
      loggedUser.value.userInfo = null;
    }
    // Return the useable methods.
    return {
      getToken,
      getUser,
      isLogged,
      loggedUser,
      clearLoggedUser,
    };
  },
  {
    persist: true,
  }
);
