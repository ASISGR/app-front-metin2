<template>
  <Card title="ΑΛΛΑΓΉ ΣΤΟΙΧΕΊΩΝ ΚΩΔΙΚΟΎ ΠΡΌΣΒΑΣΗΣ">
    <template #content>
      <a-form
        :model="formState"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        @finish="onFinish"
      >
        <a-form-item
          label="Χαρακτήρας προς επαναφορά"
          :name="['selectedCharacter']"
          :rules="[
            { required: true, message: 'Please input your selectedCharacter!' },
            {
              pattern: `^[A-Za-z0-9]+$`,
              message:
                'Only uppercase letters (A-Z), lowercase letters (a-z), and digits (0-9) are allowed',
            },
          ]"
        >
          <a-select
            v-model:value="formState.selectedCharacter"
            placeholder="Επιλέξτε χαρατήρα"
          >
            <a-select-option
              v-for="(playerName, index) of formState.characters"
              :value="playerName"
              :key="index"
              >{{ playerName }}</a-select-option
            >
          </a-select>
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" html-type="submit">Επαναφορά</a-button>
        </a-form-item>
      </a-form></template
    >
  </Card>
  <Card title="ΑΛΛΑΓΉ ΣΤΟΙΧΕΊΩΝ E-MAIL">
    <template #content> <h1>helloworld</h1></template>
  </Card>
</template>
<script lang="ts" setup>
import Card from '@/components/General/Card.vue';
import APIController from '@/services/api/API.communicate';
import { useUserStore } from '@/stores/useUserStore';
import { useRouter } from 'vue-router';
import { onMounted, reactive, ref } from 'vue';
import { message } from 'ant-design-vue';

const userStore = useUserStore();
const route = useRouter();

const labelCol = { span: 4 };
const wrapperCol = { span: 14 };

const formState = reactive({
  characters: userStore.getUser.players,
  selectedCharacter: undefined,
});

const onFinish = (values: any) => {
  // map 1 SHINSOO
  // map 2 CHUNJO
  // map 3 JINNO
  const empire =
    userStore.getUser.empire === 1
      ? 'SHINSOO'
      : userStore.getUser.empire === 2
      ? 'CHUNJO'
      : userStore.getUser.empire === 3
      ? 'JINNO'
      : '';

  APIController.sendRequest('debug-character', 'POST', {
    playerName: values.selectedCharacter,
    empire: empire,
  })
    .then((response: any) => {
      console.log(response);
      message.success(response.message);
    })
    .catch((err) => {
      message.error(err.data.message);
    });
};

onMounted(() => {
  if (!userStore.isLogged) {
    route.push('/');
  }
});
</script>
