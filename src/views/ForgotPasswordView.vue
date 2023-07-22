<template>
  <Card title="ΕΠΑΝΑΦΟΡΆ ΛΟΓΑΡΙΑΣΜΟΎ">
    <template #content>
      <a-form
        :model="formState"
        v-bind="layout"
        name="nest-messages"
        @finish="onFinish"
      >
        <a-form-item
          label="Username"
          :name="['login']"
          :rules="[
            { required: true, message: 'Please input your username!' },
            {
              pattern: `^[A-Za-z0-9]+$`,
              message:
                'Only uppercase letters (A-Z), lowercase letters (a-z), and digits (0-9) are allowed',
            },
            {
              min: 5,
              message: 'Username must be at least 5 characters long',
            },
            { max: 16, message: 'Username cannot exceed 16 characters' },
          ]"
        >
          <a-input v-model:value.trim="formState.login">
            <template #prefix>
              <UserOutlined class="site-form-item-icon" />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item
          :name="['email']"
          label="Email"
          :rules="[
            { type: 'email' },
            { required: true, message: 'Please input your email!' },
            {
              pattern: `^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`,
              message:
                'Invalid email format. Please enter a valid email address',
            },
            {
              min: 10,
              message: 'Email must be at least 10 characters long',
            },
            { max: 50, message: 'Email cannot exceed 50 characters' },
          ]"
        >
          <a-input v-model:value.trim="formState.email">
            <template #prefix>
              <MailOutlined class="site-form-item-icon" />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 8 }">
          <a-button type="primary" html-type="submit">Αποστολή</a-button>
        </a-form-item>
      </a-form>
    </template></Card
  >
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue';

import Card from '@/components/General/Card.vue';
import { UserOutlined, MailOutlined } from '@ant-design/icons-vue';
const formState = reactive({
  login: '',
  email: '',
});

const onFinish = (values: any) => {};
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};
</script>
