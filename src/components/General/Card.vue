<template>
  <div style="margin-top: 20px">
    <a-card :title="title" :bordered="false" style="width: auto">    
     <main>
        
        <slot name="content"></slot>

      </main>
    </a-card>
  </div>
</template>

<script lang="ts" setup>

  const props = defineProps({
    title: { type: String },
  });
</script>
