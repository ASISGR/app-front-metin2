<template>
  <Card :title="t('ACCOUNT_RESET_TITLE')">
    <template #content>
      <a-form
        :model="formState"
        v-bind="layout"
        name="account-reset-form"
        @finish="onFinish"
      >
        <a-form-item
          :label="t('REGISTER_USERNAME')"
          :name="['login']"
          :rules="[
            { required: true, message: t('VALIDATION_USERNAME_REQUIRED') },
            { pattern: alnumPattern, message: t('VALIDATION_ONLY_ALNUM') },
            { min: 5, message: t('VALIDATION_USERNAME_MIN') },
            { max: 16, message: t('VALIDATION_USERNAME_MAX') },
          ]"
        >
          <a-input v-model:value.trim="formState.login">
            <template #prefix>
              <UserOutlined class="site-form-item-icon" />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item
          :label="t('REGISTER_EMAIL')"
          :name="['email']"
          :rules="[
            { type: 'email', message: t('VALIDATION_INVALID_EMAIL') },
            { required: true, message: t('VALIDATION_EMAIL_REQUIRED') },
            { pattern: emailPattern, message: t('VALIDATION_INVALID_EMAIL') },
            { min: 10, message: t('VALIDATION_EMAIL_MIN') },
            { max: 50, message: t('VALIDATION_EMAIL_MAX') },
          ]"
        >
          <a-input v-model:value.trim="formState.email">
            <template #prefix>
              <MailOutlined class="site-form-item-icon" />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 8 }">
          <a-button type="primary" html-type="submit">
            {{ t('SUBMIT') }}
          </a-button>
        </a-form-item>
      </a-form>
    </template>
  </Card>
</template>

<script lang="ts" setup>
import { reactive, onMounted } from 'vue';
import { message } from 'ant-design-vue';
import { UserOutlined, MailOutlined } from '@ant-design/icons-vue';
import { useI18n } from 'vue-i18n';

import Card from '@/components/General/Card.vue';
import APIController from '@/services/api/API.communicate';

const { t } = useI18n();

const alnumPattern = /^[A-Za-z0-9]+$/;
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};

const formState = reactive({
  login: '',
  email: '',
});

const onFinish = (values: any) => {
  APIController.sendRequest('apply-reset-password', 'POST', {
    login: values.login,
    email: values.email,
  })
    .then((res: any) => {
      message.success(res.message, 30);
    })
    .catch((err: any) => {
      message.error(err?.data?.message || t('ERROR'), 30);
    });
};

onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const hash = urlParams.get('rhash');

  if (!hash) return;

  APIController.sendRequest('reset-password', 'POST', { hash })
    .then((res: any) => {
      message.success(res.message, 30);
    })
    .catch((err: any) => {
      message.error(err?.data?.message || t('ERROR'), 30);
    });
});
</script>