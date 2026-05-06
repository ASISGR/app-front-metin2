<template>
  <div class="min-h-screen bg-slate-950 text-white flex flex-col">
    <header class="sticky top-0 z-50 border-b border-white/10 bg-slate-950/90 backdrop-blur">
      <div class="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <div class="min-h-16 flex items-center">
          <Navbar />
        </div>
      </div>
    </header>

    <main class="flex-1">
      <div class="mx-auto w-full max-w-[1600px] px-4 py-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 gap-4 lg:grid-cols-[340px_minmax(0,1fr)]">
          <aside class="order-2 lg:order-1 rounded-2xl border border-white/10 bg-slate-900/80 p-4 shadow-xl">
            <LoginSidebar />
            <div class="mt-4">
              <Statistics />
            </div>
          </aside>

          <section class="order-1 lg:order-2 space-y-4">
            <div class="rounded-2xl border border-white/10 bg-slate-900/80 p-3 shadow-xl">
              <Carousel />
            </div>

            <div class="rounded-2xl border border-white/10 bg-slate-900/80 p-4 shadow-xl">
              <RouterView />
            </div>
          </section>
        </div>
      </div>
    </main>

    <footer class="border-t border-white/10 bg-slate-950">
      <div class="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">
        <Footer />
      </div>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { RouterView } from 'vue-router';
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { message, notification } from 'ant-design-vue';

import Navbar from '@/components/General/Navbar.vue';
import LoginSidebar from '@/components/General/LoginSidebar.vue';
import Footer from '@/components/General/Footer.vue';
import Carousel from '@/components/General/Carousel.vue';
import Statistics from './components/Home/Statistics.vue';

import { useGeneralStore } from '@/stores/useGeneralStore';
import { useUserStore } from '@/stores/useUserStore';

const { t, locale } = useI18n();
const generalStore = useGeneralStore();
const userStore = useUserStore();

const openNotification = () => {
  notification.info({
    duration: 30,
    message: t('LAUNCH_NOTIFICATION_TITLE'),
    description: t('LAUNCH_NOTIFICATION_DESCRIPTION'),
    onClick: () => {
      console.log('Notification Clicked!');
    },
  });
};

onMounted(() => {
  locale.value = generalStore.getLang ? generalStore.getLang : 'gr';

  openNotification();

  const urlParams = new URLSearchParams(window.location.search);
  const hash = urlParams.get('hash');

  if (hash && !userStore.isLogged) {
    message.info(t('VERIFY_LOGIN_REQUIRED'), 30);
  }
});
</script>