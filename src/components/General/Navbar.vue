<template>
  <nav class="w-full">
    <div class="flex items-center justify-between gap-4">
      <!-- Logo -->
      <RouterLink to="/" class="shrink-0">
        <img
          src="@/assets/images/layout/reve_logo.png"
          alt="server-logo"
          class="h-14 w-auto object-contain sm:h-16"
        />
      </RouterLink>

      <!-- Desktop Navigation -->
      <div class="hidden lg:flex lg:items-center lg:gap-2">
        <RouterLink
          v-for="item in navItems"
          :key="item.key"
          :to="item.to"
          :class="navLinkClass(item.match)"
        >
          {{ t(item.label) }}
        </RouterLink>

        <!-- Language Dropdown -->
        <div class="relative ml-2" ref="languageDropdownRef">
          <button
            type="button"
            @click="isLanguageOpen = !isLanguageOpen"
            class="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-white transition hover:bg-white/10"
          >
            <country-flag :country="locale" size="small" />
            <span>{{ t('COUNTRY') }}</span>
            <svg
              class="h-4 w-4 transition"
              :class="{ 'rotate-180': isLanguageOpen }"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.148l3.71-3.92a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clip-rule="evenodd"
              />
            </svg>
          </button>

          <div
            v-if="isLanguageOpen"
            class="absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl"
          >
            <button
              type="button"
              @click="changeLanguage('gr')"
              class="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-white transition hover:bg-white/10"
            >
              <country-flag country="gr" size="small" />
              <span>{{ t('GR') }}</span>
            </button>

            <button
              type="button"
              @click="changeLanguage('us')"
              class="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-white transition hover:bg-white/10"
            >
              <country-flag country="us" size="small" />
              <span>{{ t('US') }}</span>
            </button>
          </div>
        </div>

        <!-- Socials -->
        <a
          href="https://facebook.com/ReventonMetin2"
          target="_blank"
          rel="noopener noreferrer"
          class="ml-2 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition hover:bg-blue-600/20 hover:text-blue-300"
        >
          <i class="fab fa-facebook text-lg"></i>
        </a>

        <a
          href="https://discord.gg/UvsUkY2Czr"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition hover:bg-indigo-500/20 hover:text-indigo-300"
        >
          <i class="fab fa-discord text-lg"></i>
        </a>
      </div>

      <!-- Mobile button -->
      <button
        type="button"
        @click="isMobileMenuOpen = !isMobileMenuOpen"
        class="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10 lg:hidden"
      >
        <svg
          v-if="!isMobileMenuOpen"
          class="h-6 w-6"
          fill="none"
          stroke="currentColor"
          stroke-width="1.8"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>

        <svg
          v-else
          class="h-6 w-6"
          fill="none"
          stroke="currentColor"
          stroke-width="1.8"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 6l12 12M18 6l-12 12" />
        </svg>
      </button>
    </div>

    <!-- Mobile Menu -->
    <div
      v-if="isMobileMenuOpen"
      class="mt-4 rounded-2xl border border-white/10 bg-slate-900/95 p-3 shadow-2xl lg:hidden"
    >
      <div class="flex flex-col gap-2">
        <RouterLink
          v-for="item in navItems"
          :key="item.key"
          :to="item.to"
          @click="isMobileMenuOpen = false"
          :class="mobileNavLinkClass(item.match)"
        >
          {{ t(item.label) }}
        </RouterLink>
      </div>

      <div class="my-4 h-px bg-white/10"></div>

      <div class="grid grid-cols-2 gap-2">
        <button
          type="button"
          @click="changeLanguage('gr')"
          class="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white transition hover:bg-white/10"
        >
          <country-flag country="gr" size="small" />
          {{ t('GR') }}
        </button>

        <button
          type="button"
          @click="changeLanguage('us')"
          class="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white transition hover:bg-white/10"
        >
          <country-flag country="us" size="small" />
          {{ t('US') }}
        </button>
      </div>

      <div class="mt-4 flex items-center gap-2">
        <a
          href="https://facebook.com/ReventonMetin2"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition hover:bg-blue-600/20 hover:text-blue-300"
        >
          <i class="fab fa-facebook text-lg"></i>
        </a>

        <a
          href="https://discord.gg/UvsUkY2Czr"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition hover:bg-indigo-500/20 hover:text-indigo-300"
        >
          <i class="fab fa-discord text-lg"></i>
        </a>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import CountryFlag from 'vue-country-flag-next'
import { useGeneralStore } from '@/stores/useGeneralStore'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
const generalStore = useGeneralStore()
const route = useRoute()

const isMobileMenuOpen = ref(false)
const isLanguageOpen = ref(false)
const languageDropdownRef = ref<HTMLElement | null>(null)

const navItems = [
  { key: '1', label: 'HOME', to: '/', match: '/' },
  { key: '2', label: 'NEWS', to: '/news', match: '/news' },
  { key: '3', label: 'REGISTER', to: '/register', match: '/register' },
  { key: '4', label: 'CHARACTER_LIST', to: '/players/1', match: '/players' },
  { key: '5', label: 'GUILD_LIST', to: '/guilds/1', match: '/guilds' },
  { key: '6', label: 'DOWNLOAD', to: '/download', match: '/download' },
  { key: '7', label: 'BONUS', to: '/bonus', match: '/bonus' },
]

const currentPath = computed(() => route.path)

function isActive(match: string) {
  if (match === '/') {
    return currentPath.value === '/'
  }

  return currentPath.value.startsWith(match)
}

function navLinkClass(match: string) {
  return [
    'inline-flex items-center rounded-xl px-4 py-2 text-sm font-semibold transition',
    isActive(match)
      ? 'bg-blue-600/20 text-blue-300 border border-blue-400/20'
      : 'text-slate-200 hover:bg-white/10 hover:text-white border border-transparent'
  ]
}

function mobileNavLinkClass(match: string) {
  return [
    'rounded-xl px-4 py-3 text-sm font-semibold transition',
    isActive(match)
      ? 'bg-blue-600/20 text-blue-300 border border-blue-400/20'
      : 'text-slate-200 hover:bg-white/10 hover:text-white border border-transparent'
  ]
}

function changeLanguage(lang: 'gr' | 'us') {
  generalStore.changeLang(lang)
  locale.value = lang
  isLanguageOpen.value = false
  isMobileMenuOpen.value = false
}

function handleClickOutside(event: MouseEvent) {
  const target = event.target as Node
  if (languageDropdownRef.value && !languageDropdownRef.value.contains(target)) {
    isLanguageOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>