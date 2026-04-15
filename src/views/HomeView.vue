<template>
  <Card title="ΚΑΛΩΣ ΗΡΘΑΤΕ ΣΤΟΝ REVENTON METIN2!">
  <template #content>
    Παίκτες του Metin2,

    Ο Reventon επιστρέφει.

    Χωρίς υπερβολές. Χωρίς περιττά συστήματα. Χωρίς να αλλοιώνει αυτό που πραγματικά αγαπήσαμε.

    Ένας καθαρός newschool server, σχεδιασμένος για όσους θυμούνται πώς ήταν το Metin2 στις καλύτερές του στιγμές.
    Τα πρώτα farms, τα πρώτα duels, τις μάχες στα metin και τις ατελείωτες ώρες grind με την παρέα.

    Ο στόχος μας είναι ένας:
    να ξαναζήσουμε αυτή την εμπειρία με τον σωστό τρόπο.

   <br>
   <br>
    <ul>
      <li> • Κλασικό gameplay χωρίς περιττές προσθήκες.</li>
      <li> • PvP που βασίζεται στο skill και όχι στα υπερβολικά bonuses.</li>
      <li> • Απλό, καθαρό και ισορροπημένο progression.</li>
      <li> • Guild wars, rivalries και αληθινός ανταγωνισμός.</li>
      <li> • Ελληνική κοινότητα με την ατμόσφαιρα των παλιών εποχών.</li>
    </ul>
    <br>

    Εδώ δεν θα βρεις εύκολες λύσεις.
    Θα βρεις τον ίδιο δρόμο που κάποτε περάσαμε όλοι.

    Κάθε level μετράει.
    Κάθε αντικείμενο έχει αξία.
    Κάθε μάχη έχει σημασία.

    Αν ήσουν εκεί, ξέρεις ήδη τι σημαίνει αυτό.

    Αν δεν ήσουν, τώρα είναι η στιγμή να το ζήσεις.
   <br>
   <br>

    Ο κόσμος του Reventon άνοιξε ξανά.

    Εσύ θα λείπεις;
  </template>
</Card>

  <Card title="ΓΕΝΙΚΉ ΚΑΤΆΤΑΞΗ ΒΑΘΜΟΛΩΓΙΏΝ ΑΝΩΤΈΡΩΝ">
    <template #content>
      <a-tabs v-model:activeKey="activeKey" centered>
        <a-tab-pane key="1" tab="ΧΑΡΑΚΤΉΡΕΣ">
          <Ranking :columns="charTableColumns" :data="characters"></Ranking>
        </a-tab-pane>

        <a-tab-pane key="2" tab="ΣΥΝΤΕΧΝΊΕΣ">
          <Ranking :columns="guildTableColumns" :data="guilds"></Ranking>
        </a-tab-pane>
      </a-tabs>
    </template>
  </Card>
</template>

<script lang="ts" setup>
import Ranking from '@/components/Home/Ranking.vue';
import API from '@/services/api/API.communicate';
import { onMounted, ref } from 'vue';
import Card from '@/components/General/Card.vue';


const activeKey = ref('1');

const charTableColumns = ref([
  { title: 'Θέση', key: 'index', dataIndex: 'index' },
  { title: 'Όνομα', key: 'player_name', dataIndex: 'player_name' },
  { title: 'Επίπεδο', key: 'player_level', dataIndex: 'player_level' },
  {
    title: 'Αποστολές',
    key: 'highest_collect_quest_lv',
    dataIndex: 'highest_collect_quest_lv',
  },
]);

const guildTableColumns = ref([
  { title: 'Θέση', key: 'index', dataIndex: 'index' },
  { title: 'Όνομα', key: 'guild_name', dataIndex: 'guild_name' },
  { title: 'Επίπεδο', key: 'guild_level', dataIndex: 'guild_level' },
  { title: 'Πόντοι', key: 'guild_ladder_point', dataIndex: 'guild_ladder_point' },
]);

interface top10PlayersInterface {
  player_name: string;
  player_playtime: string;
  player_level: number,
  player_exp: string,
  player_horse_level :number,
  playerIndex_empire: number,
  playerGuild_name: null | string,
  highest_collect_quest_lv: null|string,
  index: number

}

interface top10GuildsInterface {
  guild_name: string;
  
  guild_level: number,
  player_exp: string,
  guild_ladder_point :string,
  playerLeader_name: string,
  playerIndex_empire: number,
  index: number

}

const characters = ref<top10PlayersInterface[]>([]);
const guilds = ref<top10GuildsInterface[]>([]);


onMounted(() => {
  API.sendRequest('top10Ranks', 'GET')
    .then((response: any) => {
      characters.value = response.top10Players;
      guilds.value = response.top10Guilds;
    })
    .catch((err) => {
      console.log(`Error API ${err}`);
    });
});
</script>
