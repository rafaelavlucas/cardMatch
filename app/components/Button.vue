<script setup lang="ts">
export type ButtonVariants = "cta-01" | "cta-02";

const props = defineProps({
  title: {
    type: String,
    required: false,
  },
  link: {
    type: String || Function,
    required: false,
  },
  variant: {
    type: String as PropType<ButtonVariants>,
    required: false,
  },
});
</script>

<template>
  <NuxtLink :to="link" class="cta" :class="variant">
    {{ title }}
  </NuxtLink>
</template>

<style lang="scss" scoped>
@use "assets/style/index" as *;

.cta {
  transition: all 0.3s ease;
  font-size: clamp(1rem, 1.5vw, 1.2rem);
  font-weight: bold;
  &.cta-01 {
    background-color: rgb(var(--m-01));
    border-radius: $spc-32;

    color: rgb(var(--neu-01));

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

  &.cta-02 {
    color: rgb(var(--m-01));
    display: inline-flex;
    align-items: center;

    &:hover {
      transform: translateX(-2px);
    }
    @include mobile {
      @include font-m;
    }
  }
}
</style>
