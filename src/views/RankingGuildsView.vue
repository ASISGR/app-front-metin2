<template>
  <Card title="ΚΑΤΆΤΑΞΗ ΣΥΝΤΕΧΝΙΏΝ">
    <template #content>
      <a-pagination
        v-model:current="page"
        :total="paginationData?.totalGuilds"
        :pageSize="50"
        show-less-items
        simple
      />
      <br />
      <a-table
        :columns="guildTableColumns"
        :data-source="guilds"
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
                alt="Reich"
              />
            </a>
          </template>
        </template>
      </a-table>
      <br />
      <a-pagination
        v-model:current="page"
        :total="paginationData?.totalGuilds"
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

const guilds = ref([]);
const paginationData = ref<any>(null);
const route = useRouter();
const page = ref(route.currentRoute.value.params.index);

const guildTableColumns = ref([
  { title: 'Θέση', key: 'index', dataIndex: 'index' },
  { title: 'Συντεχνία', key: 'guild_name', dataIndex: 'guild_name' },
  { title: 'Ηγέτης', key: 'playerLeader_name', dataIndex: 'playerLeader_name' },
  {
    title: 'Επίπεδο',
    key: 'guild_level',
    dataIndex: 'guild_level',
  },
  { title: 'Νίκες', key: 'guild_win', dataIndex: 'guild_win' },
  { title: 'Ισοπαλίες', key: 'guild_draw', dataIndex: 'guild_draw' },
  { title: 'Ήττες', key: 'guild_loss', dataIndex: 'guild_loss' },
  { title: 'Πόντοι', key: 'guild_ladder_point', dataIndex: 'guild_ladder_point' },
  { title: 'Βασίλειο', key: 'playerIndex_empire', dataIndex: 'playerIndex_empire' },
]);

onMounted(() => {
  API.sendRequest(
    `topListGuilds/${route.currentRoute.value.params.index}`,
    'GET'
  )
    .then((response: any) => {
      console.log(response.guilds)
      guilds.value = response.guilds;

      const fillPagination = {
        totalGuilds: response.totalGuilds,
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
  if (page.value) {
    const url = `${window.location.href.split('guilds')[0]}guilds/${
      page.value
    }`;

    history.pushState(null, '', url);

    API.sendRequest(`topListGuilds/${page.value}`, 'GET')
      .then((response: any) => {
        guilds.value = response.guilds;

        const fillPagination = {
          totalGuilds: response.totalGuilds[0],
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
