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
  <div class="wrapper">
    <ButtonBack />
  </div>

  <CardGrid v-if="data" :data="data.content" :filters="data.filters" />
</template>
