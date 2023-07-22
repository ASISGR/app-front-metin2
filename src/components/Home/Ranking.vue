<template>
  <a-table :columns="columns" :data-source="data" bordered :pagination="false">
  </a-table>
</template>
<script lang="ts" setup>
interface RankingValuesInterface {
  key?: String;
  name?: String;
  level?: String;
  highest_collect_quest_lv?: String;
  guild_name?: String;
  empire?: String;
  guild_leader?: String;
  ladder_point?: String;
}

interface RankingColumnsInterface {
  title: String;
  dataIndex: String;
  key: String;
}

const props = defineProps({
  componentName: String,
  columns: Array<RankingColumnsInterface>,

  data: Array<RankingValuesInterface>,
});
</script>
