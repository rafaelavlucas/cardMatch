<template>
  <div class="card color-neu-10">
    <figure class="card__image">
      <img class="ratio-1-1" :src="card.image" :alt="card.name" />
    </figure>
    <p class="card__name">{{ card.name }}</p>
  </div>
</template>

<script setup lang="ts">
interface CardProps {
  image: string;
  name: string;
  habitat: string;
}

const props = defineProps({
  card: {
    type: Object as PropType<CardProps>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@use "assets/style/index" as *;
.card {
  $this: &;
  display: grid;
  grid-template-rows: 1fr auto;
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
    padding-top: max(0.5rem, 1.5vw);
    font-family: $font;
    font-weight: bold;
    font-size: clamp(0.5rem, 1.5vw, 1.5rem);
  }

  &--active {
    cursor: pointer;
    transition: all 0.2s ease;
    background: rgb(var(--neu-02));

    &:hover {
      transform: scale(1.1);
    }
  }

  &--disabled {
    // pointer-events: none;
    background: rgb(var(--neu-01));
    opacity: 0.8;
    filter: grayscale(100%);
    cursor: default;
    border: 1px dashed rgb(var(--neu-04));
    #{$this} {
      &__image {
        opacity: 0.8;
      }

      &__name {
        opacity: 0.4;
      }
    }
  }

  &:active {
    box-shadow: inset 0px 0px 0px 2px rgb(var(--neu-08));
    transform: scale(1.1);
  }
}
</style>
