<template>
  <Card title="ΣΤΑΤΙΣΤΙΚΆ ΠΑΙΧΝΙΔΙΟΎ">
    <template #content>
      <a-row>
        <a-col :span="24">
          <a-statistic title="Συνδεδεμένοι Παίκτες" :value="statistics.playerOnline" />
        </a-col>
        <a-col :span="24">
          <a-statistic
            title="Συνδεδεμένοι Παίκτες - (24)"
            :value="statistics.playersOnline24Hours" />
        </a-col>
        <a-col :span="24">
          <a-statistic
            title="Λογαριασμοί Jinno"
            :value="statistics.accountsPerKingdom.JINNO" />
        </a-col>
        <a-col :span="24">
          <a-statistic
            title="Λογαριασμοί Chunjo"
            :value="statistics.accountsPerKingdom.CHUNJO" />
        </a-col>
        <a-col :span="24">
          <a-statistic
            title="Λογαριασμοί Shinsoo"
            :value="statistics.accountsPerKingdom.SHINSOO" />
        </a-col>
        <a-col :span="24">
          <a-statistic title="Συνολικοί Λογαριασμοί" :value="statistics.totalAccounts" />
        </a-col>
        <a-col :span="24">
          <a-statistic
            title="Συνολικοί Χαρακτήρες"
            :value="statistics.totalPlayers" />
        </a-col>
        <a-col :span="24">
          <a-statistic
            title="Συνολικές Συντεχνίες"
            :value="statistics.totalGuilds" />
        </a-col>


        <a-col :span="24">
          <a-statistic
            title="Συνολικά αντικείμενα"
            :value="statistics.totalItems" />
        </a-col>
        <a-col :span="24">
          <a-statistic title="Συνολικά Gold" :value="statistics.sumOfGold" />
        </a-col>
      </a-row>
    </template>
  </Card>
</template>

<script lang="ts" setup>
  import API from "@/services/api/API.communicate";
  import { onMounted,  reactive } from "vue";
  import Card from "../General/Card.vue";

  interface accountsPerKingdomInterface {
    SHINSOO: string;
    CHUNJO: string;
    JINNO: string
  }

  type Statistics = {
  playerOnline: string;
  playersOnline24Hours: string;
  totalAccounts: string;
  accountsPerKingdom: accountsPerKingdomInterface;
  totalPlayers: string;
  sumOfGold: string;
  totalItems: string;
  totalGuilds: string;
};


  const statistics: Statistics = reactive({
    playerOnline: '',
    playersOnline24Hours: '',
    totalAccounts: '',
    accountsPerKingdom: {CHUNJO: '', JINNO : '', SHINSOO: ''}, 
    totalPlayers: '',
    sumOfGold: '',
    totalItems: '',
    totalGuilds: ''
  });
  

  onMounted(async () => {
    API.sendRequest("statistics", "GET")
      .then((response: any) => {
        statistics.playerOnline = response.sumOfPlayersOnline;
        statistics.playersOnline24Hours = response.sumOfPlayersOnline;
        statistics.totalAccounts = response.sumAccountsLength;
        statistics.accountsPerKingdom = response.sumAccountsPerKingdom;
        statistics.sumOfGold = response.sumOfGold;
        statistics.totalItems = response.sumOfCommunityItems;
        statistics.totalGuilds = response.sumOfGuilds;
        statistics.totalPlayers = response.sumOfPlayers;
      })
      .catch((err) => {
        console.log(`Error API ${err}`);
      });
    // Request every Second to update realtime the Statistics.
    setInterval(() => {
      API.sendRequest("statistics", "GET")
        .then((response: any) => {
        statistics.playerOnline = response.sumOfPlayersOnline;
        statistics.playersOnline24Hours = response.sumOfPlayersOnline;
        statistics.totalAccounts = response.sumAccountsLength;
        statistics.accountsPerKingdom = response.sumAccountsPerKingdom;
        statistics.sumOfGold = response.sumOfGold;
        statistics.totalItems = response.sumOfCommunityItems;
        statistics.totalGuilds = response.sumOfGuilds;
        statistics.totalPlayers = response.sumOfPlayers;
        })
        .catch((err) => {
          console.log(`Error API ${err}`);
        });
    }, 5000);
  });
</script>

<style scoped></style>
