<template>
  <Card title="ΛΉΨΗ ΠΑΙΧΝΙΔΙΟΎ">
    <template #content>
      <a-space>
        <a-button type="primary" :size="size">
          <template #icon>
            <DownloadOutlined />
          </template>
          Download
        </a-button>
      </a-space>
      <br />
      <br />
      <a-descriptions title="Ελάχιστες απαιτήσεις συστήματος" bordered>
        <a-descriptions-item label="Λειτουργικό Σύστημα (O.S.)"
          >Windows: 2000, XP, 2003, Vista, 7, 8, 8.1, 10</a-descriptions-item
        >
        <a-descriptions-item label="CPU">Pentium 3 1GHz</a-descriptions-item>
        <a-descriptions-item label="Μνήμη">512 MB</a-descriptions-item>
        <a-descriptions-item label="Σκληρός δίσκος">2 GB</a-descriptions-item>
        <a-descriptions-item label="Κάρτα γραφικών"
          >Κάρτα γραφικών μεγαλύτερη από 64MB RAM</a-descriptions-item
        >
        <a-descriptions-item label="Κάρτα ήχου"
          >Υποστήριξη DirectX 9.0</a-descriptions-item
        >
        <a-descriptions-item label="Ποντίκι"
          >Ποντίκι συμβατό με τα Windows</a-descriptions-item
        >
      </a-descriptions>
      <br />
      <br />
      <a-descriptions title="Συνιστώμενες Λειτουργίες Συστήματος" bordered>
        <a-descriptions-item label="Λειτουργικό Σύστημα (O.S.)"
          >Windows: 7, 8, 8.1, 10.</a-descriptions-item
        >
        <a-descriptions-item label="CPU">Pentium 3 1GHz</a-descriptions-item>
        <a-descriptions-item label="Μνήμη">1GB RAM</a-descriptions-item>
        <a-descriptions-item label="Σκληρός δίσκος">50 GB</a-descriptions-item>
        <a-descriptions-item label="Κάρτα γραφικών"
          >Κάρτα γραφικών μεγαλύτερη από 1GB RAM</a-descriptions-item
        >
        <a-descriptions-item label="Κάρτα ήχου"
          >Υποστήριξη DirectX 9.0</a-descriptions-item
        >
        <a-descriptions-item label="Ποντίκι"
          >Ποντίκι συμβατό με τα Windows</a-descriptions-item
        >
      </a-descriptions>
    </template>
  </Card>
</template>
<script lang="ts" setup>
import Card from '@/components/General/Card.vue';
import { DownloadOutlined } from '@ant-design/icons-vue';
import type { SizeType } from 'ant-design-vue/es/config-provider';
import { ref } from 'vue';

const size = ref<SizeType>('large');
</script>
<style scoped></style>
