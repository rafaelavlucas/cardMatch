<script setup lang="ts">
import useEventsBus from "@/utils/eventBus";
import { FiltersProps } from "~/types/types";

const props = defineProps({
  filters: {
    type: Array as PropType<FiltersProps[]>,
    required: false,
  },
});

const { emit } = useEventsBus();

const filters = ref(props.filters);
const selectedFilter = ref(ALL_TEXT);

const handleClick = ({ currentTarget }: Event, item: string) => {
  const target = currentTarget as HTMLButtonElement;
  emit("filter", target.innerText);
  selectedFilter.value = item;
};
</script>

<template>
  <ul class="filters">
    <li>
      <button
        class="filters__item"
        @click="(e) => handleClick(e, ALL_TEXT)"
        :class="{ active: ALL_TEXT === selectedFilter }"
      >
        {{ ALL_TEXT }}
      </button>
    </li>
    <li v-for="(item, index) in filters" :key="index">
      <button
        class="filters__item"
        @click="(e) => handleClick(e, item)"
        :class="{ active: item === selectedFilter }"
      >
        {{ item }}
      </button>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
@use "assets/style/index" as *;
.filters {
  $this: &;
  display: flex;
  gap: clamp(0.4rem, 1vw, 1rem);
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 4vh;
  animation: reveal 0.3s ease backwards;

  &__item {
    transition: all 0.2s ease;
    font-family: $font;
    font-weight: bold;
    font-size: clamp(1rem, 1.5vw, 1.2rem);
    border-radius: $spc-32;
    background-color: rgb(var(--neu-03));
    color: rgb(var(--neu-10));
    padding: clamp(0.4rem, 0.8vw, 0.8rem) clamp(0.8rem, 1.5vw, 2rem);
    cursor: pointer;

    @include mobile {
      font-size: 0.8rem;
    }

    &:hover {
      // opacity: 0.6;
      // background-color: rgb(var(--neu-01));
      // color: rgb(var(--m-01));
      box-shadow: inset 0px 0px 0px 2px rgb(var(--m-01));
    }
    &.active {
      background-color: rgb(var(--m-01));
      // box-shadow: 0px 0px 0px 2px rgb(var(--m-01));
      color: rgb(var(--neu-01));
      // pointer-events: none;
    }
  }
}
</style>
