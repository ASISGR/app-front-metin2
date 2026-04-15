<template>
    <a-table  :row-selection="rowSelection" :columns="columns" :data-source="data" :pagination="{pageSize: 50, }" />
  </template>
  <script lang="ts" setup>
  import { computed, ref, unref, onMounted, watchEffect } from 'vue';
  import { Table } from 'ant-design-vue';
  const emit = defineEmits(['sendEmailsData'])

  interface DataType {
    key: string | number;
    email: string;
  }
  
  const columns = [
    {
      title: 'Email',
      dataIndex: 'email',
    },
  ];
  
  const data = ref(<DataType[]| any>[]);
  
  const selectedRowKeys = ref<DataType['key'][]>([]); // Check here to configure the default column
  
  const onSelectChange = (changableRowKeys: string[]) => {
    console.log('selectedRowKeys changed: ', changableRowKeys);
    selectedRowKeys.value = changableRowKeys;
  };
  
  const props = defineProps({
    emails : {type: Array }
  })

  onMounted(() => { 
    data.value = props.emails;
    for(let i = 0; i < data.value.length; i++){
        data.value[i].key = data.value[i].email
        //
    }

  })

  watchEffect(() => { 
    if(selectedRowKeys.value.length){
        emit('sendEmailsData',selectedRowKeys.value)
    }
  })
  
  const rowSelection = computed(() => {
    return {
      selectedRowKeys: unref(selectedRowKeys),
      onChange: onSelectChange,
      hideDefaultSelections: true,
      selections: [
        Table.SELECTION_ALL,
        Table.SELECTION_INVERT,
        Table.SELECTION_NONE,
        {
          key: 'odd',
          text: 'Select Odd Row',
          onSelect: changableRowKeys => {
            let newSelectedRowKeys = [];
            newSelectedRowKeys = changableRowKeys.filter((_key, index) => {
              if (index % 2 !== 0) {
                return false;
              }
              return true;
            });
            selectedRowKeys.value = newSelectedRowKeys;
          },
        },
        {
          key: 'even',
          text: 'Select Even Row',
          onSelect: changableRowKeys => {
            let newSelectedRowKeys = [];
            newSelectedRowKeys = changableRowKeys.filter((_key, index) => {
              if (index % 2 !== 0) {
                return true;
              }
              return false;
            });
            selectedRowKeys.value = newSelectedRowKeys;
          },
        },
      ],
    };
  });
  //1, 2, 77, 58, 57,54,53,52,48,16,17
  </script>
   