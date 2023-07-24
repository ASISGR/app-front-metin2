<template>
  <Card title="ΚΑΤΆΤΑΞΗ ΧΑΡΑΚΤΗΡΏΝ">
    <template #content>
      <a-pagination
        v-model:current="page"
        :total="paginationData?.totalPlayers"
        :pageSize="50"
        show-less-items
        simple
      />
      <br />
      <a-table
        :columns="characterTableColumns"
        :data-source="players"
        bordered
        :pagination="false"
        :scroll="{ x: true }"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.title === 'Θέση'">
            <a>
              {{ (paginationData?.currentPage - 1) * 50 + record.index }}
            </a>
          </template>

          <template v-if="column.title === 'Βασίλειο'">
            <a>
              <img
                :src="
                  record.empire === 1
                    ? redFlag
                    : record.empire === 2
                    ? yellowFlag
                    : record.empire === 3
                    ? blueFlag
                    : ''
                "
                title="Βασίλειο"
                alt="Reich"
              />
            </a>
          </template>
        </template>
      </a-table>
      <br />
      <a-pagination
        v-model:current="page"
        :total="paginationData?.totalPlayers"
        :pageSize="50"
        show-less-items
        simple
      />
    </template>
  </Card>
</template>

<script lang="ts" setup>
import { ref, onMounted, watchEffect } from 'vue';
import Card from '@/components/General/Card.vue';
import API from '@/services/api/API.communicate';
import redFlag from '@/assets/images/empires/1.jpg';
import yellowFlag from '@/assets/images/empires/2.jpg';
import blueFlag from '@/assets/images/empires/3.jpg';
import { useRouter } from 'vue-router';

// Init Variables
const route = useRouter();
const players = ref([]);
const paginationData = ref<any>(null);
const page = ref(route.currentRoute.value.params.index);
const characterTableColumns = ref([
  { title: 'Θέση', key: 'index', dataIndex: 'index' },
  { title: 'Όνομα', key: 'name', dataIndex: 'name' },
  { title: 'Επίπεδο', key: 'level', dataIndex: 'level' },
  {
    title: 'Αποστολές',
    key: 'highest_collect_quest_lv',
    dataIndex: 'highest_collect_quest_lv',
  },
  { title: 'Συντεχνία', key: 'guild_name', dataIndex: 'guild_name' },
  { title: 'Χρόνος παιχνιδιού', key: 'playtime', dataIndex: 'playtime' },
  { title: 'EXP', key: 'exp', dataIndex: 'exp' },
  { title: 'Βασίλειο', key: 'empire', dataIndex: 'empire' },
]);

onMounted(() => {
  // Output value to console

  API.sendRequest(
    `ranking-players/${route.currentRoute.value.params.index}`,
    'GET'
  )
    .then((response: any) => {
      players.value = response.players;
      console.log(players.value);
      const fillPagination = {
        totalPlayers: response.totalPlayers,
        hasNextPage: response.hasNextPage,
        hasPreviousPage: response.hasPreviousPage,
        currentPage: parseInt(response.currentPage),
        nextPage: response.nextPage,
        previousPage: response.previousPage,
        lastPage: response.lastPage,
      };
      paginationData.value = fillPagination;
    })
    .catch((err) => {
      console.log(err);
    });
});

watchEffect(() => {
  // Κάθε φορά που αλλάζει το paginationIndex
  if (page.value) {
    const url = `${window.location.href.split('players')[0]}players/${
      page.value
    }`;

    history.pushState(null, '', url);

    API.sendRequest(`ranking-players/${page.value}`, 'GET')
      .then((response: any) => {
        players.value = response.players;

        const fillPagination = {
          totalPlayers: response.totalPlayers,
          hasNextPage: response.hasNextPage,
          hasPreviousPage: response.hasPreviousPage,
          currentPage: response.currentPage,
          nextPage: response.nextPage,
          previousPage: response.previousPage,
          lastPage: response.lastPage,
        };
        paginationData.value = fillPagination;
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
});
</script>

<style></style>
