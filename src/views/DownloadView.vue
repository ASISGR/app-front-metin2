<template>
  <Card :title="t('DOWNLOAD_GAME_TITLE')">
    <template #content>
      <a-space>
        <a-button
          v-for="(download, key) in downloadLinks"
          :key="key"
          :disabled="!download.downloadUrl"
          target="_blank"
          :href="download.downloadUrl"
          type="primary"
          :size="size"
        >
          <template #icon>
            <DownloadOutlined />
          </template>
          {{ download.name }}
        </a-button>
      </a-space>

      <br />
      <br />

      <a-descriptions :title="t('MINIMUM_SYSTEM_REQUIREMENTS')" bordered>
        <a-descriptions-item :label="t('OPERATING_SYSTEM')">
          Windows: 2000, XP, 2003, Vista, 7, 8, 8.1, 10, 11
        </a-descriptions-item>

        <a-descriptions-item label="CPU">
          Pentium 3 1GHz
        </a-descriptions-item>

        <a-descriptions-item :label="t('MEMORY')">
          512 MB
        </a-descriptions-item>

        <a-descriptions-item :label="t('HARD_DISK')">
          2 GB
        </a-descriptions-item>

        <a-descriptions-item :label="t('GRAPHICS_CARD')">
          {{ t('MIN_GRAPHICS_CARD_VALUE') }}
        </a-descriptions-item>

        <a-descriptions-item :label="t('SOUND_CARD')">
          {{ t('DIRECTX_9_SUPPORT') }}
        </a-descriptions-item>

        <a-descriptions-item :label="t('MOUSE')">
          {{ t('WINDOWS_COMPATIBLE_MOUSE') }}
        </a-descriptions-item>
      </a-descriptions>

      <br />
      <br />

      <a-descriptions :title="t('RECOMMENDED_SYSTEM_REQUIREMENTS')" bordered>
        <a-descriptions-item :label="t('OPERATING_SYSTEM')">
          Windows: 7, 8, 8.1, 10
        </a-descriptions-item>

        <a-descriptions-item label="CPU">
          Pentium 3 1GHz
        </a-descriptions-item>

        <a-descriptions-item :label="t('MEMORY')">
          1GB RAM
        </a-descriptions-item>

        <a-descriptions-item :label="t('HARD_DISK')">
          50 GB
        </a-descriptions-item>

        <a-descriptions-item :label="t('GRAPHICS_CARD')">
          {{ t('REC_GRAPHICS_CARD_VALUE') }}
        </a-descriptions-item>

        <a-descriptions-item :label="t('SOUND_CARD')">
          {{ t('DIRECTX_9_SUPPORT') }}
        </a-descriptions-item>

        <a-descriptions-item :label="t('MOUSE')">
          {{ t('WINDOWS_COMPATIBLE_MOUSE') }}
        </a-descriptions-item>
      </a-descriptions>
    </template>
  </Card>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { DownloadOutlined } from '@ant-design/icons-vue';
import type { SizeType } from 'ant-design-vue/es/config-provider';
import { useI18n } from 'vue-i18n';

import Card from '@/components/General/Card.vue';
import APIController from '@/services/api/API.communicate';

interface DownloadLink {
  name: string;
  downloadUrl: string;
}

const { t } = useI18n();

const size = ref<SizeType>('large');
const downloadLinks = ref<DownloadLink[]>([]);

onMounted(() => {
  APIController.sendRequest('settings-status', 'GET')
    .then((response: any) => {
      downloadLinks.value = response.downloadLinks || [];
    })
    .catch((err: any) => {
      console.log(err);
    });
});
</script>

<style scoped></style>