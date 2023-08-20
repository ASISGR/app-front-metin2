import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useGeneralStore = defineStore(
  "generalStore",
  () => {
    // state:
    const lang = ref("gr");

    // Getters:
    const getLang = computed(() => lang.value);

    // Functions
    function changeLang(selectedLang: string) {
      console.log(selectedLang);
      lang.value = selectedLang;
    }
    // Return the useable methods.
    return {
      lang,
      getLang,
      changeLang,
    };
  },
  {
    persist: true,
  }
);
