<script setup lang="ts">
import { Genre } from "~/types/types";

interface CardProps {
  image: string;
  name: string;
  genre: Genre[];
  matched: boolean;
}

const props = defineProps({
  card: {
    type: Object as PropType<CardProps>,
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
  $this: &;
  display: grid;
  grid-template-rows: 1fr clamp(0.5rem, 3.5vw, 3.5rem);
  padding: min(1.2vw, 4rem);
  border-radius: clamp(0.5rem, 1.5vw, 1.5rem);
  user-select: none;

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
    font-size: clamp(0.5rem, 1.5vw, 1.5rem);
    align-self: end;
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
  }

  &--disabled {
    // pointer-events: none;
    background: rgb(var(--neu-02));
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
  }

  //faz no css para teres list1 e mete este matched la dentro
  &.matched {
    opacity: 0.3;
    pointer-events: none;
  }

  //faz no css para teres list2 e mete este matched la dentro
  &.matched {
    opacity: 1;
    filter: none;
    background-color: white;

    .card__image {
      opacity: 1;
    }
  }

  &:active {
    box-shadow: inset 0px 0px 0px 2px rgb(var(--neu-08));
    transform: scale(1.1);
  }
}
</style>
