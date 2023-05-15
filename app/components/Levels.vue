<script setup lang="ts">
import useEventsBus from "@/utils/eventBus";
import { LevelsProps } from "~/types/types";

const levels: LevelsProps[] = ["1", "2", "3"];

const props = defineProps({
  levels: {
    type: String,
    required: false,
  },
});

const handleClick = (e: Event) => {
  const target = e.currentTarget as HTMLButtonElement;

  const levelsButton = document.querySelectorAll(".levels__item");
  levelsButton.forEach((level) => {
    level.classList.remove("active");
  });
  target.classList.add("active");
};
</script>

<template>
  <div class="wrapper">
    <div class="levels">
      <p>Nível</p>
      <ul class="levels__items">
        <li v-for="(item, index) in levels" :key="index">
          <button class="levels__button" @click="handleClick">
            {{ item }}
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "assets/style/index" as *;
.levels {
  $this: &;
  margin-top: 4vh;
  text-align: center;

  &__items {
    display: flex;
    gap: clamp(0.4rem, 1vw, 1rem);
    align-items: center;
    justify-content: center;
  }
  &__button {
    font-family: $font;
    font-weight: bold;
    font-size: clamp(1rem, 1.5vw, 1.2rem);
    border-radius: 32px;
    background-color: rgb(var(--neu-03));
    color: rgb(var(--neu-10));
    padding: clamp(0.4rem, 0.8vw, 0.8rem) clamp(0.8rem, 1.5vw, 2rem);
    cursor: pointer;

    @include mobile {
      font-size: 0.8rem;
    }

    &:hover {
      opacity: 0.6;
    }
    &.active {
      background-color: rgb(var(--neu-08));
      color: rgb(var(--neu-01));
      // pointer-events: none;
    }
  }
}
</style>
