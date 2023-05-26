<script setup lang="ts">
import useEventsBus from "@/utils/eventBus";

export type FiltersProps = string;
const props = defineProps({
  filters: {
    type: Array as PropType<FiltersProps[]>,
    required: false,
  },
});

const { emit } = useEventsBus();

const filters = ref(props.filters);
const selectedFilter = ref("Todos");

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
        @click="(e) => handleClick(e, 'Todos')"
        :class="{ active: 'Todos' === selectedFilter }"
      >
        Todos
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

  &__item {
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
      opacity: 0.6;
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
