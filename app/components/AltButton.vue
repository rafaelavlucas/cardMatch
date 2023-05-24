<script setup lang="ts">
import { ButtonProps } from "~/types/types";

const props = defineProps({
  title: {
    type: String,
    required: false,
  },
  link: {
    type: String,
    required: false,
  },
});
</script>

<template>
  <NuxtLink :to="link" class="altButton">
    {{ title }}
  </NuxtLink>
</template>

<style lang="scss" scoped>
@use "assets/style/index" as *;

.altButton {
  transition: all 0.3s ease;
  font-size: clamp(1rem, 1.5vw, 1.2rem);
  color: rgb(var(--m-01));
  font-weight: bold;
  display: inline-flex;
  align-items: center;

  &:hover {
    transform: translateX(-2px);
  }
  @include mobile {
    @include font-m;
  }
}
</style>
