<template>
  <a-row>
    <a-col :span="12" style="padding: 10px">
      <Card title="ΚΑΛΩΣΉΡΘΑΤΕ ΣΤΟΝ REVENTON METIN2!">
        <template #content>
          Αγαπητοί χρήστες, Σας ενημερώνουμε με χαρά ότι ο Server μας με την
          ονομασία "Reventon Metin2 GR" έχει επανεκκινήσει μετά από μια περίοδο
          απουσίας, λόγω της νοσταλγίας για τον προηγούμενο server που είχαμε
          λειτουργήσει. Είμαστε μια νέα ομάδα που επιστρέφει κοντά σας τον
          πολυαγαπημένο Reventon Metin2. Με υπερηφάνεια παρουσιάζουμε τα νέα
          χαρακτηριστικά και βελτιώσεις που έχουμε προσθέσει σε αυτόν τον νέο
          κύκλο. Ο Server μας λειτουργεί πλέον χωρίς ωράριο, προσφέροντάς σας τη
          δυνατότητα να εγγραφείτε και να παίξετε οποιαδήποτε στιγμή προτιμάτε.
          Οι ταχύτητες προόδου των χαρακτήρων (rates) στον Server έχουν οριστεί
          στο 1000%, προσφέροντας μια πιο γρήγορη πρόοδο στην απόκτηση εμπειρίας
          (EXP), χρήματος του παιχνιδιού (yang) και αντικειμένων. Επίσης,
          ανακαλύψτε μια πληθώρα νέων αντικειμένων, αποστολών και απολαύστε την
          εξερεύνηση των νέων χαρτών που προσθέσαμε για εσάς. Το μέγιστο επίπεδο
          χαρακτήρα έχει οριστεί στο 250, προσφέροντας σας μια μοναδική εμπειρία
          παιχνιδιού. Σας προσφέρουμε επίσης πλήρη μετάφραση στα ελληνικά για
          όλους τους τομείς του παιχνιδιού, ώστε να απολαμβάνετε την εμπειρία
          χωρίς γλωσσικά εμπόδια. Στον server μας, θα συναντήσετε ποικίλα
          συστήματα που προσθέσαμε για να εμπλουτίσουμε την εμπειρία σας.
          Ανάμεσά τους, θα βρείτε το σύστημα των "extra πόντων" στις Συντεχνίες,
          το οποίο ενισχύει τη συνεργασία και την ομαδικότητα μεταξύ των
          παικτών. Επιπλέον, υπάρχει φραγή μεμονωμένων χρηστών στα προσωπικά
          μηνύματα (pm) για την προστασία της ιδιωτικότητας και της ασφάλειάς
          σας. Το τραπεζικό και μετοχικό σύστημα σας επιτρέπει να διαχειρίζεστε
          τα χρήματά σας και την περιουσία σας με άνεση και ασφάλεια. Ο πίνακας
          online αρχηγών συντεχνιών προσφέρει μια ενδιαφέρουσα ανταγωνιστική
          διάσταση, ενώ οι αποστολές του Βιολόγου παρέχουν πρόκληση και
          επιβράβευση για την εξερεύνηση και τη συμμετοχή σας στον κόσμο του
          παιχνιδιού. Σας προσφέρουμε επίσης νέες αποστολές για όλα τα επίπεδα
          και χάρτες PvP, όπου οι νίκες και οι ήττες σας επηρεάζουν τη
          βαθμολογία σας και σας δίνουν την ευκαιρία να αναδειχθείτε και να
          ανταγωνιστείτε με άλλους παίκτες. Αξιοποιήστε την Φόρμα Επικοινωνίας
          μας για οποιαδήποτε ερώτησή σας, καθώς είμαστε πάντα διαθέσιμοι να σας
          υποστηρίξουμε και να σας βοηθήσουμε. Σας ευχόμαστε μια ευχάριστη και
          απολαυστική διαμονή στον Server μας και ελπίζουμε να απολαύσετε τον
          κόσμο του Reventon Metin2 GR με όλα τα νέα χαρακτηριστικά και
          περιεχόμενα που προσφέρουμε. Με εκτίμηση, Η Ομάδα Διαχείρισης του
          Reventon Metin2 GR.
        </template>
      </Card>
    </a-col>
    <a-col :span="12" style="padding: 10px">
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
    </a-col>
  </a-row>
</template>

<script lang="ts" setup>
import Ranking from '@/components/Home/Ranking.vue';
import API from '@/services/api/API.communicate';
import { onMounted, ref } from 'vue';
import Card from '@/components/General/Card.vue';
const activeKey = ref('1');

const charTableColumns = ref([
  { title: 'Θέση', key: 'index', dataIndex: 'index' },
  { title: 'Όνομα', key: 'name', dataIndex: 'name' },
  { title: 'Επίπεδο', key: 'level', dataIndex: 'level' },
  {
    title: 'Αποστολές',
    key: 'highest_collect_quest_lv',
    dataIndex: 'highest_collect_quest_lv',
  },
]);

const guildTableColumns = ref([
  { title: 'Θέση', key: 'index', dataIndex: 'index' },
  { title: 'Όνομα', key: 'name', dataIndex: 'name' },
  { title: 'Επίπεδο', key: 'level', dataIndex: 'level' },
  { title: 'Πόντοι', key: 'ladder_point', dataIndex: 'ladder_point' },
]);

const characters = ref([]);
const guilds: any = ref([]);

onMounted(() => {
  API.sendRequest('ranking-players-5', 'GET')
    .then((response: any) => {
      let index = 1;
      response.forEach((element: any) => {
        element.index = index++;
        if (element.guild_name === null) {
          element.guild_name = '-';
        }
        if (element.highest_collect_quest_lv === null) {
          element.highest_collect_quest_lv = '-';
        }
      });
      characters.value = response;
    })
    .catch((err) => {
      console.log(`Error API ${err}`);
    });

  API.sendRequest('ranking-guilds-5', 'GET')

    .then((response: any) => {
      let index = 1;

      response.forEach((element: any) => {
        element.index = index++;
      });

      guilds.value = response;
    })
    .catch((err) => {
      console.log(err);
    });
});
</script>
