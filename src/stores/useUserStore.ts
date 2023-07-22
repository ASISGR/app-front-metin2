import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import axios from 'axios';
import type { userInfoInterface } from '@/interfaces/interfaces';
import APIController from '@/services/api/API.communicate';

export const useUserStore = defineStore(
  'userStore',
  () => {
    // state:
    const loggedUser = ref({
      token: '' as String | null,
      userInfo: {} as userInfoInterface | null,
      login: false as Boolean | null,
    });

    // Getters:
    const getToken = computed(() => loggedUser.value.token);

    const isLogged = computed(() => loggedUser.value.login);

    const getUser = computed(() => loggedUser.value.userInfo);

    // Functions
    function clearLoggedUser() {
      loggedUser.value.token = '';
      loggedUser.value.login = false;
      loggedUser.value.userInfo = {
        userId: '',
        login: '',
        email: '',
        coins: '',
        jcoins: '',
        last_play: '',
        account_status: '',
        social_id: '',
        players: [],
        empire: '',
        safebox_password: '',
      };
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
