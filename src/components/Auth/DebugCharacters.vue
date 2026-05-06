<template>
  <Card :title="t('CHARACTER_DEBUG_TITLE')">
    <template #content>
      <a-collapse v-model:activeKey="activeKey">
        <a-collapse-panel
          key="1"
          :header="t('CHARACTER_DEBUG_INFO_TITLE')"
        >
          <p>{{ t('CHARACTER_DEBUG_INFO_TEXT') }}</p>
        </a-collapse-panel>
      </a-collapse>

      <br />

      <a-form
        :model="formState"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        @finish="onFinish"
      >
        <a-form-item
          :label="t('CHARACTER_TO_DEBUG')"
          :name="['selectedCharacter']"
          :rules="[
            { required: true, message: t('VALIDATION_CHARACTER_REQUIRED') },
            { pattern: alnumPattern, message: t('VALIDATION_ONLY_ALNUM') },
          ]"
        >
          <a-select
            v-model:value="formState.selectedCharacter"
            :placeholder="t('SELECT_CHARACTER')"
          >
            <a-select-option
              v-for="(playerName, index) in formState.characters"
              :key="index"
              :value="playerName"
            >
              {{ playerName }}
            </a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" html-type="submit">
            {{ t('CHARACTER_DEBUG_SUBMIT') }}
          </a-button>
        </a-form-item>
      </a-form>
    </template>
  </Card>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';
import { useI18n } from 'vue-i18n';

import Card from '@/components/General/Card.vue';
import APIController from '@/services/api/API.communicate';
import { useUserStore } from '@/stores/useUserStore';

const { t } = useI18n();
const userStore = useUserStore();
const router = useRouter();

const alnumPattern = /^[A-Za-z0-9]+$/;

const labelCol = { span: 4 };
const wrapperCol = { span: 14 };

const activeKey = ref(['1']);

const formState = reactive({
  characters: userStore.getUser?.players || [],
  selectedCharacter: undefined,
});

const onFinish = (values: any) => {
  const empire = userStore.getUser?.empire;

  APIController.sendRequest('debug-character', 'POST', {
    playerName: values.selectedCharacter,
    empire,
  })
    .then((response: any) => {
      message.success(response.message);
    })
    .catch((err: any) => {
      message.error(err?.data?.message || t('ERROR'));
    });
};

onMounted(() => {
  if (!userStore.isLogged) {
    router.push('/');
  }
});
</script>

<style scoped>
.error-message {
  color: #cc0033;
  font-size: 12px;
  line-height: 15px;
  margin: 5px 0 0;
  align-self: flex-end;
}
</style>