<script setup lang="ts">
import { DataProps } from "~/types/types";

const props = defineProps({
  data: {
    type: Object as PropType<DataProps | null>,
    required: true,
  },
});
</script>

<template>
  <CardGrid v-if="data" :data="data.content" :filters="data.filters" />
</template>
