<script setup lang="ts">
import { DataProps } from "~/types/types";

const props = defineProps({
  card: {
    type: Object as PropType<DataProps>,
    required: true,
  },
});
</script>

<template>
  <div class="card color-neu-10 bg-neu-01" :class="{ matched: card.matched }">
    <figure class="card__image">
      <img class="ratio-1-1" :src="card.image" :alt="card.name" />
    </figure>
    <p class="card__name">{{ card.name }}</p>
  </div>
</template>

<style lang="scss" scoped>
@use "assets/style/index" as *;
.card {
  @include cardRadius;
  $this: &;
  display: grid;
  grid-template-rows: 1fr clamp(0.5rem, 3.5vw, 3.5rem);
  padding: clamp(0.5rem, 1vw, 1rem);
  isolation: isolate;
  position: relative;
  user-select: none;

  @include mobile {
    // padding: min(2vw, 4rem);
    grid-template-rows: 1fr clamp(1rem, 3.5vw, 3.5rem);
  }

  &:before {
    content: "";
    width: 100%;
    height: 100%;
    background-color: red;
    position: absolute;
    border-radius: inherit;
    z-index: -1;
    opacity: 0;
  }

  &__image {
    pointer-events: none;
    border-radius: clamp(0.1rem, 0.8vw, 0.5rem);
    overflow: hidden;
  }

  &__name {
    pointer-events: none;
    text-align: center;
    // padding-top: max(0.5rem, 1.5vw);
    font-family: $font;
    font-weight: bold;
    font-size: clamp(0.5rem, 1.2vw, 1.2rem);
    align-self: end;
    word-break: break-word;
    hyphens: auto;

    @include mobile {
      font-size: clamp(0.5rem, 2.5vw, 2.5rem);
    }
  }

  &--active {
    cursor: pointer;
    transition: all 0.2s ease;
    border: 1px solid rgb(var(--neu-03));
    box-shadow: 0px 0.5rem 2rem -1rem rgb(var(--neu-05));

    &:hover {
      transform: scale(1.05);
      box-shadow: 0px 1rem 2.5rem -1rem rgb(var(--neu-05));
    }

    &:active {
      transition: none;
      border: 4px solid rgb(var(--neu-08));
      transform: scale(1.1);
      cursor: grab;
    }

    &.matched {
      opacity: 0;
      pointer-events: none;

      #{$this} {
        &__image {
          opacity: 0;
        }

        &__name {
          opacity: 0;
        }
      }
    }
  }

  &--disabled {
    // pointer-events: none;
    background: rgb(var(--neu-01));
    opacity: 0.8;
    filter: grayscale(100%);
    cursor: default;
    border: 1px dashed rgb(var(--neu-05));
    #{$this} {
      &__image {
        opacity: 0.4;
      }

      &__name {
        opacity: 0.4;
      }
    }

    &.matched {
      opacity: 1;
      filter: none;
      background: rgb(var(--add-01), 0.15);
      border: 2px solid rgb(var(--add-01));
      pointer-events: none;
      animation: test 0.3s 0s ease backwards;
      z-index: 2;

      &:before {
        content: "✓";
        width: clamp(1rem, 2vw, 2rem);
        height: clamp(1rem, 2vw, 2rem);
        font-size: clamp(1rem, 1.8vw, 2rem);
        position: absolute;
        background: rgb(var(--add-01));
        color: white;
        opacity: 1;
        left: 3%;
        top: 3%;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1;
      }

      #{$this} {
        &__image {
          opacity: 1;
        }

        &__name {
          opacity: 1;
          color: rgb(var(--add-01));
        }
      }

      @keyframes test {
        80% {
          transform: scale(1.2);
          border: 8px solid rgb(var(--add-01));
          box-shadow: 0px 0.5rem 2rem -1rem rgb(var(--add-01));
          z-index: 3;
        }
        100% {
          transform: scale(1);
          border: 2px solid rgb(var(--add-01));
          box-shadow: none;
          z-index: 3;
        }
      }
    }
  }

  //faz no css para teres list1 e mete este matched la dentro

  //faz no css para teres list2 e mete este matched la dentro
}
</style>
