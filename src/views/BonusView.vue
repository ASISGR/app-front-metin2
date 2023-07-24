<template>
  <Card
    title="Η ΛΊΣΤΑ BONUS ΜΕ ΤΙΣ ΜΈΓΙΣΤΕΣ ΤΙΜΈΣ ΣΕ ΚΑΘΈΝΑ ΑΠΌ ΤΑ ΕΊΔΗ ΑΝΤΙΚΕΙΜΈΝΩΝ"
  >
    <template #content>
      <a-tabs v-model:activeKey="activeKey" centered>
        <a-tab-pane key="1" tab="ΤΑ ΠΡΏΤΑ 5 BONUS">
          <a-table
            :columns="normalBonusTableColumns"
            :data-source="item_attr"
            bordered
            :pagination="false"
            :scroll="{ x: true }"
          >
            <template #bodyCell="{ column, record }">
              <template
                v-if="
                  (column.title === 'Όπλο' && record.weapon === '5') ||
                  (column.title === 'Πανοπλία' && record.body === '5') ||
                  (column.title === 'Βραχιόλι' && record.wrist === '5') ||
                  (column.title === 'Παπούτσια' && record.foots === '5') ||
                  (column.title === 'Περιδέραιο' && record.neck === '5') ||
                  (column.title === 'Κράνος' && record.head === '5') ||
                  (column.title === 'Ασπίδα' && record.shield === '5') ||
                  (column.title === 'Ασπίδα' && record.shield === '1') ||
                  (column.title === 'Σκουλαρίκια' && record.ear === '5')
                "
              >
                <a>
                  {{ record.lv5 }}
                </a>
              </template>
              <template v-else-if="column.title === 'Bonus'">
                <a> {{ record.apply }} </a>
              </template>
              <template v-else>
                <a> - </a>
              </template>
            </template>
          </a-table>
        </a-tab-pane>

        <a-tab-pane key="2" tab="ΤΑ 6Α ΚΑΙ 7Α BONUS">
          <a-table
            :columns="especiallyBonusTableColumns"
            :data-source="item_attr_rare"
            bordered
            :pagination="false"
            :scroll="{ x: true }"
          >
            <template #bodyCell="{ column, record }">
              <template
                v-if="
                  (column.title === 'Όπλο' && record.weapon === '5') ||
                  (column.title === 'Πανοπλία' && record.body === '5') ||
                  (column.title === 'Βραχιόλι' && record.wrist === '5') ||
                  (column.title === 'Παπούτσια' && record.foots === '5') ||
                  (column.title === 'Περιδέραιο' && record.neck === '5') ||
                  (column.title === 'Κράνος' && record.head === '5') ||
                  (column.title === 'Ασπίδα' && record.shield === '5') ||
                  (column.title === 'Ασπίδα' && record.shield === '1') ||
                  (column.title === 'Σκουλαρίκια' && record.ear === '5')
                "
              >
                <a>
                  {{ record.lv5 }}
                </a>
              </template>
              <template v-else-if="column.title === 'Bonus'">
                <a> {{ record.apply }} </a>
              </template>
              <template v-else>
                <a> - </a>
              </template>
            </template>
          </a-table>
        </a-tab-pane>
      </a-tabs>
    </template>
  </Card>
</template>

<script lang="ts" setup>
import API from '@/services/api/API.communicate';
import { onMounted, ref } from 'vue';
import Card from '@/components/General/Card.vue';

const activeKey = ref('1');

const normalBonusTableColumns = ref([
  { title: 'Bonus', key: 'apply', dataIndex: 'apply', responsive: ['md'] },
  { title: 'Όπλο', key: 'lv5', dataIndex: 'lv5', responsive: ['md'] },
  { title: 'Πανοπλία', key: 'lv5', dataIndex: 'lv5', responsive: ['md'] },
  { title: 'Βραχιόλι', key: 'lv5', dataIndex: 'lv5', responsive: ['md'] },
  { title: 'Παπούτσια', key: 'lv5', dataIndex: 'lv5', responsive: ['md'] },
  { title: 'Περιδέραιο', key: 'lv5', dataIndex: 'lv5', responsive: ['md'] },
  { title: 'Κράνος', key: 'lv5', dataIndex: 'lv5', responsive: ['md'] },
  { title: 'Ασπίδα', key: 'lv5', dataIndex: 'lv5', responsive: ['md'] },
  { title: 'Σκουλαρίκια', key: 'lv5', dataIndex: 'lv5', responsive: ['md'] },
]);
const especiallyBonusTableColumns = ref([
  { title: 'Bonus', key: 'lv5', dataIndex: 'apply' },
  { title: 'Όπλο', key: 'lv5', dataIndex: 'lv5' },
  { title: 'Πανοπλία', key: 'lv5', dataIndex: 'lv5' },
  { title: 'Βραχιόλι', key: 'lv5', dataIndex: 'lv5' },
  { title: 'Παπούτσια', key: 'lv5', dataIndex: 'lv5' },
  { title: 'Περιδέραιο', key: 'lv5', dataIndex: 'lv5' },
  { title: 'Κράνος', key: 'lv5', dataIndex: 'lv5' },
  { title: 'Ασπίδα', key: 'lv5', dataIndex: 'lv5' },
  { title: 'Σκουλαρίκια', key: 'lv5', dataIndex: 'lv5' },
]);

const item_attr = ref(null);
const item_attr_rare = ref(null);

onMounted(async () => {
  API.sendRequest('bonus', 'GET')
    .then((response: any) => {
      response.item_attr[0].apply = 'Μέγ. HP';
      response.item_attr[1].apply = 'Μέγ. SP';
      response.item_attr[2].apply = 'Ζωτικότητα';
      response.item_attr[3].apply = 'Ευφυΐα';
      response.item_attr[4].apply = 'Δύναμη';
      response.item_attr[5].apply = 'Ευκινησία';
      response.item_attr[6].apply = 'Ταχύτητα Επίθεσης';
      response.item_attr[7].apply = 'Ταχύτητα';
      response.item_attr[8].apply = 'Ταχύτητα Μαγείας';
      response.item_attr[9].apply = 'Αναγέννηση HP';
      response.item_attr[10].apply = 'Αναγέννηση SP';
      response.item_attr[11].apply = 'Πιθανότητα Δηλητηρίασης';
      response.item_attr[12].apply = 'Πιθανότητα λιποθυμίας';
      response.item_attr[13].apply = 'Πιθανότητα επιβράδυνσης';
      response.item_attr[14].apply = 'Πιθανότητα Κρίσιμου Χτυπήματος';
      response.item_attr[15].apply = 'Πιθανό Χτύπημα Διάτρησης';
      response.item_attr[16].apply = 'Δυνατό ενάντια σε Ημιάνθρωπους';
      response.item_attr[17].apply = 'Δυνατό ενάντια σε Ζώα';
      response.item_attr[18].apply = 'Δυνατό ενάντια σε Ορκ';
      response.item_attr[19].apply = 'Δυνατό ενάντια σε Μυστικιστές';
      response.item_attr[20].apply = 'Δυνατό ενάντια σε Απέθαντους';
      response.item_attr[21].apply = 'Δυνατό ενάντια σε Διάβολο';
      response.item_attr[22].apply = 'Η Ζημιά θα απορροφηθεί από HP';
      response.item_attr[23].apply = 'Η Ζημιά θα απορροφηθεί από SP';
      response.item_attr[24].apply = 'Πιθανότητα να πάρεις την SP του εχθρού';
      response.item_attr[25].apply = 'Πιθανότητα απόκρουσης';
      response.item_attr[26].apply = 'Πιθανότητα να αποφύγεις βέλη';
      response.item_attr[27].apply = 'Άμυνα Ξίφους';
      response.item_attr[28].apply = 'Άμυνα Δύο Χεριών';
      response.item_attr[29].apply = 'Άμυνα Στιλέτου';
      response.item_attr[30].apply = 'Άμυνα Καμπάνας';
      response.item_attr[31].apply = 'Άμυνα Βεντάλιας';
      response.item_attr[32].apply = 'Αντίσταση Βέλους';
      response.item_attr[33].apply = 'Αντίσταση Φωτιάς';
      response.item_attr[34].apply = 'Αντίσταση Αστραπής';
      response.item_attr[35].apply = 'Mαγική Αντίσταση';
      response.item_attr[36].apply = 'Αντίσταση Ανέμου';
      response.item_attr[37].apply = 'Πιθανότητα ανάκλασης σώμα με σώμα';
      response.item_attr[38].apply = 'Αντίσταση στο δηλητήριο';
      response.item_attr[39].apply = 'Πιθανότητα για μπόνους εμπειρίας';
      response.item_attr[40].apply = 'Πιθανότητα για διπλάσια yang';
      response.item_attr[41].apply = 'Πιθανότητα για διπλάσια αντικείμενα';
      response.item_attr[42].apply = 'Ανοσία στη συσκότιση';
      response.item_attr[43].apply = 'Ανοσία στην καθυστέρηση';
      response.item_attr[44].apply = 'Αξία Επίθεσης';

      item_attr.value = response.item_attr;

      response.item_attr_rare[0].apply =
        'Πιθανότητες άμυνας από επιθέσεις Warrior';
      response.item_attr_rare[1].apply =
        'Πιθανότητες άμυνας από επιθέσεις Ninja';
      response.item_attr_rare[2].apply =
        'Πιθανότητες άμυνας από επιθέσεις Sura';
      response.item_attr_rare[3].apply =
        'Πιθανότητες άμυνας από επιθέσεις Shaman';
      response.item_attr_rare[4].apply = 'Δυνατό ενάντια σε Πολεμιστές';
      response.item_attr_rare[5].apply = 'Δυνατό ενάντια σε Ninja';
      response.item_attr_rare[6].apply = 'Δυνατό ενάντια σε Sura';
      response.item_attr_rare[7].apply = 'Δυνατό ενάντια σε Shaman';
      response.item_attr_rare[8].apply = 'Μέγ. HP';
      response.item_attr_rare[9].apply = 'Δυνατό ενάντια σε Τέρατα';

      item_attr_rare.value = response.item_attr_rare;
      console.log(item_attr_rare.value);
      console.log(item_attr.value);
    })
    .catch((err) => {
      console.log(err);
    });
});
</script>

<style>
#components-table-demo-size h4 {
  margin-bottom: 16px;
}
</style>
