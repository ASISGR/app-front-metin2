<template>
 
  <Card :title=getChangeCredentialsTitle()>
    <template #content> 
      <a-form
        :model="formState"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        name="change-credentials"
        @finish="onFinish"
      >

      <a-form-item
          :label=getChangeCredentialsCurrentP()
          :name="['oldPassword']"
          :rules="[
            { required: true, message: 'Please input your current password!' },
            {
              pattern: `^[A-Za-z0-9]+$`,
              message:
                'Only uppercase letters (A-Z), lowercase letters (a-z), and digits (0-9) are allowed',
            },
            {
              min: 6,
              message: 'Password must be at least 6 characters long',
            },
            { max: 16, message: 'Password cannot exceed 16 characters' },
          ]"
        >
          <a-input-password v-model:value.trim="formState.oldPassword">
            <template #prefix>
              <LockOutlined class="site-form-item-icon" />
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item
        :label=getChangeCredentialsNewP()
          :name="['newPassword']"
          :rules="[
            { required: true, message: 'Please input your password!' },
            {
              pattern: `^[A-Za-z0-9]+$`,
              message:
                'Only uppercase letters (A-Z), lowercase letters (a-z), and digits (0-9) are allowed',
            },
            {
              min: 6,
              message: 'Password must be at least 6 characters long',
            },
            { max: 16, message: 'Password cannot exceed 16 characters' },
          ]"
        >
          <a-input-password v-model:value.trim="formState.newPassword">
            <template #prefix>
              <LockOutlined class="site-form-item-icon" />
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item
        :label=getChangeCredentialsRepeatNewP()
          :name="['repeatNewPassword']"
          :rules="[
            { trigger: 'change', validator: passwordRepeatValidation },

            { required: true, message: 'Please repeat your password!' },
            {
              pattern: `^[A-Za-z0-9]+$`,
              message:
                'Only uppercase letters (A-Z), lowercase letters (a-z), and digits (0-9) are allowed',
            },
            {
              min: 6,
              message: 'Repeat password must be at least 6 characters long',
            },
            { max: 16, message: 'Repeat password cannot exceed 16 characters' },
          ]"
        >
          <a-input-password v-model:value.trim="formState.repeatNewPassword">
            <template #prefix>
              <LockOutlined class="site-form-item-icon" />
            </template>
          </a-input-password>
        </a-form-item>

      
        <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" html-type="submit">{{ t('SUBMIT') }}</a-button>
        </a-form-item>
      </a-form>

    </template>
  </Card>
</template>
<script lang="ts" setup>
import Card from '@/components/General/Card.vue';
import APIController from '@/services/api/API.communicate';
import { useUserStore } from '@/stores/useUserStore';
import { useRouter } from 'vue-router';
import { onMounted, reactive, ref } from 'vue';
import { message } from 'ant-design-vue';
import {
  LockOutlined,
} from '@ant-design/icons-vue';
import { useI18n } from 'vue-i18n';
const { t, locale } = useI18n()

const userStore = useUserStore();
const route = useRouter();

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

const onFinish = (values: any) => {

  APIController.sendRequest('change-user-password', 'POST', {
    previousPassword: formState.oldPassword,
    updatePassword: formState.newPassword,
  })
    .then((response: any) => {
      message.success(response.message);
    })
    .catch((err) => {
      message.error(err.data.message);
    });
};

const passwordRepeatValidation = (rule: any, value: string) => {
  if (value !== formState.newPassword) {
    return Promise.reject("New password and Repeat new Password does not match.");
  }
  return Promise.resolve();
};

onMounted(() => {
  if (!userStore.isLogged) {
    route.push('/');
    return 0;
  }
});

function getChangeCredentialsTitle(){
  return  t('CREDENTIALS_CHANGE') 

}

function getChangeCredentialsCurrentP(){
  return  t('CREDENTIALS_CURRENT_PASSOWRD') 

}

function getChangeCredentialsNewP(){
  return  t('CREDENTIALS_NEW_PASSOWRD') 

}

function getChangeCredentialsRepeatNewP(){
  return  t('CREDENTIALS_REPEAT_NEW_PASSOWRD') 

}



</script>
