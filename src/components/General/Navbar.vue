<template>
  <div class="logo">
    <img src="@/assets/images/layout/reve_logo.png" alt="server-logo" />
  </div>

  <a-menu
    v-model:selectedKeys="selectedKeys"
    theme="dark"
    mode="horizontal"
    :style="{ lineHeight: '64px' }"
  >
    <a-menu-item key="1"><router-link to="/">Αρχική</router-link></a-menu-item>
    <a-menu-item key="2"><router-link to="/news">Νέα</router-link></a-menu-item>
    <a-menu-item key="3"
      ><router-link to="/register">Εγγραφή</router-link></a-menu-item
    >
    <a-menu-item key="4"
      ><router-link to="/players/1">Χαρακτήρες</router-link></a-menu-item
    >
    <a-menu-item key="5"
      ><router-link to="/guilds/1">Συντεχνίες</router-link></a-menu-item
    >
    <a-menu-item key="6"
      ><router-link to="/download">Λήψη</router-link></a-menu-item
    >
    <a-menu-item key="7"
      ><router-link to="/bonus">Bonus</router-link></a-menu-item
    >
  </a-menu>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';

const selectedKeys = ref<string[]>(['1']);
onMounted(() => {
  const url = window.location.href;
  selectedKeys.value = selectedKey(url);
});

function selectedKey(url: string) {
  if (url.includes('/news')) {
    return ['2'];
  } else if (url.includes('/register')) {
    return ['3'];
  } else if (url.includes('/players')) {
    return ['4'];
  } else if (url.includes('/guilds')) {
    return ['5'];
  } else if (url.includes('/download')) {
    return ['6'];
  } else if (url.includes('/bonus')) {
    return ['7'];
  } else {
    return ['1'];
  }
}
</script>

<style scoped>
.site-layout-content {
  min-height: 280px;
  padding: 24px;
  background: #fff;
}
.logo {
  float: left;
  width: 120px;
  height: 31px;
}
.logo img {
  width: auto;
  height: 60px;
}
#components-layout-demo-top .logo {
  float: right;
  margin: 16px 0 16px 24px;
}

:global(.ant-menu-item-selected) {
  background-color: rgb(0, 21, 95) !important;
}
[data-theme='dark'] .site-layout-content {
  background: #141414;
}
</style>
