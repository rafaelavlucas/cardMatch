<script setup lang="ts">
import { CategoriesProps, Content } from "~/types/types";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  grid: {
    type: Number,
    required: false,
  },
});
</script>

<template>
  <div class="categoriesBlock" :data-grid="grid">
    <div class="wrapper">
      <p class="categoriesBlock__title font-m color-neu-07">{{ title }}</p>
      <ul class="categoriesBlock__content">
        <slot></slot>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "assets/style/index" as *;

.categoriesBlock {
  $this: &;
  margin: 0 auto;
  min-height: calc(100dvh - $spc-72);
  padding: $spc-40 24vw;
  display: flex;
  align-items: center;
  @include laptop {
    padding: 0 12vw;
  }
  @include phablet {
    padding: 0 4vw;
  }

  @include mobile {
    padding: 0;
    min-height: calc(100dvh - $spc-56);
  }

  &__content {
    max-width: 800px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
    cursor: pointer;
    margin: 0 auto;
    margin-bottom: 4vw;
    @include phablet {
      max-width: 440px;
      grid-template-columns: 1fr;
    }
  }

  &__title {
    text-align: center;
    margin-bottom: 4vh;
    animation: reveal 0.3s ease backwards;
  }

  &__btnContainer {
    margin-top: 4vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &[data-grid="2"] {
    #{$this}__content {
      max-width: 800px;
      grid-template-columns: repeat(2, 1fr);
      @include phablet {
        max-width: 400px;
        grid-template-columns: 1fr;
      }
    }
  }
  &[data-grid="3"] {
    padding-left: 10vw;
    padding-right: 10vw;
    #{$this}__content {
      max-width: 1000px;
      grid-template-columns: repeat(3, 1fr);

      @include phablet {
        max-width: 400px;
        grid-template-columns: 1fr;
      }
    }
    .wrapper {
      padding: 0;
    }
  }
}
</style>
