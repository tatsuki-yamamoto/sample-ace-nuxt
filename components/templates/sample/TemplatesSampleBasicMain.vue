<script lang="ts" setup>
import { mdiPlus, mdiMinus } from '@mdi/js';

const message = ref('hello world');

const user = reactive({
  firstName: 'John',
  lastName: 'Doe',
  age: 25,
});

const counter = ref(0);
const counterLabel = computed(() => {
  return `カウンターは「${counter.value}」です！`;
});
const increment = () => {
  counter.value++;
};
const decrement = () => {
  counter.value--;
};

// 旧mountedに相当
onMounted(() => {
  console.log('mounted!');
});

// 旧updatedに相当
onUpdated(() => {
  console.log('updated!');
});

// 旧destroyedに相当
onUnmounted(() => {
  console.log('unmounted!');
});
</script>

<template>
  <atoms-layout-container>
    <molecules-button-back></molecules-button-back>
    <atoms-text-title>Basic</atoms-text-title>
    <molecules-sub-title-and-contents title="ref">
      <v-text-field v-model="message" type="number" label="message"></v-text-field>
    </molecules-sub-title-and-contents>

    <molecules-sub-title-and-contents title="reactive">
      <v-text-field v-model="user.firstName" label="firstName"></v-text-field>
      <v-text-field v-model="user.lastName" label="lastName"></v-text-field>
      <v-text-field v-model="user.age" type="number" label="age"></v-text-field>
    </molecules-sub-title-and-contents>

    <molecules-sub-title-and-contents title="computed・method">
      <p class="mb-2">{{ counterLabel }}</p>
      <v-btn-group color="primary">
        <v-btn @click="increment"><v-icon :icon="mdiPlus"></v-icon></v-btn>
        <v-btn @click="decrement"><v-icon :icon="mdiMinus"></v-icon></v-btn>
      </v-btn-group>
    </molecules-sub-title-and-contents>
  </atoms-layout-container>
</template>
