<script lang="ts" setup>
import { mdiChevronLeft } from '@mdi/js';
import { FunctionalComponent } from 'vue';
import { useDisplay } from 'vuetify';
const { mobile } = useDisplay();

const props = withDefaults(
  defineProps<{
    btnText?: string;
    btnIcon?: string | (new () => any) | FunctionalComponent;
    title?: string;
    scrollable?: boolean;
    persistent?: boolean;
    transition?: string;
    fullscreen?: boolean;
  }>(),
  {
    btnText: '開く',
    btnIcon: undefined,
    title: '',
    scrollable: true,
    persistent: false,
    transition: 'v-fade-transition',
    fullscreen: false,
  },
);

const dialog = ref(false);
const fullscreenByMobile = computed(() => {
  return props.fullscreen || mobile.value;
});
</script>

<template>
  <v-dialog
    v-model="dialog"
    :max-width="fullscreenByMobile ? undefined : '60vw'"
    :scrollable="scrollable"
    :persistent="persistent"
    :transition="transition"
    :fullscreen="fullscreenByMobile"
  >
    <template #activator="{ props: vDialogProps }">
      <v-btn color="primary" flat v-bind="vDialogProps">
        <v-icon v-if="btnIcon" start :icon="btnIcon"></v-icon>
        {{ btnText }}
      </v-btn>
    </template>

    <v-card>
      <v-toolbar color="primary">
        <v-btn icon @click="dialog = false">
          <v-icon :icon="mdiChevronLeft"></v-icon>
        </v-btn>
        <v-toolbar-title>{{ title }}</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>

      <v-card-text>
        <slot />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
