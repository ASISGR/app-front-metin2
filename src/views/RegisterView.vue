<template>
  <Card :title="t('REGISTER')">
    <template
      #content
      v-if="serverSettings?.registerStatus && userStore.isLogged === false"
    >
      <a-space direction="vertical" style="width: 50%; margin-bottom: 10px">
        <a-alert
          v-if="serverSettings?.registerEmailActivationStatus"
          closable
          :message="t('REGISTER_INFO_NOTES_TITLE')"
          :description="t('REGISTER_INFO_NOTES')"
          type="info"
          show-icon
        />

        <a-alert
          v-if="successResponse"
          :message="t('REGISTER_SUCCESS_TITLE')"
          :description="successResponse"
          type="success"
          show-icon
          closable
        />

        <a-alert
          v-if="errorResponse"
          :message="t('ERROR')"
          :description="errorResponse"
          type="error"
          show-icon
          closable
        />
      </a-space>

      <a-form
        :model="formState"
        v-bind="layout"
        name="register-form"
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
            { trigger: 'change', validator: usernameExistValidation },
          ]"
        >
          <a-input v-model:value.trim="formState.login">
            <template #prefix>
              <UserOutlined class="site-form-item-icon" />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item
          :label="t('REGISTER_FIRSTNAME')"
          :name="['real_name']"
          :rules="[
            { required: true, message: t('VALIDATION_REALNAME_REQUIRED') },
            { pattern: alnumPattern, message: t('VALIDATION_ONLY_ALNUM') },
            { min: 3, message: t('VALIDATION_REALNAME_MIN') },
            { max: 17, message: t('VALIDATION_REALNAME_MAX') },
          ]"
        >
          <a-input v-model:value.trim="formState.real_name">
            <template #prefix>
              <UserOutlined class="site-form-item-icon" />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item
          :label="t('REGISTER_PASSWORD')"
          :name="['password']"
          :rules="[
            { required: true, message: t('VALIDATION_PASSWORD_REQUIRED') },
            { pattern: alnumPattern, message: t('VALIDATION_ONLY_ALNUM') },
            { min: 6, message: t('VALIDATION_PASSWORD_MIN') },
            { max: 16, message: t('VALIDATION_PASSWORD_MAX') },
          ]"
        >
          <a-input-password v-model:value.trim="formState.password">
            <template #prefix>
              <LockOutlined class="site-form-item-icon" />
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item
          :label="t('REGISTER_PASSWORD_REPEAT')"
          :name="['repeatPassword']"
          :rules="[
            { trigger: 'change', validator: passwordRepeatValidation },
            { required: true, message: t('VALIDATION_PASSWORD_REPEAT_REQUIRED') },
            { pattern: alnumPattern, message: t('VALIDATION_ONLY_ALNUM') },
            { min: 6, message: t('VALIDATION_REPEAT_PASSWORD_MIN') },
            { max: 16, message: t('VALIDATION_REPEAT_PASSWORD_MAX') },
          ]"
        >
          <a-input-password v-model:value.trim="formState.repeatPassword">
            <template #prefix>
              <LockOutlined class="site-form-item-icon" />
            </template>
          </a-input-password>
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
            { trigger: 'change', validator: emailExistValidation },
          ]"
        >
          <a-input v-model:value.trim="formState.email">
            <template #prefix>
              <MailOutlined class="site-form-item-icon" />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item
          :label="t('REGISTER_EMAIL_REPEAT')"
          :name="['repeatEmail']"
          :rules="[
            { trigger: 'change', validator: emailRepeatValidation },
            { type: 'email', message: t('VALIDATION_INVALID_EMAIL') },
            { required: true, message: t('VALIDATION_EMAIL_REPEAT_REQUIRED') },
            { pattern: emailPattern, message: t('VALIDATION_INVALID_EMAIL') },
            { min: 10, message: t('VALIDATION_EMAIL_MIN') },
            { max: 50, message: t('VALIDATION_EMAIL_MAX') },
          ]"
        >
          <a-input v-model:value.trim="formState.repeatEmail">
            <template #prefix>
              <MailOutlined class="site-form-item-icon" />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item
          :label="t('REGISTER_SECRET')"
          :name="['question1']"
          :rules="[
            { required: true, message: t('VALIDATION_SECRET_REQUIRED') },
          ]"
        >
          <a-select v-model:value="formState.question1">
            <a-select-option value="1">
              {{ t('SECRET_MOTHER_NAME') }}
            </a-select-option>
            <a-select-option value="2">
              {{ t('SECRET_FAVORITE_CITY') }}
            </a-select-option>
            <a-select-option value="3">
              {{ t('SECRET_PET_NAME') }}
            </a-select-option>
            <a-select-option value="4">
              {{ t('SECRET_FAVORITE_HERO') }}
            </a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item
          :label="t('REGISTER_SECRET_ANSWER')"
          :name="['answer1']"
          :rules="[
            { required: true, message: t('VALIDATION_SECRET_ANSWER_REQUIRED') },
            { pattern: alnumPattern, message: t('VALIDATION_ONLY_ALNUM') },
            { min: 3, message: t('VALIDATION_ANSWER_MIN') },
            { max: 50, message: t('VALIDATION_ANSWER_MAX') },
          ]"
        >
          <a-input v-model:value.trim="formState.answer1">
            <template #prefix>
              <SafetyOutlined class="site-form-item-icon" />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item
          :label="t('REGISTER_DELETE_CODE')"
          :name="['social_id']"
          :rules="[
            { required: true, message: t('VALIDATION_DELETE_CODE_REQUIRED') },
            { pattern: alnumPattern, message: t('VALIDATION_ONLY_ALNUM') },
            { min: 7, message: t('VALIDATION_DELETE_CODE_MIN') },
            { max: 7, message: t('VALIDATION_DELETE_CODE_MAX') },
          ]"
        >
          <a-input v-model:value.trim="formState.social_id">
            <template #prefix>
              <SecurityScanOutlined class="site-form-item-icon" />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item
          name="termsOfService"
          :rules="[
            {
              trigger: 'change',
              validator: checkTermsOfService,
            },
          ]"
          :wrapper-col="{ offset: 8, span: 8 }"
        >
          <a-checkbox v-model:checked="formState.termsOfService">
            {{ t('AGREE_TERMS_CONDITIONS') }}
          </a-checkbox>
        </a-form-item>

        <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 8 }">
          <a-button
            type="primary"
            html-type="submit"
            :loading="isSubmitting"
            :disabled="isSubmitting"
          >
            {{ isSubmitting ? t('PLEASE_WAIT') : t('SUBMIT') }}
          </a-button>
        </a-form-item>
      </a-form>
    </template>

    <template #content v-else>
      <a-result
        status="warning"
        :title="t('REGISTER_DEACTIVATED')"
      />
    </template>
  </Card>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue';
import { message } from 'ant-design-vue';
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  SecurityScanOutlined,
  SafetyOutlined,
} from '@ant-design/icons-vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

import Card from '@/components/General/Card.vue';
import APIController from '@/services/api/API.communicate';
import { useUserStore } from '@/stores/useUserStore';

declare const grecaptcha: any;

const { t } = useI18n();
const router = useRouter();
const userStore = useUserStore();

const alnumPattern = /^[A-Za-z0-9]+$/;
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const isSubmitting = ref(false);
const successResponse = ref('');
const errorResponse = ref('');
const serverSettings = ref<any>(null);

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};

const formState = reactive({
  login: '',
  password: '',
  repeatPassword: '',
  email: '',
  repeatEmail: '',
  social_id: '',
  question1: '1',
  answer1: '',
  real_name: '',
  termsOfService: false,
});

const resetForm = () => {
  formState.login = '';
  formState.email = '';
  formState.password = '';
  formState.repeatPassword = '';
  formState.real_name = '';
  formState.social_id = '';
  formState.question1 = '1';
  formState.answer1 = '';
  formState.repeatEmail = '';
  formState.termsOfService = false;
};

const onFinish = async () => {
  if (isSubmitting.value) return;

  successResponse.value = '';
  errorResponse.value = '';
  isSubmitting.value = true;

  let recaptchaToken = '';

  try {
    const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

    if (!siteKey) {
      throw new Error('Missing VITE_RECAPTCHA_SITE_KEY');
    }

    if (typeof grecaptcha === 'undefined') {
      throw new Error('grecaptcha is not loaded');
    }

    recaptchaToken = await new Promise<string>((resolve, reject) => {
      grecaptcha.ready(() => {
        grecaptcha
          .execute(siteKey, { action: 'register' })
          .then((token: string) => resolve(token))
          .catch((error: any) => reject(error));
      });
    });

    if (!recaptchaToken) {
      throw new Error('Empty recaptcha token');
    }
  } catch (error: any) {
    console.log('Register recaptcha frontend error:', error);
    errorResponse.value = t('RECAPTCHA_FAILED');
    message.error(errorResponse.value, 30);
    isSubmitting.value = false;
    return;
  }

  try {
    const res: any = await APIController.sendRequest('create', 'POST', {
      ...formState,
      recaptchaToken,
    });

    successResponse.value = res.message || t('REGISTER_SUCCESS_TITLE');

    try {
      const login: any = await APIController.sendRequest('login', 'POST', {
        login: formState.login,
        password: formState.password,
        recaptchaToken,
      });

      setTimeout(() => {
        userStore.loggedUser.token = login.access_token;
        userStore.loggedUser.userInfo = login.accountInfo;
        userStore.loggedUser.login = true;
        router.push('/dashboard');
      }, 5000);
    } catch (error: any) {
      console.log(error);
    }

    resetForm();
  } catch (err: any) {
    console.log(err);
    errorResponse.value = err?.data?.message || t('REGISTER_FAILED');
    message.error(errorResponse.value, 30);
  } finally {
    isSubmitting.value = false;
  }
};

const checkTermsOfService = (_rule: any, value: boolean) => {
  if (!value) {
    return Promise.reject(t('VALIDATION_TERMS_REQUIRED'));
  }

  return Promise.resolve();
};

const emailRepeatValidation = (_rule: any, value: string) => {
  if (value !== formState.email) {
    return Promise.reject(t('VALIDATION_EMAIL_MATCH'));
  }

  return Promise.resolve();
};

const passwordRepeatValidation = (_rule: any, value: string) => {
  if (value !== formState.password) {
    return Promise.reject(t('VALIDATION_PASSWORD_MATCH'));
  }

  return Promise.resolve();
};

const usernameExistValidation = async (_rule: any, value: string) => {
  if (!value) return Promise.resolve();

  try {
    const res: any = await APIController.sendRequest('validation', 'POST', {
      login: value,
    });

    if (res.status === true) {
      return Promise.resolve();
    }

    return Promise.reject(t('ERROR'));
  } catch (response: any) {
    return Promise.reject(response?.data?.message || t('ERROR'));
  }
};

const emailExistValidation = async (_rule: any, value: string) => {
  if (!value) return Promise.resolve();

  try {
    const res: any = await APIController.sendRequest('validation', 'POST', {
      email: value,
    });

    if (res.status === true) {
      return Promise.resolve();
    }

    return Promise.reject(t('ERROR'));
  } catch (response: any) {
    return Promise.reject(response?.data?.message || t('ERROR'));
  }
};

onMounted(() => {
  APIController.sendRequest('settings-status', 'GET')
    .then((response: any) => {
      serverSettings.value = response;
    })
    .catch((err: any) => console.log(err));
});
</script>