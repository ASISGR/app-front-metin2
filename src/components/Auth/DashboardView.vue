<template>
  <Card :title="t('ACCOUNT_ACTIVATION_TITLE')" v-if="!userStore.getUser?.isVerified">
    <template #content>
      <a-steps :items="items" />

      <a-button @click="sendAccountVerification" type="primary">
        {{ t('RESEND_VERIFICATION') }}
      </a-button>

      <p>{{ t('RESEND_VERIFICATION_INFO') }}</p>
    </template>
  </Card>

  <Card :title="t('ACCOUNT_INFO_PANEL_TITLE')">
    <template #content>
      <a-descriptions :title="t('MY_PROFILE')" layout="vertical">
        <a-descriptions-item
          v-if="userStore.getUser"
          :label="t('REGISTER_USERNAME')"
          :labelStyle="{ fontWeight: 'bold' }"
        >
          {{ userStore.getUser.login }}
        </a-descriptions-item>

        <a-descriptions-item
          v-if="userStore.getUser"
          :label="t('CHARACTER_LIST')"
          :labelStyle="{ fontWeight: 'bold' }"
        >
          {{ userStore.getUser.players?.toString() }}
        </a-descriptions-item>

        <a-descriptions-item
          v-if="userStore.getUser"
          :label="t('PLAYTIME_MINUTES')"
          :labelStyle="{ fontWeight: 'bold' }"
        >
          {{ userStore.getUser.playtime }} {{ t('MINUTES') }}
        </a-descriptions-item>

        <a-descriptions-item
          v-if="userStore.getUser"
          :label="t('CHARACTER_DELETE_CODE')"
          :labelStyle="{ fontWeight: 'bold' }"
        >
          {{ userStore.getUser.social_id }}
        </a-descriptions-item>

        <a-descriptions-item
          v-if="userStore.getUser"
          :label="t('SAFEBOX_PASSWORD')"
          :labelStyle="{ fontWeight: 'bold' }"
        >
          {{ userStore.getUser.safebox_password }}
        </a-descriptions-item>

        <a-descriptions-item
          v-if="userStore.getUser"
          :label="t('ACCOUNT_EMAIL')"
          :labelStyle="{ fontWeight: 'bold' }"
        >
          {{ userStore.getUser.email }}
        </a-descriptions-item>

        <a-descriptions-item
          v-if="userStore.getUser"
          :label="t('ACCOUNT_STATUS')"
          :labelStyle="{ fontWeight: 'bold' }"
        >
          {{ userStore.getUser.account_status }}
        </a-descriptions-item>

        <a-descriptions-item
          v-if="userStore.getUser"
          :label="t('COINS')"
          :labelStyle="{ fontWeight: 'bold' }"
        >
          {{ userStore.getUser.coins }}
        </a-descriptions-item>

        <a-descriptions-item
          v-if="userStore.getUser"
          :label="t('JCOINS')"
          :labelStyle="{ fontWeight: 'bold' }"
        >
          {{ userStore.getUser.jcoins }}
        </a-descriptions-item>

        <a-descriptions-item
          v-if="userStore.getUser"
          :label="t('LAST_LOGIN')"
          :labelStyle="{ fontWeight: 'bold' }"
        >
          {{ new Date(userStore.getUser.last_play).toLocaleString() }}
        </a-descriptions-item>

        <a-descriptions-item
          :label="t('KINGDOM')"
          :labelStyle="{ fontWeight: 'bold' }"
        >
          <img
            v-if="userStore.getUser"
            :src="getEmpireFlag(userStore.getUser.empire)"
            :title="t('KINGDOM')"
            :alt="t('KINGDOM')"
          />
        </a-descriptions-item>
      </a-descriptions>
    </template>
  </Card>
</template>

<script lang="ts" setup>
import { computed, h, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { message, type StepProps } from 'ant-design-vue';
import { useI18n } from 'vue-i18n';
import {
  UserOutlined,
  SolutionOutlined,
  LoadingOutlined,
  SmileOutlined,
} from '@ant-design/icons-vue';

import Card from '@/components/General/Card.vue';
import APIController from '@/services/api/API.communicate';
import { useUserStore } from '@/stores/useUserStore';

import redFlag from '@/assets/images/empires/1.jpg';
import yellowFlag from '@/assets/images/empires/2.jpg';
import blueFlag from '@/assets/images/empires/3.jpg';

const { t } = useI18n();
const userStore = useUserStore();
const router = useRouter();

const items = computed<StepProps[]>(() => [
  {
    title: t('LOGIN'),
    status: 'finish',
    icon: h(UserOutlined),
  },
  {
    title: t('VERIFICATION'),
    status: userStore.getUser?.isVerified ? 'finish' : 'process',
    icon: userStore.getUser?.isVerified ? h(SolutionOutlined) : h(LoadingOutlined),
  },
  {
    title: t('COMPLETION'),
    status: userStore.getUser?.isVerified ? 'finish' : 'wait',
    icon: h(SmileOutlined),
  },
]);

const getEmpireFlag = (empire: number) => {
  if (empire === 1) return redFlag;
  if (empire === 2) return yellowFlag;
  if (empire === 3) return blueFlag;

  return '';
};

const sendAccountVerification = () => {
  APIController.sendRequest('send-retry-verification', 'POST')
    .then((response: any) => {
      message.success(response.message, 30);
    })
    .catch((err: any) => {
      message.error(err?.data?.message || t('ERROR'), 30);
    });
};

onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const hash = urlParams.get('hash');

  if (!userStore.isLogged && hash) {
    router.push(`/?hash=${hash}`);
    return;
  }

  if (!userStore.isLogged) {
    router.push('/');
    return;
  }

  if (!hash) return;

  APIController.sendRequest('active', 'POST', { hash })
    .then((res: any) => {
      message.success(res.message, 30);

      userStore.loggedUser.userInfo.isVerified = true;
      userStore.loggedUser.userInfo.account_status = 'OK';
    })
    .catch((err: any) => {
      message.error(err?.data?.message || t('ERROR'), 30);
    });
});
</script>

<style scoped>
.error-message {
  color: #cc0033;
  font-size: 12px;
  line-height: 15px;
  margin: 5px 0 0;
  align-self: flex-end;
}
</style>