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
          ><router-link to="/">Επικοινωνία</router-link></a-menu-item
        >
        <a-menu-item key="12"
          ><router-link to="/">Πολιτική Απορρήτου</router-link></a-menu-item
        >
        <a-menu-item key="13"
          ><router-link to="/">Όροι χρήσης</router-link></a-menu-item
        >
      </a-menu></a-col
    >
  </a-row>
</template>

<script lang="ts" setup></script>
