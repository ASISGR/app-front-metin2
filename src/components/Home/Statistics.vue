<template>
  <Card title="ΣΤΑΤΙΣΤΙΚΆ ΠΑΙΧΝΙΔΙΟΎ">
    <template #content>
      <a-row>
        <a-col :span="24">
          <a-statistic title="Συνδεδεμένοι Παίκτες" :value="playersOnline" />
        </a-col>
        <a-col :span="24">
          <a-statistic
            title="Συνδεδεμένοι Παίκτες - (24)"
            :value="playersOnline24Hours"
          />
        </a-col>
        <a-col :span="24">
          <a-statistic
            title="Λογαριασμοί Jinno"
            :value="accountsPerKingdom.JINNO"
          />
        </a-col>
        <a-col :span="24">
          <a-statistic
            title="Λογαριασμοί Chunjo"
            :value="accountsPerKingdom.CHUNJO"
          />
        </a-col>
        <a-col :span="24">
          <a-statistic
            title="Λογαριασμοί Shinsoo"
            :value="accountsPerKingdom.SHINSOO"
          />
        </a-col>
        <a-col :span="24">
          <a-statistic title="Συνολικοί Λογαριασμοί" :value="accounts.count" />
        </a-col>
        <a-col :span="24">
          <a-statistic
            title="Συνολικοί Χαρακτήρες"
            :value="playersCount.Players"
          />
        </a-col>
        <a-col :span="24">
          <a-statistic
            title="Συνολικές Συντεχνίες"
            :value="countOfGuilds.Guilds"
          />
        </a-col>

        <a-col :span="24">
          <a-statistic
            title="Συνολικοί Χαρακτήρες"
            :value="playersCount.Players"
          />
        </a-col>

        <a-col :span="24">
          <a-statistic
            title="Συνολικά αντικείμενα"
            :value="countOfItems.Items"
          />
        </a-col>
        <a-col :span="24">
          <a-statistic title="Συνολικά Gold" :value="sumOfGold.Gold" />
        </a-col>
      </a-row>
    </template>
  </Card>
</template>

<script lang="ts" setup>
import API from '@/services/api/API.communicate';
import { onMounted, ref } from 'vue';
import Card from '../General/Card.vue';
import type { Kingdoms } from '@/interfaces/interfaces';

const accounts = ref<any>('0');
const accountsPerKingdom = ref<Kingdoms>({});
const playersOnline = ref('0' as String);
const playersOnline24Hours = ref('0' as String);
const playersCount = ref<any>('0');
const sumOfGold = ref<any>('0');
const countOfItems = ref<any>('0');
const countOfGuilds = ref<any>('0');

onMounted(async () => {
  // Request every Second to update realtime the Statistics.
  setInterval(() => {
    API.sendRequest('players-online', 'GET')
      .then((response: any) => {
        playersOnline.value = response.playersOnline[0].count;
      })
      .catch((err) => {
        console.log(`Error API ${err}`);
      });

    API.sendRequest('players-online-24-hours', 'GET')
      .then((response: any) => {
        playersOnline24Hours.value = response.playersOnline[0].count;
      })
      .catch((err) => {
        console.log(err);
      });

    API.sendRequest('accounts', 'GET')
      .then((response: any) => {
        accounts.value = response.accountsCount[0];
      })
      .catch((err) => {
        console.log(err);
      });
    API.sendRequest('accounts-kingdoms', 'GET')
      .then((response: any) => {
        accountsPerKingdom.value = response.accountsPerKingdom[0];
      })
      .catch((err) => {
        console.log(err);
      });

    API.sendRequest('getSumGold', 'GET')
      .then((response: any) => {
        sumOfGold.value = response.Gold[0];
      })
      .catch((err) => {
        console.log(err);
      });

    API.sendRequest('getItemsCount', 'GET')
      .then((response: any) => {
        countOfItems.value = response.itemsCounts[0];
      })
      .catch((err) => {
        console.log(err);
      });

    API.sendRequest('getGuildsCount', 'GET')
      .then((response: any) => {
        countOfGuilds.value = response.guildsCount[0];
      })
      .catch((err) => {
        console.log(err);
      });

    API.sendRequest('getPlayersCount', 'GET')
      .then((response: any) => {
        playersCount.value = response.countPlayers[0];
      })
      .catch((err) => {
        console.log(err);
      });
  }, 1000);
});
</script>

<style scoped></style>
