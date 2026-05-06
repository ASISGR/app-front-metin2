<template>
  <Card :title="t('WELCOME_TITLE')">
    <template #content>
      <div class="welcome-content">
      <p>{{ t('WELCOME_LINE_1') }}</p>
       {{ t('WELCOME_LINE_2') }}
       {{ t('WELCOME_LINE_3') }}
       {{ t('WELCOME_LINE_4') }}
       {{ t('WELCOME_LINE_5') }}
       {{ t('WELCOME_LINE_6') }}

        <ul>
          <li>{{ t('WELCOME_FEATURE_1') }}</li>
          <li>{{ t('WELCOME_FEATURE_2') }}</li>
          <li>{{ t('WELCOME_FEATURE_3') }}</li>
          <li>{{ t('WELCOME_FEATURE_4') }}</li>
          <li>{{ t('WELCOME_FEATURE_5') }}</li>
        </ul>

      <p> {{ t('WELCOME_LINE_7') }}
       {{ t('WELCOME_LINE_8') }}
       {{ t('WELCOME_LINE_9') }}
       {{ t('WELCOME_LINE_10') }}
       {{ t('WELCOME_LINE_11') }}
       {{ t('WELCOME_LINE_12') }}
       {{ t('WELCOME_LINE_13') }}
       {{ t('WELCOME_LINE_14') }}
       {{ t('WELCOME_LINE_15') }}</p>
      </div>
    </template>
  </Card>

  <Card :title="t('TOP_RANKING_GENERAL_TITLE')">
    <template #content>
      <a-tabs v-model:activeKey="activeKey" centered>
        <a-tab-pane key="1" :tab="t('CHARACTER_LIST')">
          <Ranking :columns="charTableColumns" :data="characters" />
        </a-tab-pane>

        <a-tab-pane key="2" :tab="t('GUILD_LIST')">
          <Ranking :columns="guildTableColumns" :data="guilds" />
        </a-tab-pane>
      </a-tabs>
    </template>
  </Card>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import Ranking from '@/components/Home/Ranking.vue';
import API from '@/services/api/API.communicate';
import Card from '@/components/General/Card.vue';

const { t } = useI18n();

const activeKey = ref('1');

const charTableColumns = computed(() => [
  { title: t('RANK_POSITION'), key: 'index', dataIndex: 'index' },
  { title: t('NAME'), key: 'player_name', dataIndex: 'player_name' },
  { title: t('LEVEL'), key: 'player_level', dataIndex: 'player_level' },
  {
    title: t('QUESTS'),
    key: 'highest_collect_quest_lv',
    dataIndex: 'highest_collect_quest_lv',
  },
]);

const guildTableColumns = computed(() => [
  { title: t('RANK_POSITION'), key: 'index', dataIndex: 'index' },
  { title: t('NAME'), key: 'guild_name', dataIndex: 'guild_name' },
  { title: t('LEVEL'), key: 'guild_level', dataIndex: 'guild_level' },
  { title: t('POINTS'), key: 'guild_ladder_point', dataIndex: 'guild_ladder_point' },
]);

interface Top10PlayersInterface {
  player_name: string;
  player_playtime: string;
  player_level: number;
  player_exp: string;
  player_horse_level: number;
  playerIndex_empire: number;
  playerGuild_name: null | string;
  highest_collect_quest_lv: null | string;
  index: number;
}

interface Top10GuildsInterface {
  guild_name: string;
  guild_level: number;
  player_exp: string;
  guild_ladder_point: string;
  playerLeader_name: string;
  playerIndex_empire: number;
  index: number;
}

const characters = ref<Top10PlayersInterface[]>([]);
const guilds = ref<Top10GuildsInterface[]>([]);

onMounted(() => {
  API.sendRequest('top10Ranks', 'GET')
    .then((response: any) => {
      characters.value = response.top10Players;
      guilds.value = response.top10Guilds;
    })
    .catch((err: any) => {
      console.log(`Error API ${err}`);
    });
});
</script>

<style scoped>
.welcome-content p {
  margin-bottom: 12px;
}

.welcome-content ul {
  margin: 18px 0;
  padding-left: 0;
  list-style: none;
}

.welcome-content li {
  margin-bottom: 8px;
}
</style>