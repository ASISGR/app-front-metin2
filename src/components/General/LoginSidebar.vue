<template>
  <!-- Guest -->
  <Card v-if="!userStore.isLogged" title="ΣΎΝΔΕΣΗ ΛΟΓΑΡΙΑΣΜΟΎ">
    <template #content>
      <div class="space-y-5">
        <!-- Error Alert -->
        <div
          v-if="showError"
          class="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-red-200"
        >
          <div class="flex items-start gap-3">
            <div class="mt-0.5 shrink-0">
              <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fill-rule="evenodd"
                  d="M18 10A8 8 0 114 4.93V4a1 1 0 112 0v1.07A8 8 0 0118 10zm-8-4a1 1 0 00-1 1v3a1 1 0 102 0V7a1 1 0 00-1-1zm0 8a1.25 1.25 0 100-2.5A1.25 1.25 0 0010 14z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div>
              <p class="font-semibold">Αποτυχία σύνδεσης.</p>
              <p class="mt-1 text-sm text-red-200/90">
                {{ errorMessage }}
              </p>
            </div>
          </div>
        </div>

        <!-- Form -->
        <form class="space-y-4" @submit.prevent="onSubmit">
          <!-- Username -->
          <div class="space-y-2">
            <label class="block text-sm font-semibold text-black">
              Username
            </label>

            <div class="relative">
              <span class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    d="M10 10a4 4 0 100-8 4 4 0 000 8zm-7 8a7 7 0 1114 0H3z"
                  />
                </svg>
              </span>

              <input
                v-model.trim="formState.username"
                type="text"
                autocomplete="username"
                class="w-full rounded-2xl border border-white/10 bg-slate-950/80 py-3 pl-10 pr-4 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-400/40 focus:ring-2 focus:ring-blue-500/20"
                placeholder="Εισάγετε username"
              />
            </div>

            <p v-if="usernameError" class="text-sm text-red-300">
              {{ usernameError }}
            </p>
          </div>

          <!-- Password -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-black">
              Password
            </label>

            <div class="relative">
              <span class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
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
                placeholder="Εισάγετε κωδικό"
              />

              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 transition hover:text-white"
              >
                <svg
                  v-if="!showPassword"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 3C5 3 1.73 7.11.46 9.07a1.67 1.67 0 000 1.86C1.73 12.89 5 17 10 17s8.27-4.11 9.54-6.07a1.67 1.67 0 000-1.86C18.27 7.11 15 3 10 3zm0 11a4 4 0 110-8 4 4 0 010 8z" />
                  <path d="M10 8a2 2 0 100 4 2 2 0 000-4z" />
                </svg>

                <svg
                  v-else
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M4.03 3.97a.75.75 0 10-1.06 1.06l1.44 1.44C2.76 7.76 1.48 9.37.46 10.93a1.67 1.67 0 000 1.86C1.73 14.75 5 18.86 10 18.86c1.88 0 3.52-.58 4.95-1.45l2.02 2.02a.75.75 0 101.06-1.06L4.03 3.97zm8.1 8.1A2 2 0 019.93 9.87l2.2 2.2zM10 5.14c5 0 8.27 4.11 9.54 6.07.2.31.2.71 0 1.02a18.78 18.78 0 01-3.33 3.74l-1.49-1.49A4 4 0 008.52 8.25L6.3 6.03A8.65 8.65 0 0110 5.14z"
                  />
                </svg>
              </button>
            </div>

            <p v-if="passwordError" class="text-sm text-red-300">
              {{ passwordError }}
            </p>
          </div>

          <!-- Actions -->
          <div class="flex items-center justify-between gap-3 text-sm">
            <RouterLink
              to="/forgot-password"
              class="text-black transition hover:text-gray-600"
            >
              Ξέχασα τον κωδικό
            </RouterLink>

            <RouterLink
              to="/register"
              class="font-semibold text-blue-500 transition hover:text-blue-400"
            >
              ΕΓΓΡΑΦΉ ΤΏΡΑ
            </RouterLink>
          </div>

          <!-- Submit -->
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
            <svg
              v-if="isSubmitting"
              class="mr-2 h-5 w-5 animate-spin"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              />
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
            {{ isSubmitting ? 'Σύνδεση...' : 'Σύνδεση' }}
          </button>
        </form>
      </div>
    </template>
  </Card>

  <!-- Logged In -->
  <Card v-else title="ΚΑΡΤΈΛΑ ΛΟΓΑΡΙΑΣΜΟΎ">
    <template #content>
      <div class="space-y-4">
        <!-- User header -->
        <div class="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
          <div class="flex items-center gap-3">
            <div
              class="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600/20 text-blue-300"
            >
              <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  d="M10 10a4 4 0 100-8 4 4 0 000 8zm-7 8a7 7 0 1114 0H3z"
                />
              </svg>
            </div>

            <div>
              <p class="text-xs uppercase tracking-wide text-slate-400">
                Χρήστης
              </p>
              <p class="font-semibold text-white">
                {{ userStore.getUser?.login }}
              </p>
            </div>
          </div>
        </div>

        <!-- Account menu -->
        <div class="space-y-2">
          <RouterLink
            v-if="userStore.getUser && userStore.getUser.isAdmin"
            to="/admin-panel"
            class="sidebar-link"
          >
            Administrator
          </RouterLink>

          <RouterLink to="/dashboard" class="sidebar-link">
            Προφίλ
          </RouterLink>

          <a
            href="https://itemshop.aeolus2.eu/"
            target="_blank"
            rel="noopener noreferrer"
            class="sidebar-link"
          >
            Itemshop
          </a>

          <RouterLink to="/debug-characters" class="sidebar-link">
            Χαρακτήρες
          </RouterLink>

          <RouterLink to="/account-handeling" class="sidebar-link">
            Αλλαγή στοιχείων λογαριασμού
          </RouterLink>

          <button
            type="button"
            @click="logout"
            class="sidebar-link w-full text-left text-red-300 hover:text-red-200"
          >
            Αποσύνδεση
          </button>
        </div>
      </div>
    </template>
  </Card>

  <!-- Shop Modal -->
  <div
    v-if="open"
    class="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
  >
    <div
      class="relative w-full max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-slate-950 shadow-2xl"
    >
      <div class="flex items-center justify-between border-b border-white/10 px-5 py-4">
        <h3 class="text-lg font-semibold text-white">Asceo2 Shop</h3>
        <button
          type="button"
          @click="handleOk"
          class="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white transition hover:bg-white/10"
        >
          Κλείσιμο
        </button>
      </div>

      <iframe
        class="h-[80vh] w-full"
        data-tf-redirect-target="_self"
        frameborder="0"
        allowfullscreen
        src="https://asceo2.eu/itemshop/"
      ></iframe>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/useUserStore'
import Card from './Card.vue'
import APIController from '@/services/api/API.communicate'
import { message } from 'ant-design-vue'

declare const grecaptcha: any

const router = useRouter()
const userStore = useUserStore()

const open = ref(false)
const showError = ref(false)
const errorMessage = ref('')
const showPassword = ref(false)
const isSubmitting = ref(false)

interface FormState {
  username: string
  password: string
  remember: boolean
}

const formState = reactive<FormState>({
  username: '',
  password: '',
  remember: true,
})

const usernameError = computed(() => {
  if (!formState.username) return ''
  if (!/^[A-Za-z0-9]+$/.test(formState.username)) {
    return 'Only uppercase letters (A-Z), lowercase letters (a-z), and digits (0-9) are allowed'
  }
  return ''
})

const passwordError = computed(() => {
  if (!formState.password) return ''
  if (!/^[A-Za-z0-9]+$/.test(formState.password)) {
    return 'Only uppercase letters (A-Z), lowercase letters (a-z), and digits (0-9) are allowed'
  }
  return ''
})

const disabled = computed(() => {
  return !formState.username || !formState.password || !!usernameError.value || !!passwordError.value
})

async function onSubmit() {
  if (disabled.value || isSubmitting.value) return

  isSubmitting.value = true
  showError.value = false
  errorMessage.value = ''

  try {
    const token = await grecaptcha.execute(import.meta.env.VITE_RECAPTCHA_SITE_KEY, {
      action: 'login',
    })

    await APIController.sendRequest('verifyRecaptcha', 'POST', {
      secret: import.meta.env.VITE_RECAPTCHA_SECRET_KEY,
      response: token,
    })
  } catch (error: any) {
    message.error(error?.data?.message || 'Recaptcha verification failed.', 30)
    isSubmitting.value = false
    return
  }

  try {
    const login: any = await APIController.sendRequest('login', 'POST', {
      login: formState.username,
      password: formState.password,
    })

    userStore.loggedUser.token = login.access_token
    userStore.loggedUser.userInfo = login.accountInfo
    userStore.loggedUser.login = true

    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const hash = urlParams.get('hash')

    if (hash) {
      router.push(`/dashboard?hash=${hash}`)
    } else {
      router.push('/dashboard')
    }
  } catch (error: any) {
    console.log(error)
    showError.value = true
    errorMessage.value = error?.data?.message || 'Παρουσιάστηκε πρόβλημα κατά τη σύνδεση.'
    message.error(error?.data?.message || 'Login failed.', 30)
  } finally {
    isSubmitting.value = false
  }
}

const showModal = () => {
  open.value = true
}

const handleOk = () => {
  open.value = false
}

function logout() {
  userStore.clearLoggedUser()
  router.push('/')
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
  color: rgb(226 232 240);
  transition: all 0.2s ease;
}

.sidebar-link:hover {
  background: rgb(255 255 255 / 0.08);
  color: white;
}
</style>