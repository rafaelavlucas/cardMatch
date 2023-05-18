<script setup lang="ts">
import { ref } from "vue";
import useEventsBus from "@/utils/eventBus";
import { LevelsProps } from "~/types/types";
import { useRouter } from "vue-router";

const props = defineProps({
  title: String,
  levels: {
    type: String,
    required: false,
  },
});

const route = useRoute();
const router = useRouter();
const { emit } = useEventsBus();

const selectedLevel = ref(route.query.level || "1");
const levels: LevelsProps[] = ["1", "2", "3"];

const handleClick = (level: LevelsProps) => {
  selectedLevel.value = level;

  emit("level", selectedLevel.value);

  if (!route.query.level) return;

  router.push({
    path: route.path,
    query: {
      level: selectedLevel.value,
    },
  });
};
</script>

<template>
  <div class="levels">
    <h6 class="levels__title font-s color-neu-07">{{ props.title }}</h6>
    <ul class="levels__items">
      <li v-for="(level, index) in levels" :key="index">
        <button
          class="levels__button"
          :class="{ active: level === selectedLevel }"
          @click="handleClick(level)"
        >
          {{ level }}
        </button>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
@use "assets/style/index" as *;
.levels {
  $this: &;
  margin-top: 4vh;
  text-align: center;
  &__title {
    margin-bottom: $spc-16;
  }
  &__items {
    display: flex;
    gap: $spc-16;
    align-items: center;
    justify-content: center;
  }
  &__button {
    // @include MS-01;
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
    border-color: rgb(var(--neu-03));

    @include mobile {
    }

    &:hover {
      border-color: rgb(var(--neu-05));
    }
    &.active {
      border-color: rgb(var(--m-01));
      color: rgb(var(--m-01));
      // pointer-events: none;
    }
  }
}
</style>
