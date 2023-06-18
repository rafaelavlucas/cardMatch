<script setup lang="ts">
export type ButtonVariants = "cta-01" | "cta-02" | "cta-02--alt" | "cta-icon";
export type ButtonSizes = "s" | "m" | "l";

const props = defineProps({
  title: {
    type: String,
    required: false,
  },
  altText: {
    type: String,
    required: false,
  },
  icon: {
    type: String,
    required: false,
  },
  iconSize: {
    type: String as PropType<ButtonSizes>,
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
  <NuxtLink :to="link" class="cta" :class="variant" :title="altText">
    <i :class="[`icon-${icon}`, `icon--${iconSize}`]"></i>
    <span v-if="title">{{ title }}</span>
  </NuxtLink>
</template>

<style lang="scss" scoped>
@use "assets/style/index" as *;

.cta {
  transition: all 0.3s ease;
  font-size: 1.2rem;
  font-weight: bold;
  user-select: none;

  @include mobile {
    font-size: 0.9rem;
  }

  &.cta-01 {
    background-color: rgb(var(--m-01));
    border-radius: $spc-32;

    color: rgb(var(--neu-01));

    padding: $spc-08 $spc-24;
    height: $spc-40;
    box-shadow: 0px 0.4rem 1rem -0.2rem rgb(var(--m-01));
    display: inline-flex;
    align-items: center;
    &:hover {
      box-shadow: 0px 0.3rem 0.5rem -0.2rem rgba(var(--m-01), 0.5);
      transform: translateY(2px);
    }
    @include mobile {
      // @include font-m;
      height: $spc-32;
      padding: $spc-08 $spc-16;
    }
  }

  &.cta-02 {
    color: rgb(var(--m-01));
    display: inline-flex;
    align-items: center;
    gap: $spc-08;

    span {
      transform: translateY(1px);
    }

    @include mobile {
      gap: $spc-04;
      font-size: 0.8rem;
      i {
        font-size: $spc-16;
      }
    }

    @media (hover: hover) {
      &:hover {
        opacity: 0.8;
      }
    }

    &--alt {
      @extend .cta-02;
      flex-direction: row-reverse;
    }
  }

  &.cta-icon {
    color: rgb(var(--m-01));
    display: inline-flex;
    align-items: center;
    gap: $spc-08;

    span {
      transform: translateY(1px);
    }

    @media (hover: hover) {
      &:hover {
        opacity: 0.8;
      }
    }
  }
  .icon {
    &--s {
      font-size: $spc-16;
    }
    &--m {
      font-size: $spc-24;
    }
    &--l {
      font-size: $spc-32;
    }
  }
}
</style>
