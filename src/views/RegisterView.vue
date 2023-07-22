<template>
  <Card title="Register">
    <template
      #content
      v-if="serverSettings?.registerStatus && userStore.isLogged === false"
    >
      <a-space direction="vertical" style="width: 50%; margin-bottom: 10px">
        <a-alert
          v-if="serverSettings?.registerEmailActivationStatus"
          closable
          message="Informational Notes"
          description="Please ensure you input a valid email address. After creating your account, you will need to verify your email to sign in to the game and gain access to all features."
          type="info"
          show-icon
        />
        <a-alert
          v-if="successResponse"
          message="Account created!"
          :description="successResponse"
          type="success"
          show-icon
          closable
        />
        <a-alert
          v-if="errorResponse"
          message="Error"
          :description="errorResponse"
          type="error"
          show-icon
          closable
        />
      </a-space>
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
          label="Real Name"
          :name="['real_name']"
          :rules="[
            { required: true, message: 'Please input your real name!' },
            {
              pattern: `^[A-Za-z0-9]+$`,
              message:
                'Only uppercase letters (A-Z), lowercase letters (a-z), and digits (0-9) are allowed',
            },
            {
              min: 3,
              message: 'Real Name must be at least 3 characters long',
            },
            { max: 17, message: 'Username cannot exceed 17 characters' },
          ]"
        >
          <a-input v-model:value.trim="formState.real_name">
            <template #prefix>
              <UserOutlined class="site-form-item-icon" />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item
          label="Password"
          :name="['password']"
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
          <a-input-password v-model:value.trim="formState.password">
            <template #prefix>
              <LockOutlined class="site-form-item-icon" />
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item
          label="Repeat password"
          :name="['repeatPassword']"
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
          <a-input-password v-model:value.trim="formState.repeatPassword">
            <template #prefix>
              <LockOutlined class="site-form-item-icon" />
            </template>
          </a-input-password>
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

        <a-form-item
          :name="['repeatEmail']"
          label="Repeat email"
          :rules="[
            { trigger: 'change', validator: emailRepeatValidation },

            { type: 'email' },
            { required: true, message: 'Please repeat your email!' },
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
          <a-input v-model:value.trim="formState.repeatEmail">
            <template #prefix>
              <MailOutlined class="site-form-item-icon" />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item
          label="question-secret"
          :name="['question1']"
          :rules="[{ required: true, message: 'Please select a secret!' }]"
        >
          <a-select v-model:value="formState.question1">
            <a-select-option value="1">Όνομα μητέρας</a-select-option>
            <a-select-option value="2">Αγαπημένη πόλη</a-select-option>
            <a-select-option value="3">Όνομα κατοικιδίου</a-select-option>
            <a-select-option value="4">αγαπημένου ήρωα</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item
          label="Answer"
          :name="['answer1']"
          :rules="[
            { required: true, message: 'Please input your secret!' },
            {
              pattern: `^[A-Za-z0-9]+$`,
              message:
                'Only uppercase letters (A-Z), lowercase letters (a-z), and digits (0-9) are allowed',
            },
            {
              min: 3,
              message: 'Answer  must be at least 3 characters long',
            },
            { max: 50, message: 'Answer cannot exceed 50 characters' },
          ]"
        >
          <a-input v-model:value.trim="formState.answer1">
            <template #prefix>
              <SafetyOutlined class="site-form-item-icon" />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item
          :name="['social_id']"
          label="Delete character code"
          :rules="[
            {
              required: true,
              message: 'Please input your delete character code!',
            },
            {
              pattern: `^[A-Za-z0-9]+$`,
              message:
                'Only uppercase letters (A-Z), lowercase letters (a-z), and digits (0-9) are allowed',
            },
            {
              min: 7,
              message:
                'Delete character code  must be at least 7 characters long',
            },
            {
              max: 7,
              message: 'Delete character code cannot exceed 7 characters',
            },
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
            I agree with the Terms and Conditions
          </a-checkbox>
        </a-form-item>

        <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 8 }">
          <a-button type="primary" html-type="submit">Αποστολή</a-button>
        </a-form-item>
      </a-form>
    </template>
    <template #content v-else>
      <a-result
        status="warning"
        title="Register is deactivated or you are logged in."
      >
      </a-result>
    </template>
  </Card>
</template>
<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue';
import Card from '@/components/General/Card.vue';
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  SecurityScanOutlined,
  SafetyOutlined,
} from '@ant-design/icons-vue';
import APIController from '@/services/api/API.communicate';
import { useUserStore } from '@/stores/useUserStore';

const userStore = useUserStore();
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

const successResponse = ref('');
const errorResponse = ref('');
const serverSettings = ref<any>(null);

const onFinish = (values: any) => {
  successResponse.value = '';
  errorResponse.value = '';

  APIController.sendRequest('create', 'POST', formState)
    .then((res: any) => {
      formState.login = '';
      formState.email = '';
      formState.password = '';
      formState.repeatPassword = '';
      formState.real_name = '';
      formState.social_id = '';
      formState.question1 = '1';
      formState.answer1 = '';
      formState.repeatEmail = '';
      successResponse.value = res.message;
    })
    .catch((err) => {
      console.log(err);
      errorResponse.value = err.data.message;
    });
};

const checkTermsOfService = (rule: any, value: boolean) => {
  if (!value) {
    return Promise.reject('Accept our terms of service to create your account');
  }
  return Promise.resolve();
};
const emailRepeatValidation = (rule: any, value: string) => {
  if (value !== formState.email) {
    return Promise.reject("Email and Repeat Email don't match");
  }
  return Promise.resolve();
};
const passwordRepeatValidation = (rule: any, value: string) => {
  if (value !== formState.password) {
    return Promise.reject("Password and Repeat Password don't match");
  }
  return Promise.resolve();
};

onMounted(() => {
  APIController.sendRequest('settings-status', 'GET')
    .then((response: any) => {
      serverSettings.value = response;
    })
    .catch((err) => console.log(err));
});
</script>
