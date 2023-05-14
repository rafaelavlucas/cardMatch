<script setup lang="ts">
import useEventsBus from "@/utils/eventBus";
import { FiltersProps } from "~/types/types";

// interface FiltersProps {
//   title: Genre;
// }
const props = defineProps({
  filters: {
    type: Array as PropType<FiltersProps[]>,
    required: false,
  },
});

const filters = ref(props.filters);

const { emit } = useEventsBus();
const cenas = defineEmits(["showAll"]);

const handleClick = (e: Event) => {
  const target = e.currentTarget as HTMLButtonElement;
  emit("filter", target.innerText);
  const allFilters = document.querySelectorAll(".filters__item");
  allFilters.forEach((filter) => {
    filter.classList.remove("active");
  });
  target.classList.add("active");
};
</script>

<template>
  <div class="wrapper">
    <ul class="filters">
      <li>
        <button class="filters__item active" @click="handleClick">Todos</button>
      </li>
      <li v-for="(item, index) in filters" :key="index">
        <button class="filters__item" @click="handleClick">
          {{ item }}
        </button>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
@use "assets/style/index" as *;
.filters {
  $this: &;
  display: flex;
  gap: clamp(0.4rem, 1vw, 1rem);
  align-items: center;
  justify-content: center;
  margin-bottom: 4vh;

  &__item {
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
