<template>
  <Card title="Admin Panel">
    <template #content>
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="1" tab="Προσθήκη δημοσίευσης"><News></News></a-tab-pane>
        <a-tab-pane key="2" tab="Γενικές ρυθμίσεις" force-render
          ><Settings></Settings></a-tab-pane
        >
        <a-tab-pane key="3" tab="Λίστα παικτών">Content of Tab Pane 3</a-tab-pane>
        <a-tab-pane key="4" tab="Ενημέρωση σε Emails"><ServerAnnouncement></ServerAnnouncement></a-tab-pane>
      </a-tabs>
    </template>
  </Card>
</template>
<script lang="ts" setup>
  import { ref, onMounted} from "vue";
  import Card from "@/components/General/Card.vue";
  import News from "@/components/Administrator/News.vue";
  import { useRouter } from 'vue-router';
  import { useUserStore } from '@/stores/useUserStore';
  import Settings from '@/components/Administrator/Settings.vue'
import ServerAnnouncement from "./ServerAnnouncement.vue";
  const activeKey = ref("1");

const userStore = useUserStore();
const route = useRouter();

  onMounted(() => {
    if (!userStore.isLogged || !userStore.getUser.isAdmin) {
    route.push('/');
  }
});
</script>
