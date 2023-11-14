<template>
  <Card v-if="!userStore.isLogged" title="ΣΎΝΔΕΣΗ ΛΟΓΑΡΙΑΣΜΟΎ">
    <template #content>
      <a-space direction="vertical" style="width: 100%; margin-bottom: 2vh">
        <a-alert
          v-if="showError"
          closable
          message="Αποτυχία σύνδεσης."
          :description="errorMessage"
          type="error"
          show-icon />
      </a-space>
      <a-form
        :model="formState"
        name="normal_login"
        class="login-form"
        @finish="onFinish"
        @finishFailed="onFinishFailed">
        <a-form-item
          label="Username"
          name="username"
          :rules="[
            { required: true, message: 'Please input your username!' },
            {
              pattern: `^[A-Za-z0-9]+$`,
              message:
                'Only uppercase letters (A-Z), lowercase letters (a-z), and digits (0-9) are allowed',
            },
          ]">
          <a-input v-model:value.trim="formState.username">
            <template #prefix>
              <UserOutlined class="site-form-item-icon" />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item
          label="Password"
          name="password"
          :rules="[
            { required: true, message: 'Please input your password!' },
            {
              pattern: `^[A-Za-z0-9]+$`,
              message:
                'Only uppercase letters (A-Z), lowercase letters (a-z), and digits (0-9) are allowed',
            },
          ]">
          <a-input-password v-model:value.trim="formState.password">
            <template #prefix>
              <LockOutlined class="site-form-item-icon" />
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item>
          <a class="login-form-forgot"
            ><router-link to="/forgot-password"
              >Ξέχασα τον κωδικό</router-link
            ></a
          >
        </a-form-item>

        <a-form-item>
          <a-button
            :disabled="disabled"
            type="primary"
            html-type="submit"
            class="login-form-button">
            Σύνδεση
          </a-button>
          Η
          <a><router-link to="/register">ΕΓΓΡΑΦΉ ΤΏΡΑ</router-link></a>
        </a-form-item>
      </a-form>
    </template>
  </Card>

  <Card v-else title="ΚΑΡΤΈΛΑ ΛΟΓΑΡΙΑΣΜΟΎ">
    <template #content>
      <a-menu
        v-model:selectedKeys="selectedKeys1"
        v-model:openKeys="openKeys"
        mode="inline"
        :style="{ height: '100%', borderRight: 0 }">
        <a-sub-menu key="sub1">
          <template #title>
            <span v-if="userStore.getUser">
              <user-outlined />
              Χρήστης: {{ userStore.getUser.login }}
            </span>
          </template>
          <a-menu-item
            key="1"
            v-if="userStore.getUser && userStore.getUser.isAdmin"
            ><router-link to="/admin-panel">Administrator</router-link></a-menu-item
          >

          <a-menu-item key="2"
            ><router-link to="/dashboard">Προφίλ</router-link></a-menu-item
          >
          <a-menu-item key="3"><a target="_blank" href="/itemshop">Itemshop</a></a-menu-item>
          <a-menu-item key="4"
            ><router-link to="/debug-characters"
              >Χαρακτήρες</router-link
            ></a-menu-item
          >
          <a-menu-item key="5"
            ><router-link to="/account-handeling"
              >Αλλαγή στοιχείων λογαριασμού</router-link
            ></a-menu-item
          >
          <a-menu-item @click="logout()" key="7">Αποσύνδεση</a-menu-item>
        </a-sub-menu>
      </a-menu>
    </template>
  </Card>

  <a-modal
    v-model:open="open"
    title="Reventon Shop"
    width="auto"
    @ok="handleOk">
    <iframe
      style="
         {
          margin: 0;
          height: calc(100vh - 4px);
          width: calc(100vw - 4px);
          box-sizing: border-box;
        }
      "
      data-tf-redirect-target="”_self”"
      frameborder="0"
      allowfullscreen
      src="https://reventon.gr/itemshop/"></iframe>
  </a-modal>
</template>

<script lang="ts" setup>
  import { computed, reactive, ref } from "vue";
  import { useUserStore } from "@/stores/useUserStore";
  import { useRouter } from "vue-router";
  import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
  import Card from "./Card.vue";
  import APIController from "@/services/api/API.communicate";
  import { message } from "ant-design-vue";

  declare const grecaptcha: any;

  const open = ref<boolean>(false);

  const selectedKeys1 = ref<string[]>(["1"]);
  const openKeys = ref<string[]>(["sub1"]);

  const showError = ref(false);
  const errorMessage = ref("");

  const router = useRouter();
  const userStore = useUserStore();

  interface FormState {
    username: string;
    password: string;
    remember: boolean;
  }
  const formState = reactive<FormState>({
    username: "",
    password: "",
    remember: true,
  });
  const onFinish = async (values: any) => {
    console.log("Success:", values);

    // Recaptcha validation start.
      const token = await grecaptcha
          .execute(import.meta.env.VITE_RECAPTCHA_SITE_KEY, {
            action: "login",
          });



      try {
        await APIController.sendRequest('verifyRecaptcha','POST', {
        secret: import.meta.env.VITE_RECAPTCHA_SECRET_KEY,
        response:token,
      })
      } catch (error) {
        message.error(error.data.message)
        return false
      }
    // Recaptcha validation end.
    // Clean error template every time login is pressed.

    showError.value = false;
    try {
      const login: any = await APIController.sendRequest("login", "POST", {
        login: formState.username,
        password: formState.password,
      });
      userStore.loggedUser.token = login.access_token;
      userStore.loggedUser.userInfo = login.accountInfo;
      userStore.loggedUser.login = true;
    } catch (error) {
      console.log(error);
      showError.value = true;
      message.error(error.data.message);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const disabled = computed(() => {
    return !(formState.username && formState.password);
  });

  const showModal = () => {
    open.value = true;
  };

  const handleOk = (e: MouseEvent) => {
    console.log(e);
    open.value = false;
  };

  function logout() {
    userStore.clearLoggedUser();
    router.push("/");
  }
</script>

<style scoped>
  #components-form-demo-normal-login .login-form {
    max-width: 300px;
  }
  #components-form-demo-normal-login .login-form-forgot {
    float: right;
  }
  #components-form-demo-normal-login .login-form-button {
    width: 100%;
  }
</style>
