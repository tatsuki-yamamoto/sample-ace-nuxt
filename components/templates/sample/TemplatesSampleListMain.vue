<script lang="ts" setup>
const search = reactive({
  title: '',
  content: '',
});

const list = [
  {
    title: 'あああ',
    content: 'AAA',
  },
  {
    title: 'あああううう',
    content: 'BBB',
  },
  {
    title: 'えええ',
    content: 'CCC',
  },
  {
    title: 'おおお',
    content: 'DDD',
  },
  {
    title: 'かかか',
    content: 'EEE',
  },
];
const filteredList = computed(() => {
  return list.filter((item) => {
    return item.title.includes(search.title) && item.content.includes(search.content);
  });
});
</script>

<template>
  <atoms-layout-container>
    <molecules-button-back></molecules-button-back>
    <atoms-text-title>List</atoms-text-title>
    <organisms-sample-search-dialog :search="search"></organisms-sample-search-dialog>
    <v-table density="comfortable" fixed-header hover height="400" class="mt-4">
      <thead>
        <tr>
          <th width="20%">No.</th>
          <th width="40%">タイトル</th>
          <th width="40%">内容</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(item, index) in filteredList" :key="index">
          <tr>
            <td width="20%">{{ index + 1 }}</td>
            <td width="40%">{{ item.title }}</td>
            <td width="40%">{{ item.content }}</td>
          </tr>
        </template>
      </tbody>
    </v-table>
  </atoms-layout-container>
</template>
