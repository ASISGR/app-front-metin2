<template>
  <Card title="ΚΑΛΩΣΉΡΘΑΤΕ ΣΤΟΝ ASCEO METIN2!">
    <template #content>
      Αγαπητοί χρήστες,
σας καλωσορίζουμε στον Asceo2 Metin2, έναν μοναδικό, ολοκαίνουργιο server με έντονο Newschool χαρακτήρα, σχεδιασμένο για να συναρπάσει κάθε παίκτη που αναζητά μια σύγχρονη εμπειρία gaming.

Ο Asceo2 Metin2 είναι το αποτέλεσμα της νοσταλγίας μας για την κλασική εμπειρία Metin2, συνδυασμένης με φρέσκες ιδέες και αναβαθμισμένες λειτουργίες. Με υπερηφάνεια σας παρουσιάζουμε έναν server γεμάτο καινοτομίες, βελτιώσεις και μοναδικές δυνατότητες, που υπόσχεται να κρατήσει ζωντανό το ενδιαφέρον σας για αμέτρητες ώρες παιχνιδιού.

Τι κάνει τον Asceo2 μοναδικό;

Αδιάλειπτη λειτουργία 24/7: Παίξτε όποτε θέλετε, χωρίς περιορισμούς.
Ταχύτατη πρόοδος: Με rates στο 1000%, αποκτάτε εμπειρία (EXP), αντικείμενα και Yang πιο γρήγορα από ποτέ.
Πλούσιο περιεχόμενο: Νέα αντικείμενα, αποστολές, PvP χάρτες και το μέγιστο επίπεδο χαρακτήρα στο 250 για ακόμα μεγαλύτερες προκλήσεις.
Εξελιγμένα συστήματα: Από τις συντεχνίες με extra πόντους έως τη φραγή μηνυμάτων (PM), ο server μας προσφέρει ασφαλείς και εμπλουτισμένες εμπειρίες συνεργασίας.
Πλήρης ελληνική μετάφραση: Απολαύστε τον κόσμο του παιχνιδιού χωρίς γλωσσικά εμπόδια.
Ευκαιρίες ανταγωνισμού: Συναρπαστικά rankings, αποστολές Βιολόγου, και PvP μονομαχίες που επηρεάζουν τη βαθμολογία σας.
Ο κόσμος του Asceo2 Metin2 είναι σχεδιασμένος για να σας καθηλώσει, είτε είστε νέοι παίκτες, είτε βετεράνοι που αναζητούν νέες συγκινήσεις. Η ανανεωμένη μας ομάδα εργάζεται ασταμάτητα για να εξασφαλίσει μια καθηλωτική εμπειρία, προσφέροντάς σας το καλύτερο περιβάλλον για εξερεύνηση, συνεργασία και ανταγωνισμό.

Είμαστε εδώ για εσάς! Για οποιαδήποτε ερώτηση ή υποστήριξη, χρησιμοποιήστε τη Φόρμα Επικοινωνίας. Σας προσκαλούμε να μπείτε στον κόσμο του Asceo2 Metin2 και να ζήσετε την απόλυτη gaming εμπειρία!

Με εκτίμηση,
Η Ομάδα Διαχείρισης του Asceo2 Metin2 GR.
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
