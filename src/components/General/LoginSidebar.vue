<template>
  <Card v-if="!userStore.isLogged" :title="t('LOGIN_ACCOUNT_TITLE')">
    <template #content>
      <div class="space-y-5">
        <div
          v-if="showError"
          class="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-red-200"
        >
          <p class="font-semibold">{{ t('LOGIN_FAILED') }}</p>
          <p class="mt-1 text-sm text-red-200/90">{{ errorMessage }}</p>
        </div>

        <form class="space-y-4" @submit.prevent="onSubmit">
          <div class="relative">
            <span
              class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400"
            >
              <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 10a4 4 0 100-8 4 4 0 000 8zm-7 8a7 7 0 1114 0H3z" />
              </svg>
            </span>

            <input
              v-model.trim="formState.username"
              type="text"
              autocomplete="username"
              class="w-full rounded-2xl border border-white/10 bg-slate-950/80 py-3 pl-10 pr-4 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-400/40 focus:ring-2 focus:ring-blue-500/20"
              :placeholder="t('LOGIN_USERNAME_PLACEHOLDER')"
            />
          </div>

        <div class="relative">
          <span
            class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400"
          >
            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fill-rule="evenodd"
                d="M5 8V6a5 5 0 1110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm2 0h6V6a3 3 0 10-6 0v2z"
                clip-rule="evenodd"
              />
            </svg>
          </span>

          <input
            v-model.trim="formState.password"
            :type="showPassword ? 'text' : 'password'"
            autocomplete="current-password"
            class="w-full rounded-2xl border border-white/10 bg-slate-950/80 py-3 pl-10 pr-12 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-400/40 focus:ring-2 focus:ring-blue-500/20"
            :placeholder="t('LOGIN_PASSWORD_PLACEHOLDER')"
          />

          <button
            type="button"
            @click="showPassword = !showPassword"
            class="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 transition hover:text-white"
          >
            <!-- βάλε εδώ τα 2 eye svg όπως τα είχες -->
          </button>
        </div>

          <div class="flex items-center justify-between gap-3 text-sm">
            <RouterLink to="/forgot-password" class="text-black transition hover:text-gray-600">
              {{ t('FORGOT_PASSWORD') }}
            </RouterLink>

            <RouterLink to="/register" class="font-semibold text-blue-500 transition hover:text-blue-400">
              {{ t('REGISTER_NOW') }}
            </RouterLink>
          </div>

          <button
            type="submit"
            :disabled="disabled || isSubmitting"
            class="inline-flex w-full items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold text-white transition"
            :class="
              disabled || isSubmitting
                ? 'cursor-not-allowed bg-slate-700/70'
                : 'bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-900/30'
            "
          >
            {{ isSubmitting ? t('LOGIN_LOADING') : t('LOGIN') }}
          </button>
        </form>
      </div>
    </template>
  </Card>

  <Card v-else :title="t('ACCOUNT_PANEL_TITLE')">
    <template #content>
      <div class="space-y-4">
        <div class="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
          <p class="text-xs uppercase tracking-wide text-slate-400">
            {{ t('USER') }}
          </p>
          <p class="font-semibold text-white">
            {{ userStore.getUser?.login }}
          </p>
        </div>

        <div class="space-y-2">
          <RouterLink
            v-if="userStore.getUser && userStore.getUser.isAdmin"
            to="/admin-panel"
            class="sidebar-link"
          >
            Administrator
          </RouterLink>

          <RouterLink to="/dashboard" class="sidebar-link">
            {{ t('PROFILE') }}
          </RouterLink>

          <a
            href="https://itemshop.reventon.gr/"
            target="_blank"
            rel="noopener noreferrer"
            class="sidebar-link"
          >
            Itemshop
          </a>

          <RouterLink to="/debug-characters" class="sidebar-link">
            {{ t('CHARACTER_LIST') }}
          </RouterLink>

          <RouterLink to="/account-handeling" class="sidebar-link">
            {{ t('ACCOUNT_DETAILS_CHANGE_TITLE') }}
          </RouterLink>

          <button
            type="button"
            @click="logout"
            class="sidebar-link w-full text-left text-red-300 hover:text-red-200"
          >
            {{ t('LOGOUT') }}
          </button>
        </div>
      </div>
    </template>
  </Card>

  <div
    v-if="open"
    class="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
  >
    <div class="relative w-full max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-slate-950 shadow-2xl">
      <div class="flex items-center justify-between border-b border-white/10 px-5 py-4">
        <h3 class="text-lg font-semibold text-white">Reventon Shop</h3>

        <button
          type="button"
          @click="handleOk"
          class="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white transition hover:bg-white/10"
        >
          {{ t('CLOSE') }}
        </button>
      </div>

      <iframe
        class="h-[80vh] w-full"
        data-tf-redirect-target="_self"
        frameborder="0"
        allowfullscreen
        src="https://itemshop.reventon.gr/"
      ></iframe>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { message } from 'ant-design-vue';
import { useI18n } from 'vue-i18n';

import { useUserStore } from '@/stores/useUserStore';
import Card from './Card.vue';
import APIController from '@/services/api/API.communicate';

declare const grecaptcha: any;

const { t } = useI18n();
const router = useRouter();
const userStore = useUserStore();

const open = ref(false);
const showError = ref(false);
const errorMessage = ref('');
const showPassword = ref(false);
const isSubmitting = ref(false);

const formState = reactive({
  username: '',
  password: '',
  remember: true,
});

const alnumPattern = /^[A-Za-z0-9]+$/;

const usernameError = computed(() => {
  if (!formState.username) return '';
  if (!alnumPattern.test(formState.username)) return t('VALIDATION_ONLY_ALNUM');
  return '';
});

const passwordError = computed(() => {
  if (!formState.password) return '';
  if (!alnumPattern.test(formState.password)) return t('VALIDATION_ONLY_ALNUM');
  return '';
});

const disabled = computed(() => {
  return (
    !formState.username ||
    !formState.password ||
    !!usernameError.value ||
    !!passwordError.value
  );
});

async function onSubmit() {
  if (disabled.value || isSubmitting.value) return;

  isSubmitting.value = true;
  showError.value = false;
  errorMessage.value = '';

  let recaptchaToken = '';

  try {
    const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

    if (!siteKey) throw new Error('Missing VITE_RECAPTCHA_SITE_KEY');
    if (typeof grecaptcha === 'undefined') throw new Error('grecaptcha is not loaded');

    recaptchaToken = await new Promise<string>((resolve, reject) => {
      grecaptcha.ready(() => {
        grecaptcha
          .execute(siteKey, { action: 'login' })
          .then((token: string) => resolve(token))
          .catch((error: any) => reject(error));
      });
    });

    if (!recaptchaToken) throw new Error('Empty recaptcha token');
  } catch (error: any) {
    console.log('Recaptcha frontend error:', error);
    showError.value = true;
    errorMessage.value = t('RECAPTCHA_FAILED');
    message.error(errorMessage.value, 30);
    isSubmitting.value = false;
    return;
  }

  try {
    const login: any = await APIController.sendRequest('login', 'POST', {
      login: formState.username,
      password: formState.password,
      recaptchaToken,
    });

    userStore.loggedUser.token = login.access_token;
    userStore.loggedUser.userInfo = login.accountInfo;
    userStore.loggedUser.login = true;

    const urlParams = new URLSearchParams(window.location.search);
    const hash = urlParams.get('hash');

    router.push(hash ? `/dashboard?hash=${hash}` : '/dashboard');
  } catch (error: any) {
    console.log(error);
    showError.value = true;
    errorMessage.value = error?.data?.message || t('LOGIN_ERROR');
    message.error(errorMessage.value, 30);
  } finally {
    isSubmitting.value = false;
  }
}

const handleOk = () => {
  open.value = false;
};

function logout() {
  userStore.clearLoggedUser();
  router.push('/');
}
</script>

<style scoped>
.sidebar-link {
  display: block;
  width: 100%;
  border-radius: 1rem;
  border: 1px solid rgb(255 255 255 / 0.08);
  background: rgb(255 255 255 / 0.03);
  padding: 0.9rem 1rem;
  font-size: 0.95rem;
  font-weight: 600;
  color: rgb(0, 0, 0);
  transition: all 0.2s ease;
}

.sidebar-link:hover {
  background: rgba(63, 52, 52, 0.08);
  color: rgb(131, 126, 126);
}
</style>