<template>
  <Card :title="t('GAME_STATISTICS_TITLE')">
    <template #content>
      <a-row>
        <a-col :span="24">
          <a-statistic :title="t('ONLINE_PLAYERS')" :value="statistics.playerOnline" />
        </a-col>

        <a-col :span="24">
          <a-statistic :title="t('ONLINE_PLAYERS_24H')" :value="statistics.playersOnline24Hours" />
        </a-col>

        <a-col :span="24">
          <a-statistic :title="t('ACCOUNTS_JINNO')" :value="statistics.accountsPerKingdom.JINNO" />
        </a-col>

        <a-col :span="24">
          <a-statistic :title="t('ACCOUNTS_CHUNJO')" :value="statistics.accountsPerKingdom.CHUNJO" />
        </a-col>

        <a-col :span="24">
          <a-statistic :title="t('ACCOUNTS_SHINSOO')" :value="statistics.accountsPerKingdom.SHINSOO" />
        </a-col>

        <a-col :span="24">
          <a-statistic :title="t('TOTAL_ACCOUNTS')" :value="statistics.totalAccounts" />
        </a-col>

        <a-col :span="24">
          <a-statistic :title="t('TOTAL_CHARACTERS')" :value="statistics.totalPlayers" />
        </a-col>

        <a-col :span="24">
          <a-statistic :title="t('TOTAL_GUILDS')" :value="statistics.totalGuilds" />
        </a-col>

        <a-col :span="24">
          <a-statistic :title="t('TOTAL_ITEMS')" :value="statistics.totalItems" />
        </a-col>

        <a-col :span="24">
          <a-statistic :title="t('TOTAL_GOLD')" :value="statistics.sumOfGold" />
        </a-col>
      </a-row>
    </template>
  </Card>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, reactive } from 'vue';
import { useI18n } from 'vue-i18n';

import API from '@/services/api/API.communicate';
import Card from '../General/Card.vue';

interface AccountsPerKingdom {
  SHINSOO: string;
  CHUNJO: string;
  JINNO: string;
}

interface Statistics {
  playerOnline: string;
  playersOnline24Hours: string;
  totalAccounts: string;
  accountsPerKingdom: AccountsPerKingdom;
  totalPlayers: string;
  sumOfGold: string;
  totalItems: string;
  totalGuilds: string;
}

const { t } = useI18n();

let statisticsInterval: ReturnType<typeof setInterval> | null = null;

const statistics = reactive<Statistics>({
  playerOnline: '',
  playersOnline24Hours: '',
  totalAccounts: '',
  accountsPerKingdom: {
    CHUNJO: '',
    JINNO: '',
    SHINSOO: '',
  },
  totalPlayers: '',
  sumOfGold: '',
  totalItems: '',
  totalGuilds: '',
});

const applyStatistics = (response: any) => {
  statistics.playerOnline = response.sumOfPlayersOnline;
  statistics.playersOnline24Hours = response.sumOfPlayersOnline24;
  statistics.totalAccounts = response.sumAccountsLength;
  statistics.accountsPerKingdom = response.sumAccountsPerKingdom;
  statistics.sumOfGold = response.sumOfGold;
  statistics.totalItems = response.sumOfCommunityItems;
  statistics.totalGuilds = response.sumOfGuilds;
  statistics.totalPlayers = response.sumOfPlayers;
};

const fetchStatistics = () => {
  API.sendRequest('statistics', 'GET')
    .then((response: any) => {
      applyStatistics(response);
    })
    .catch((err: any) => {
      console.log(`Error API ${err}`);
    });
};

onMounted(() => {
  fetchStatistics();

  statisticsInterval = setInterval(() => {
    fetchStatistics();
  }, 5000);
});

onUnmounted(() => {
  if (statisticsInterval) {
    clearInterval(statisticsInterval);
  }
});
</script>

<style scoped></style>