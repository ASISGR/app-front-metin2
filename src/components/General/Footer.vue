<template>
  <a-row :style="{ lineHeight: '64px' }">
    <a-col :span="12"> Reventon Metin2 &copy;2023 All Rights reserved</a-col>

    <a-col :span="12">
      <a-menu theme="dark" mode="horizontal">
        <a-menu-item key="8"
          ><router-link to="/">Συνεργασία</router-link></a-menu-item
        >
        <a-menu-item key="9"
          ><router-link to="/">Server</router-link></a-menu-item
        >
        <a-menu-item key="10"
          ><router-link to="/">Κανονισμοί</router-link></a-menu-item
        >
        <a-menu-item key="11"
          ><a target="_blank" href="/legal/Refund-policy.pdf">Πολιτική επιστροφής</a></a-menu-item
        >
        <a-menu-item key="12"
          ><a target="_blank" href="/legal/Privacy-policy.pdf">Πολιτική Απορρήτου</a></a-menu-item
        >
        <a-menu-item key="13"
          ><a target="_blank" href="/legal/ToS.pdf">Όροι χρήσης</a></a-menu-item
        >
      </a-menu></a-col
    >
  </a-row>
</template>

<script lang="ts" setup></script>
