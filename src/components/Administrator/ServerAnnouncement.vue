<template>
  <a-form
    :model="formState"
    name="normal_login"
    class="login-form"
    @finish="onFinish"
    @finishFailed="onFinishFailed">
    <a-form-item
      label="Θεμα"
      name="subject"
      :rules="[{ required: true, message: 'Please input your subject!' }]">
      <a-input v-model:value="formState.subject"> </a-input>
    </a-form-item>

    <a-form-item
      label="Τίλτος"
      name="title"
      :rules="[{ required: true, message: 'Please input your title!' }]">
      <a-input v-model:value="formState.title"> </a-input>
    </a-form-item>

    <a-form-item
      label="Κείμενο"
      name="content"
      :rules="[{ required: true, message: 'Please input your postContent!' }]">
      <a-textarea v-model:value="formState.content" />
    </a-form-item>

    <a-form-item>
      <a-button
        :disabled="false"
        type="primary"
        html-type="submit"
        class="login-form-button">
        Αποστολή
      </a-button>
    </a-form-item>
  </a-form>
</template>
<script lang="ts" setup>
  import { reactive, onMounted } from "vue";
  import APIController from "@/services/api/API.communicate";
  import { useRouter } from "vue-router";
  import { useUserStore } from "@/stores/useUserStore";
  import { message } from "ant-design-vue";

  const userStore = useUserStore();
  const route = useRouter();

  interface FormState {
    subject: string;
    title: string;
    content: string;
  }
  const formState = reactive<FormState>({
    subject: "",
    title: "",
    content: "",
  });

  onMounted(() => {
    if (!userStore.isLogged || !userStore.getUser.isAdmin) {
      route.push("/");
    }
  });

  const onFinish = (values: any) => {
    APIController.sendRequest("server-announcement", "POST", {
        subject: values.subject,
      title: values.title,
      content: values.content,
    })
      .then((response: any) => {
        console.log(response);
        message.success(response.message);
      })
      .catch((err) => {
        message.error(err.data.message);
      });
  };

  function onFinishFailed() {}
</script>
