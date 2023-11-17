<template>
  <a-form
    :model="formState"
    name="normal_login"
    class="login-form"
    @finish="onFinish"
    @finishFailed="onFinishFailed">
    <a-form-item
      label="Χαρακτήρας"
      :name="['author']"
      :rules="[
        { required: true, message: 'Please input your author!' },
        {
          pattern: /^[A-Za-z0-9\[\]]+$/,
          message:
            'Only uppercase letters (A-Z), lowercase letters (a-z), and digits (0-9) are allowed',
        },
      ]">
      <a-select
        v-model:value="formState.author"
        placeholder="Επιλέξτε χαρατήρα">
        <a-select-option
          v-for="(playerName, index) of formState.characters"
          :value="playerName"
          :key="index"
          >{{ playerName }}</a-select-option
        >
      </a-select>
    </a-form-item>
    <a-form-item
      label="Τίλτος"
      name="title"
      :rules="[
        { required: true, message: 'Please input your title!' },

      ]">
      <a-input v-model:value="formState.title"> </a-input>
    </a-form-item>

    <a-form-item
      label="Κείμενο"
      name="post_content"
      :rules="[
        { required: true, message: 'Please input your postContent!' },
 
      ]">
      <a-textarea v-model:value="formState.post_content" />
    </a-form-item>

    <a-form-item>
      <a-button
        :disabled="false"
        type="primary"
        html-type="submit"
        class="login-form-button">
        Προσθήκη
      </a-button>
    </a-form-item>
  </a-form>
</template>
<script lang="ts" setup>
  import { reactive, onMounted } from "vue";
  import APIController from '@/services/api/API.communicate';
  import { useRouter } from "vue-router";
  import { useUserStore } from "@/stores/useUserStore";
  import { message } from 'ant-design-vue';

  const userStore = useUserStore();
  const route = useRouter();

  interface FormState {
    characters: String[];
    author: string;
    post_content: string;
    title: string;
  }
  const formState = reactive<FormState>({
    characters: userStore.getUser?.players,
    author: undefined,
    title: "",
    post_content: "",
  });

  onMounted(() => {
    if (!userStore.isLogged || !userStore.getUser.isAdmin) {
      route.push("/");
      return 0;

    }
  });

  const onFinish = (values: any) => {

  APIController.sendRequest('post', 'POST', {
    title: values.title,
    postContent: values.post_content,
    author: values.author,
  })
    .then((response: any) => {
      message.success(response.message);
    })
    .catch((err) => {
      message.error(err.data.message);
    });
};

function onFinishFailed() {

}
</script>
