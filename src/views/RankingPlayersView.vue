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
                  record.playerIndex_empire === 1
                    ? redFlag
                    : record.playerIndex_empire === 2
                    ? yellowFlag
                    : record.playerIndex_empire === 3
                    ? blueFlag
                    : ''
                "
                title="Βασίλειο"
                alt="Kingdom"
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
const page = ref<any>(route.currentRoute.value.params.index);
const characterTableColumns = ref([
  { title: 'Θέση', key: 'index', dataIndex: 'index' },
  { title: 'Όνομα', key: 'player_name', dataIndex: 'player_name' },
  { title: 'Επίπεδο', key: 'player_level', dataIndex: 'player_level' },
  {
    title: 'Αποστολές',
    key: 'highest_collect_quest_lv',
    dataIndex: 'highest_collect_quest_lv',
  },
  { title: 'Συντεχνία', key: 'playerGuild_name', dataIndex: 'playerGuild_name' },
  { title: 'Χρόνος παιχνιδιού', key: 'player_playtime', dataIndex: 'player_playtime' },
  { title: 'EXP', key: 'player_exp', dataIndex: 'player_exp' },
  { title: 'Βασίλειο', key: 'playerIndex_empire', dataIndex: 'playerIndex_empire' },
]);

onMounted(() => {
  // Output value to console

  API.sendRequest(
    `topListPlayers/${route.currentRoute.value.params.index}`,
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
    page.value = parseInt(page.value)
    const url = `${window.location.href.split('players')[0]}players/${
      page.value
    }`;

    history.pushState(null, '', url);

    API.sendRequest(`topListPlayers/${page.value}`, 'GET')
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
