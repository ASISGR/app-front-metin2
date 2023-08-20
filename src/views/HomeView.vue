<template>
  <Card title="ΚΑΛΩΣΉΡΘΑΤΕ ΣΤΟΝ REVENTON METIN2!">
    <template #content>
      Αγαπητοί χρήστες, Σας ενημερώνουμε με χαρά ότι ο Server μας με την
      ονομασία "Reventon Metin2 GR" έχει επανεκκινήσει μετά από μια περίοδο
      απουσίας, λόγω της νοσταλγίας για τον προηγούμενο server που είχαμε
      λειτουργήσει. Είμαστε μια νέα ομάδα που επιστρέφει κοντά σας τον
      πολυαγαπημένο Reventon Metin2. Με υπερηφάνεια παρουσιάζουμε τα νέα
      χαρακτηριστικά και βελτιώσεις που έχουμε προσθέσει σε αυτόν τον νέο κύκλο.
      Ο Server μας λειτουργεί πλέον χωρίς ωράριο, προσφέροντάς σας τη δυνατότητα
      να εγγραφείτε και να παίξετε οποιαδήποτε στιγμή προτιμάτε. Οι ταχύτητες
      προόδου των χαρακτήρων (rates) στον Server έχουν οριστεί στο 1000%,
      προσφέροντας μια πιο γρήγορη πρόοδο στην απόκτηση εμπειρίας (EXP),
      χρήματος του παιχνιδιού (yang) και αντικειμένων. Επίσης, ανακαλύψτε μια
      πληθώρα νέων αντικειμένων, αποστολών και απολαύστε την εξερεύνηση των νέων
      χαρτών που προσθέσαμε για εσάς. Το μέγιστο επίπεδο χαρακτήρα έχει οριστεί
      στο 250, προσφέροντας σας μια μοναδική εμπειρία παιχνιδιού. Σας
      προσφέρουμε επίσης πλήρη μετάφραση στα ελληνικά για όλους τους τομείς του
      παιχνιδιού, ώστε να απολαμβάνετε την εμπειρία χωρίς γλωσσικά εμπόδια. Στον
      server μας, θα συναντήσετε ποικίλα συστήματα που προσθέσαμε για να
      εμπλουτίσουμε την εμπειρία σας. Ανάμεσά τους, θα βρείτε το σύστημα των
      "extra πόντων" στις Συντεχνίες, το οποίο ενισχύει τη συνεργασία και την
      ομαδικότητα μεταξύ των παικτών. Επιπλέον, υπάρχει φραγή μεμονωμένων
      χρηστών στα προσωπικά μηνύματα (pm) για την προστασία της ιδιωτικότητας
      και της ασφάλειάς σας. Το τραπεζικό και μετοχικό σύστημα σας επιτρέπει να
      διαχειρίζεστε τα χρήματά σας και την περιουσία σας με άνεση και ασφάλεια.
      Ο πίνακας online αρχηγών συντεχνιών προσφέρει μια ενδιαφέρουσα
      ανταγωνιστική διάσταση, ενώ οι αποστολές του Βιολόγου παρέχουν πρόκληση
      και επιβράβευση για την εξερεύνηση και τη συμμετοχή σας στον κόσμο του
      παιχνιδιού. Σας προσφέρουμε επίσης νέες αποστολές για όλα τα επίπεδα και
      χάρτες PvP, όπου οι νίκες και οι ήττες σας επηρεάζουν τη βαθμολογία σας
      και σας δίνουν την ευκαιρία να αναδειχθείτε και να ανταγωνιστείτε με
      άλλους παίκτες. Αξιοποιήστε την Φόρμα Επικοινωνίας μας για οποιαδήποτε
      ερώτησή σας, καθώς είμαστε πάντα διαθέσιμοι να σας υποστηρίξουμε και να
      σας βοηθήσουμε. Σας ευχόμαστε μια ευχάριστη και απολαυστική διαμονή στον
      Server μας και ελπίζουμε να απολαύσετε τον κόσμο του Reventon Metin2 GR με
      όλα τα νέα χαρακτηριστικά και περιεχόμενα που προσφέρουμε. Με εκτίμηση, Η
      Ομάδα Διαχείρισης του Reventon Metin2 GR.
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
