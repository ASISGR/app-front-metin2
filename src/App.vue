<template>
  <a-layout style="min-width: 1080px">
    <a-layout-header :style="headerStyle">
      <Navbar></Navbar>
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="340" :style="siderStyle"
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

onMounted(() => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const hash = urlParams.get('hash');
  console.log(hash);

  if (hash) {
    APIController.sendRequest('active', 'POST', { hash: hash })
      .then((res: any) => {
        message.success(res.message);
      })
      .catch((err: any) => {
        message.error(err.data.message);
      });
  }
});
</script>
