<template>
  <label for="register-activation-setting"
    >Register Activation: {{ registerActivation }}</label
  >
  <a-switch
    @change="registerChangeStatus"
    id="register-activation-setting"
    v-model:checked="registerActivation" />
  <br />
  <label for="register-required-email-setting"
    >Register Email Activation: {{ registerRequiredEmailActivation }}</label
  >
  <a-switch
    @change="registerEmailChangeStatus"
    id="register-required-email-setting"
    v-model:checked="registerRequiredEmailActivation" />
</template>
<script lang="ts" setup>
  import { ref, onMounted } from "vue";
  import APIController from "@/services/api/API.communicate";
  import { useRouter } from "vue-router";
  import { useUserStore } from "@/stores/useUserStore";
  import { message } from "ant-design-vue";

  const userStore = useUserStore();
  const route = useRouter();

  const registerActivation = ref<boolean>(false);
  const registerRequiredEmailActivation = ref<boolean>(false);

  onMounted(() => {
    if (!userStore.isLogged || !userStore.getUser.isAdmin) {
      route.push("/");
    }

    APIController.sendRequest("settings-status", "GET")
      .then((response: any) => {
        registerActivation.value = response.registerStatus;
        registerRequiredEmailActivation.value =
          response.registerEmailActivationStatus;
      })
      .catch((err) => {
        console.log(err);
      });
  });

  function registerChangeStatus() {
    APIController.sendRequest("register-switch", "POST", {
      register: registerActivation.value,
    })
      .then((response: any) => {
        message.success(response.message);
      })
      .catch((err) => {
        message.error(err.data.message);
      });
  }
  function registerEmailChangeStatus() {
    APIController.sendRequest("register-verification", "POST", {
      registerEmailVerification: registerRequiredEmailActivation.value,
    })
      .then((response: any) => {
        message.success(response.message);
      })
      .catch((err) => {
        message.error(err.data.message);
      });
  }
</script>
