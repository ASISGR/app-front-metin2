<template>
  <Card :title="t('CHARACTER_RANKING_TITLE')">
    <template #content>
      <a-pagination
        v-model:current="page"
        :total="paginationData?.totalPlayers"
        :pageSize="50"
        show-less-items
        simple
      />

      <br />

      <a-table
        :columns="characterTableColumns"
        :data-source="players"
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
        :total="paginationData?.totalPlayers"
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

const { t, locale } = useI18n();
const router = useRouter();

const players = ref([]);
const paginationData = ref<any>(null);
const page = ref<number>(Number(router.currentRoute.value.params.index) || 1);

const characterTableColumns = computed(() => [
  { title: t('RANK_POSITION'), key: 'index', dataIndex: 'index' },
  { title: t('NAME'), key: 'player_name', dataIndex: 'player_name' },
  { title: t('LEVEL'), key: 'player_level', dataIndex: 'player_level' },
  {
    title: t('QUESTS'),
    key: 'highest_collect_quest_lv',
    dataIndex: 'highest_collect_quest_lv',
  },
  { title: t('GUILD'), key: 'playerGuild_name', dataIndex: 'playerGuild_name' },
  { title: t('PLAYTIME'), key: 'player_playtime', dataIndex: 'player_playtime' },
  { title: 'EXP', key: 'player_exp', dataIndex: 'player_exp' },
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
    totalPlayers: response.totalPlayers,
    hasNextPage: response.hasNextPage,
    hasPreviousPage: response.hasPreviousPage,
    currentPage: Number(response.currentPage),
    nextPage: response.nextPage,
    previousPage: response.previousPage,
    lastPage: response.lastPage,
  };
};

const fetchPlayers = async (selectedPage: number) => {
  try {
    const response: any = await API.sendRequest(
      `topListPlayers/${selectedPage}`,
      'GET'
    );

    players.value = response.players;
    fillPaginationData(response);
  } catch (err: any) {
    console.log(err);
  }
};

onMounted(() => {
  fetchPlayers(page.value);
});

watch(page, (newPage) => {
  if (!newPage) return;

  page.value = Number(newPage);

  router.push(`/players/${page.value}`);
  fetchPlayers(page.value);
});
</script>

<style></style>