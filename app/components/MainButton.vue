<script setup lang="ts">
import { MainButtonProps } from "~/types/types";

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
  <NuxtLink :to="link" class="mainButton">
    {{ title }}
  </NuxtLink>
</template>

<style lang="scss" scoped>
@use "assets/style/index" as *;

.mainButton {
  transition: all 0.3s ease;
  background-color: rgb(var(--m-01));
  border-radius: $spc-32;
  font-size: clamp(1rem, 1.5vw, 1.2rem);
  color: rgb(var(--neu-01));
  font-weight: bold;
  padding: clamp(0.4rem, 0.8vw, 0.8rem) clamp(0.8rem, 1.5vw, 2rem);
  box-shadow: 0px 0.4rem 1rem -0.2rem rgb(var(--m-01));
  display: inline-flex;
  align-items: center;

  &:hover {
    box-shadow: 0px 0.3rem 0.5rem -0.2rem rgba(var(--m-01), 0.5);
    transform: translateY(2px);
  }
  @include mobile {
    @include font-m;
    height: $spc-48;
    padding: $spc-08 $spc-24;
  }
}
</style>
