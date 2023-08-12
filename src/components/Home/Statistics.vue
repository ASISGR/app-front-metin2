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
  API.sendRequest('statistics', 'GET')
    .then((response: any) => {
      playersOnline.value = response.playersOnline[0].count;
      playersOnline24Hours.value = response.players24Online[0].count;
      accounts.value = response.accountsCount[0];
      accountsPerKingdom.value = response.accountsPerKingdom[0];
      sumOfGold.value = response.Gold[0];
      countOfItems.value = response.itemsCounts[0];
      countOfGuilds.value = response.guildsCount[0];
      playersCount.value = response.countPlayers[0];
    })
    .catch((err) => {
      console.log(`Error API ${err}`);
    });
  // Request every Second to update realtime the Statistics.
  setInterval(() => {
    API.sendRequest('statistics', 'GET')
      .then((response: any) => {
        playersOnline.value = response.playersOnline[0].count;
        playersOnline24Hours.value = response.players24Online[0].count;
        accounts.value = response.accountsCount[0];
        accountsPerKingdom.value = response.accountsPerKingdom[0];
        sumOfGold.value = response.Gold[0];
        countOfItems.value = response.itemsCounts[0];
        countOfGuilds.value = response.guildsCount[0];
        playersCount.value = response.countPlayers[0];
      })
      .catch((err) => {
        console.log(`Error API ${err}`);
      });
  }, 5000);
});
</script>

<style scoped></style>
