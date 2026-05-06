<template>
  <footer class="w-full">
    <div
      class="mx-auto flex w-full max-w-[1600px] flex-col gap-4 border-t border-white/10 px-4 py-6 text-white lg:flex-row lg:items-center lg:justify-between"
    >
      <!-- Left -->
      <div class="text-sm font-semibold tracking-wide text-white">
        {{ t('FOOTER_COPYRIGHT') }}
      </div>

      <!-- Right -->
      <div class="flex flex-wrap items-center gap-3 text-sm">
        <RouterLink to="/" class="footer-link">
          {{ t('FOOTER_PARTNERSHIP') }}
        </RouterLink>

        <RouterLink to="/" class="footer-link">
          {{ t('FOOTER_SERVER') }}
        </RouterLink>

        <RouterLink to="/" class="footer-link">
          {{ t('FOOTER_RULES') }}
        </RouterLink>

        <a href="/legal/Refund-policy.pdf" target="_blank" class="footer-link">
          {{ t('FOOTER_REFUND') }}
        </a>

        <a href="/legal/Privacy-policy.pdf" target="_blank" class="footer-link">
          {{ t('FOOTER_PRIVACY') }}
        </a>

        <a href="/legal/ToS.pdf" target="_blank" class="footer-link">
          {{ t('FOOTER_TOS') }}
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>