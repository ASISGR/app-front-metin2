<template>
  <a-table
    :columns="columns"
    :data-source="data"
    bordered
    :pagination="false"
    :scroll="{ x: true }"
  >
  </a-table>
</template>

<script lang="ts" setup>


const props = defineProps({
  componentName: String,
  columns: Array,

  data: Array,
});
</script>
