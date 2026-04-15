<template>
  <footer class="w-full">
    <div
      class="mx-auto flex w-full max-w-[1600px] flex-col gap-4 border-t border-white/10 px-4 py-6 text-white lg:flex-row lg:items-center lg:justify-between"
    >
      <!-- Left -->
      <div class="text-sm font-semibold tracking-wide text-white">
        Reventon Metin2 ©2026 All Rights reserved
      </div>

      <!-- Right -->
      <div class="flex flex-wrap items-center gap-3 text-sm">
        <RouterLink to="/" class="footer-link">Συνεργασία</RouterLink>
        <RouterLink to="/" class="footer-link">Server</RouterLink>
        <RouterLink to="/" class="footer-link">Κανονισμοί</RouterLink>

        <a
          href="/legal/Refund-policy.pdf"
          target="_blank"
          class="footer-link"
        >
          Πολιτική επιστροφής
        </a>

        <a
          href="/legal/Privacy-policy.pdf"
          target="_blank"
          class="footer-link"
        >
          Πολιτική Απορρήτου
        </a>

        <a
          href="/legal/ToS.pdf"
          target="_blank"
          class="footer-link"
        >
          Όροι χρήσης
        </a>
      </div>
    </div>
  </footer>
</template>