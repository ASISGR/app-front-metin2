<template>
  <Card :title="t('BONUS_LIST_TITLE')">
    <template #content>
      <a-tabs v-model:activeKey="activeKey" centered>
        <a-tab-pane key="1" :tab="t('FIRST_5_BONUSES')">
          <a-table
            :columns="bonusTableColumns"
            :data-source="item_attr"
            bordered
            :pagination="false"
            :scroll="{ x: true }"
          >
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'apply'">
                <a>{{ record.apply }}</a>
              </template>

              <template v-else-if="canShowBonus(column.key, record)">
                <a>{{ record.lv5 }}</a>
              </template>

              <template v-else>
                <a>-</a>
              </template>
            </template>
          </a-table>
        </a-tab-pane>

        <a-tab-pane key="2" :tab="t('SIXTH_AND_SEVENTH_BONUSES')">
          <a-table
            :columns="bonusTableColumns"
            :data-source="item_attr_rare"
            bordered
            :pagination="false"
            :scroll="{ x: true }"
          >
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'apply'">
                <a>{{ record.apply }}</a>
              </template>

              <template v-else-if="canShowBonus(column.key, record)">
                <a>{{ record.lv5 }}</a>
              </template>

              <template v-else>
                <a>-</a>
              </template>
            </template>
          </a-table>
        </a-tab-pane>
      </a-tabs>
    </template>
  </Card>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import API from '@/services/api/API.communicate';
import Card from '@/components/General/Card.vue';

const { t } = useI18n();

const activeKey = ref('1');

const item_attr = ref<any[]>([]);
const item_attr_rare = ref<any[]>([]);

const bonusTableColumns = computed(() => [
  { title: 'Bonus', key: 'apply', dataIndex: 'apply' },
  { title: t('ITEM_WEAPON'), key: 'weapon', dataIndex: 'lv5' },
  { title: t('ITEM_ARMOR'), key: 'body', dataIndex: 'lv5' },
  { title: t('ITEM_BRACELET'), key: 'wrist', dataIndex: 'lv5' },
  { title: t('ITEM_SHOES'), key: 'foots', dataIndex: 'lv5' },
  { title: t('ITEM_NECKLACE'), key: 'neck', dataIndex: 'lv5' },
  { title: t('ITEM_HELMET'), key: 'head', dataIndex: 'lv5' },
  { title: t('ITEM_SHIELD'), key: 'shield', dataIndex: 'lv5' },
  { title: t('ITEM_EARRINGS'), key: 'ear', dataIndex: 'lv5' },
]);

const canShowBonus = (key: string, record: any) => {
  return record?.[key] === '5' || (key === 'shield' && record?.shield === '1');
};

const normalBonusKeys = [
  'BONUS_MAX_HP',
  'BONUS_MAX_SP',
  'BONUS_VITALITY',
  'BONUS_INTELLIGENCE',
  'BONUS_STRENGTH',
  'BONUS_DEXTERITY',
  'BONUS_ATTACK_SPEED',
  'BONUS_MOVEMENT_SPEED',
  'BONUS_CASTING_SPEED',
  'BONUS_HP_REGEN',
  'BONUS_SP_REGEN',
  'BONUS_POISON_CHANCE',
  'BONUS_STUN_CHANCE',
  'BONUS_SLOW_CHANCE',
  'BONUS_CRITICAL_CHANCE',
  'BONUS_PENETRATION_CHANCE',
  'BONUS_STRONG_AGAINST_HALF_HUMANS',
  'BONUS_STRONG_AGAINST_ANIMALS',
  'BONUS_STRONG_AGAINST_ORCS',
  'BONUS_STRONG_AGAINST_MYSTICS',
  'BONUS_STRONG_AGAINST_UNDEAD',
  'BONUS_STRONG_AGAINST_DEVILS',
  'BONUS_DAMAGE_ABSORBED_BY_HP',
  'BONUS_DAMAGE_ABSORBED_BY_SP',
  'BONUS_STEAL_SP',
  'BONUS_BLOCK_CHANCE',
  'BONUS_ARROW_DODGE_CHANCE',
  'BONUS_SWORD_DEFENSE',
  'BONUS_TWO_HAND_DEFENSE',
  'BONUS_DAGGER_DEFENSE',
  'BONUS_BELL_DEFENSE',
  'BONUS_FAN_DEFENSE',
  'BONUS_ARROW_RESISTANCE',
  'BONUS_FIRE_RESISTANCE',
  'BONUS_LIGHTNING_RESISTANCE',
  'BONUS_MAGIC_RESISTANCE',
  'BONUS_WIND_RESISTANCE',
  'BONUS_MELEE_REFLECT_CHANCE',
  'BONUS_POISON_RESISTANCE',
  'BONUS_EXP_BONUS_CHANCE',
  'BONUS_DOUBLE_YANG_CHANCE',
  'BONUS_DOUBLE_ITEM_CHANCE',
  'BONUS_STUN_IMMUNITY',
  'BONUS_SLOW_IMMUNITY',
  'BONUS_ATTACK_VALUE',
];

const rareBonusKeys = [
  'BONUS_WARRIOR_DEFENSE_CHANCE',
  'BONUS_NINJA_DEFENSE_CHANCE',
  'BONUS_SURA_DEFENSE_CHANCE',
  'BONUS_SHAMAN_DEFENSE_CHANCE',
  'BONUS_STRONG_AGAINST_WARRIORS',
  'BONUS_STRONG_AGAINST_NINJAS',
  'BONUS_STRONG_AGAINST_SURAS',
  'BONUS_STRONG_AGAINST_SHAMANS',
  'BONUS_MAX_HP',
  'BONUS_STRONG_AGAINST_MONSTERS',
];

const translateBonusList = (list: any[], keys: string[]) => {
  return list.map((item, index) => ({
    ...item,
    apply: t(keys[index] || item.apply),
  }));
};

onMounted(async () => {
  API.sendRequest('bonus', 'GET')
    .then((response: any) => {
      item_attr.value = translateBonusList(response.item_attr || [], normalBonusKeys);
      item_attr_rare.value = translateBonusList(response.item_attr_rare || [], rareBonusKeys);
    })
    .catch((err: any) => {
      console.log(err);
    });
});
</script>

<style>
#components-table-demo-size h4 {
  margin-bottom: 16px;
}
</style>