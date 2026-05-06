<template>
  <Card :title="t('GUILD_RANKING_TITLE')">
    <template #content>
      <a-pagination
        v-model:current="page"
        :total="paginationData?.totalGuilds"
        :pageSize="50"
        show-less-items
        simple
      />

      <br />

      <a-table
        :columns="guildTableColumns"
        :data-source="guilds"
        bordered
        :pagination="false"
        :scroll="{ x: true }"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'index'">
            <a>
              {{ (paginationData?.currentPage - 1) * 50 + record.index }}
            </a>
          </template>

          <template v-if="column.key === 'playerIndex_empire'">
            <a>
              <img
                :src="getEmpireFlag(record.playerIndex_empire)"
                :title="t('KINGDOM')"
                :alt="t('KINGDOM')"
              />
            </a>
          </template>
        </template>
      </a-table>

      <br />

      <a-pagination
        v-model:current="page"
        :total="paginationData?.totalGuilds"
        :pageSize="50"
        show-less-items
        simple
      />
    </template>
  </Card>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

import Card from '@/components/General/Card.vue';
import API from '@/services/api/API.communicate';

import redFlag from '@/assets/images/empires/1.jpg';
import yellowFlag from '@/assets/images/empires/2.jpg';
import blueFlag from '@/assets/images/empires/3.jpg';

const { t } = useI18n();
const router = useRouter();

const guilds = ref([]);
const paginationData = ref<any>(null);
const page = ref<number>(Number(router.currentRoute.value.params.index) || 1);

const guildTableColumns = computed(() => [
  { title: t('RANK_POSITION'), key: 'index', dataIndex: 'index' },
  { title: t('GUILD'), key: 'guild_name', dataIndex: 'guild_name' },
  { title: t('LEADER'), key: 'playerLeader_name', dataIndex: 'playerLeader_name' },
  { title: t('LEVEL'), key: 'guild_level', dataIndex: 'guild_level' },
  { title: t('WINS'), key: 'guild_win', dataIndex: 'guild_win' },
  { title: t('DRAWS'), key: 'guild_draw', dataIndex: 'guild_draw' },
  { title: t('LOSSES'), key: 'guild_loss', dataIndex: 'guild_loss' },
  { title: t('POINTS'), key: 'guild_ladder_point', dataIndex: 'guild_ladder_point' },
  { title: t('KINGDOM'), key: 'playerIndex_empire', dataIndex: 'playerIndex_empire' },
]);

const getEmpireFlag = (empire: number) => {
  if (empire === 1) return redFlag;
  if (empire === 2) return yellowFlag;
  if (empire === 3) return blueFlag;

  return '';
};

const fillPaginationData = (response: any) => {
  paginationData.value = {
    totalGuilds: response.totalGuilds,
    hasNextPage: response.hasNextPage,
    hasPreviousPage: response.hasPreviousPage,
    currentPage: Number(response.currentPage),
    nextPage: response.nextPage,
    previousPage: response.previousPage,
    lastPage: response.lastPage,
  };
};

const fetchGuilds = async (selectedPage: number) => {
  try {
    const response: any = await API.sendRequest(
      `topListGuilds/${selectedPage}`,
      'GET'
    );

    guilds.value = response.guilds;
    fillPaginationData(response);
  } catch (err: any) {
    console.log(err);
  }
};

onMounted(() => {
  fetchGuilds(page.value);
});

watch(page, (newPage) => {
  if (!newPage) return;

  page.value = Number(newPage);

  router.push(`/guilds/${page.value}`);
  fetchGuilds(page.value);
});
</script>

<style></style>