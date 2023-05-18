<script setup lang="ts">
import { ref } from "vue";
import useEventsBus from "@/utils/eventBus";
import { LevelsProps } from "~/types/types";

const { emit } = useEventsBus();

const levels: LevelsProps[] = ["1", "2", "3"];

const props = defineProps({
  levels: {
    type: String,
    required: false,
  },
});

const selectedLevel = ref("1");

const handleClick = (item: string) => {
  selectedLevel.value = item;
  emit("level", selectedLevel.value);
};
</script>

<template>
  <div class="wrapper">
    <div class="levels">
      <h6 class="levels__text">Nível</h6>
      <ul class="levels__items">
        <li v-for="(item, index) in levels" :key="index">
          <button
            class="levels__button"
            :class="{ active: item === selectedLevel }"
            @click="handleClick(item)"
          >
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
  &__text {
    margin-bottom: $spc-16;
    color: rgb(var(--neu-06));
    font-size: 1rem;
  }
  &__items {
    display: flex;
    gap: $spc-16;
    align-items: center;
    justify-content: center;
  }
  &__button {
    @include MS-02;
    transition: all 0.2s ease;
    font-weight: bold;
    font-size: 1rem;
    border-radius: 50%;
    background-color: rgb(var(--neu-01));
    color: rgb(var(--neu-08));
    height: $spc-40;
    width: $spc-40;
    cursor: pointer;
    border: 2px solid transparent;

    @include mobile {
    }

    &:hover {
      border-color: rgb(var(--neu-04));
    }
    &.active {
      border-color: rgb(var(--m-01));
      color: rgb(var(--m-01));
      // pointer-events: none;
    }
  }
}
</style>
