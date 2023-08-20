<template>
    <div style="margin-top: 20px">
      <a-card :title="title" :bordered="false" style="width: auto">
        <template #extra
          >
        <slot name="actions"></slot>
        </template>
        <main>
          <slot name="content"></slot>
  
          <div style="margin-top: 25px; float: left">
            <slot name="footer"></slot>
          </div>
        </main>
      </a-card>
    </div>
  </template>
  
  <script lang="ts" setup>  
    const props = defineProps({
      title: { type: String },
    });
  </script>
  