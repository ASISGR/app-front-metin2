<template>
 
  <Card title="ΑΛΛΑΓΉ ΚΩΔΙΚΟΎ ΠΡΌΣΒΑΣΗΣ">
    <template #content> 
      <a-form
        :model="formState"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        name="change-credentials"
        @finish="onFinish"
      >

      <a-form-item
          label="Current Password"
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
          label="New password"
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
          label="Repeat new password"
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
          <a-button type="primary" html-type="submit">Αλλαγή κωδικού πρόσβασης</a-button>
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
      console.log(response);
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
  }
});
</script>
