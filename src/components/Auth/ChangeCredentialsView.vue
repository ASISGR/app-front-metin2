<template>
  <Card :title="t('CREDENTIALS_CHANGE')">
    <template #content>
      <a-form
        :model="formState"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        name="change-credentials"
        @finish="onFinish"
      >
        <a-form-item
          :label="t('CREDENTIALS_CURRENT_PASSWORD')"
          :name="['oldPassword']"
          :rules="[
            { required: true, message: t('VALIDATION_CURRENT_PASSWORD_REQUIRED') },
            { pattern: alnumPattern, message: t('VALIDATION_ONLY_ALNUM') },
            { min: 6, message: t('VALIDATION_PASSWORD_MIN') },
            { max: 16, message: t('VALIDATION_PASSWORD_MAX') },
          ]"
        >
          <a-input-password v-model:value.trim="formState.oldPassword">
            <template #prefix>
              <LockOutlined class="site-form-item-icon" />
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item
          :label="t('CREDENTIALS_NEW_PASSWORD')"
          :name="['newPassword']"
          :rules="[
            { required: true, message: t('VALIDATION_PASSWORD_REQUIRED') },
            { pattern: alnumPattern, message: t('VALIDATION_ONLY_ALNUM') },
            { min: 6, message: t('VALIDATION_PASSWORD_MIN') },
            { max: 16, message: t('VALIDATION_PASSWORD_MAX') },
          ]"
        >
          <a-input-password v-model:value.trim="formState.newPassword">
            <template #prefix>
              <LockOutlined class="site-form-item-icon" />
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item
          :label="t('CREDENTIALS_REPEAT_NEW_PASSWORD')"
          :name="['repeatNewPassword']"
          :rules="[
            { trigger: 'change', validator: passwordRepeatValidation },
            { required: true, message: t('VALIDATION_PASSWORD_REPEAT_REQUIRED') },
            { pattern: alnumPattern, message: t('VALIDATION_ONLY_ALNUM') },
            { min: 6, message: t('VALIDATION_REPEAT_PASSWORD_MIN') },
            { max: 16, message: t('VALIDATION_REPEAT_PASSWORD_MAX') },
          ]"
        >
          <a-input-password v-model:value.trim="formState.repeatNewPassword">
            <template #prefix>
              <LockOutlined class="site-form-item-icon" />
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" html-type="submit">
            {{ t('SUBMIT') }}
          </a-button>
        </a-form-item>
      </a-form>
    </template>
  </Card>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';
import { LockOutlined } from '@ant-design/icons-vue';
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

interface FormState {
  oldPassword: string;
  newPassword: string;
  repeatNewPassword: string;
}

const formState = reactive<FormState>({
  oldPassword: '',
  newPassword: '',
  repeatNewPassword: '',
});

const onFinish = () => {
  APIController.sendRequest('change-user-password', 'POST', {
    previousPassword: formState.oldPassword,
    updatePassword: formState.newPassword,
  })
    .then((response: any) => {
      message.success(response.message);
    })
    .catch((err: any) => {
      message.error(err?.data?.message || t('ERROR'));
    });
};

const passwordRepeatValidation = (_rule: any, value: string) => {
  if (value !== formState.newPassword) {
    return Promise.reject(t('VALIDATION_NEW_PASSWORD_MATCH'));
  }

  return Promise.resolve();
};

onMounted(() => {
  if (!userStore.isLogged) {
    router.push('/');
  }
});
</script>