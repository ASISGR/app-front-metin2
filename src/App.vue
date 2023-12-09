<template>
  <a-layout>
    <a-layout-header :style="headerStyle">
      <Navbar></Navbar>
    </a-layout-header>
    <a-layout has-sider>
      <a-layout-sider
        width="340"
        :style="siderStyle"
        breakpoint="lg"
        collapsed-width="0"
        @collapse="onCollapse"
        @breakpoint="onBreakpoint"
        ><LoginSidebar></LoginSidebar>
        <Statistics></Statistics>
      </a-layout-sider>
      <a-layout-content :style="contentStyle">
        <Carousel></Carousel> <RouterView
      /></a-layout-content>
    </a-layout>
    <a-layout-footer :style="footerStyle"><Footer></Footer></a-layout-footer>

  </a-layout>
</template>

<script lang="ts" setup>
import { RouterView } from 'vue-router';
import LoginSidebar from '@/components/General/LoginSidebar.vue';
import Footer from '@/components/General/Footer.vue';
import Navbar from '@/components/General/Navbar.vue';
import Carousel from '@/components/General/Carousel.vue';
import type { CSSProperties } from 'vue';
import Statistics from './components/Home/Statistics.vue';
import { onMounted } from 'vue';
import APIController from '@/services/api/API.communicate';
import { message } from 'ant-design-vue';
import { useGeneralStore } from '@/stores/useGeneralStore';
import { useI18n } from 'vue-i18n';
const { t, locale } = useI18n()
// Notification Start
import { notification } from 'ant-design-vue';
import { useUserStore } from '@/stores/useUserStore';

const openNotification = () => {
  notification.open({
    duration: 30,
    message: 'Το παιχνίδι έχει ανοίξει!',
    description:
      `Εξερευνήστε τον Reventon, δημιουργήστε την ιστορία σας! Καλώς ήλθατε στον κόσμο μας, όπου η περιπέτεια γίνεται πραγματικότητα.`,
    onClick: () => {
      console.log('Notification Clicked!');
    },
  });
};
// Notification end
const generalStore = useGeneralStore();
const userStore = useUserStore();



const headerStyle: CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  paddingInline: 50,
  lineHeight: '64px',
  backgroundColor: 'rgb(0, 21, 41)',
};

const contentStyle: CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  padding: '20px',
  color: '#fff',
  backgroundColor: 'rgb(0, 21, 51)',
};

const siderStyle: CSSProperties = {
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: 'rgb(0, 21, 61)',
  padding: '15px',
  paddingTop: '0px',
};

const footerStyle: CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: 'rgb(0, 21, 41)',
};

const onCollapse = (collapsed: boolean, type: string) => {
  console.log(collapsed, type);
};

const onBreakpoint = (broken: boolean) => {
  console.log(broken);
};

onMounted(() => {
  // Set lang by lang from localStorage. If does not exists it's gr.
  locale.value = generalStore.getLang ? generalStore.getLang : 'gr'
  openNotification()


  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const hash = urlParams.get('hash');


  if (hash && !userStore.isLogged) {
    message.info('Παρακαλώ συνδεθείτε στον λογαριασμό σας ώστε να ολοκληρωθεί η διαδικασία επαλήθευσης.', 30)
  }

});
</script>
