<template>
    <Card title="ΕΝΕΡΓΟΠΟΙΗΣΗ ΛΟΓΑΡΙΣΜΟΥ" v-if="!userStore.getUser?.isVerified">
      <template #content>

    <a-steps :items="items"></a-steps>
    <a-button @click="sendAccountVerification" type="primary">Επαναστολή επιβεβαίωσης</a-button>
<p>Μπορείτε να εκτελέσετε την επαναστολή επιβεβαίωσης κάθε 1 λεπτό.</p>
      </template>
  </Card>
  <Card title="ΚΑΡΤΈΛΑ ΣΤΟΙΧΕΊΩΝ ΛΟΓΑΡΙΑΣΜΟΎ">
    <template #content>
      <a-descriptions title="Το προφίλ μου" layout="vertical">
        <a-descriptions-item v-if="userStore.getUser"
          label="Όνομα χρήστη"
          :labelStyle="{ fontWeight: 'bold' }"
          >{{ userStore.getUser.login }}</a-descriptions-item
        >
        <a-descriptions-item v-if="userStore.getUser"
          label="Χαρακτήρες"
          :labelStyle="{ fontWeight: 'bold' }"
          >{{ userStore.getUser.players?.toString() }}</a-descriptions-item
        >

        <a-descriptions-item
          label="Λεπτά Παιχνιδού" v-if="userStore.getUser"
          :labelStyle="{ fontWeight: 'bold' }"
          >{{ userStore.getUser.playtime }} Λεπτά</a-descriptions-item
        >
        <a-descriptions-item v-if="userStore.getUser"
          label="Κωδικός διαγραδή χαρακτήρων"
          :labelStyle="{ fontWeight: 'bold' }"
          >{{ userStore.getUser.social_id }}</a-descriptions-item
        >
        <a-descriptions-item v-if="userStore.getUser"
          label="Κωδικός Αποθήκης"
          :labelStyle="{ fontWeight: 'bold' }"
          >{{ userStore.getUser.safebox_password }}</a-descriptions-item
        >
        <a-descriptions-item v-if="userStore.getUser"
          label="E-Mail Λογαριασμού"
          :labelStyle="{ fontWeight: 'bold' }"
          >{{ userStore.getUser.email }}</a-descriptions-item
        >
        <a-descriptions-item v-if="userStore.getUser"
          label="Κατάσταση Λογαριασμού"
          :labelStyle="{ fontWeight: 'bold' }"
          >{{ userStore.getUser.account_status }}</a-descriptions-item
        >
        <a-descriptions-item v-if="userStore.getUser"
          label="Νομίσματα"
          :labelStyle="{ fontWeight: 'bold' }"
          >{{ userStore.getUser.coins }}</a-descriptions-item
        >

        <a-descriptions-item v-if="userStore.getUser"
          label="Μάρκες"
          :labelStyle="{ fontWeight: 'bold' }"
          >{{ userStore.getUser.jcoins }}</a-descriptions-item
        >

        <a-descriptions-item v-if="userStore.getUser"
          label="Τελευτέα Συνδεση"
          :labelStyle="{ fontWeight: 'bold' }"
          >{{
            new Date(userStore.getUser.last_play).toLocaleString()
          }}</a-descriptions-item
        >
        <a-descriptions-item
          label="Βασίλειο"
          :labelStyle="{ fontWeight: 'bold' }"
        >
          <img
            v-if="userStore.getUser"
            :src="
              userStore.getUser.empire === 1
                ? redFlag
                : userStore.getUser.empire === 2
                ? yellowFlag
                : userStore.getUser.empire === 3
                ? blueFlag
                : ''
            "
            title="Βασίλειο"
            alt="Βασίλειο"
        /></a-descriptions-item>
      </a-descriptions>
    </template>
  </Card>
</template>
<script lang="ts" setup>
import Card from '@/components/General/Card.vue';

import redFlag from '@/assets/images/empires/1.jpg';
import yellowFlag from '@/assets/images/empires/2.jpg';
import blueFlag from '@/assets/images/empires/3.jpg';

import { useUserStore } from '@/stores/useUserStore';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { h } from 'vue';
import {
  UserOutlined,
  SolutionOutlined,
  LoadingOutlined,
  SmileOutlined,
} from '@ant-design/icons-vue';
import { type StepProps } from 'ant-design-vue';
import APIController from '@/services/api/API.communicate';
import { message } from 'ant-design-vue';
import { ref } from 'vue';
const items = ref([
  {
    title: 'Σύνδεση',
    status: 'finish',
    icon: h(UserOutlined),
  },
  {
    title: 'Επιβεβαίωση',
    status: 'process',
    icon: h(LoadingOutlined),
  },
  {
    title: 'Ολοκλήρωση',
    status: 'wait',
    icon: h(SmileOutlined),
  },
] as StepProps[]);

const userStore = useUserStore();
const route = useRouter();

onMounted(() => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const hash = urlParams.get('hash');


  if (!userStore.isLogged && hash) {
    route.push(`/?hash=${hash}`);
    return 0;
  } else  if (!userStore.isLogged) {
    route.push('/');
    return 0;
  }


  if (hash) {
    APIController.sendRequest('active', 'POST', { hash: hash })
      .then((res: any) => {
        message.success(res.message,30);
        items.value[1].status = 'finish';
        items.value[1].icon = h(SolutionOutlined);
        items.value[2].status = 'finish'
        userStore.loggedUser.userInfo.isVerified = true;
        userStore.loggedUser.userInfo.account_status = 'OK';


      })
      .catch((err: any) => {
        message.error(err.data.message, 30);
      });
  }

});

function sendAccountVerification(){
  APIController.sendRequest('send-retry-verification', 'POST').then((response:any) => {
    message.success(response.message, 30)
    
   }).catch((err:any) => {
    message.error(err.data.message, 30)
  })
}
</script>
<style scoped>
.error-message {
  color: #cc0033;
  font-size: 12px;
  line-height: 15px;
  margin: 5px 0px 0;
  align-self: flex-end;
}
</style>
