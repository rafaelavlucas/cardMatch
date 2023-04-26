<template>
  <ul class="filters">
    <li v-for="(item, index) in filters" :key="index">
      <button class="filters__item" @click="handleClick">
        {{ item.title }}
      </button>
    </li>
  </ul>
</template>

<script setup lang="ts">
import useEventsBus from "@/utils/eventBus";

interface FiltersProps {
  title: string;
}

const { emit } = useEventsBus();

// const props = defineProps({
//   filters: {
//     type: Object as PropType<FiltersProps>,
//     required: true,
//   },
// });

const filters = ref<FiltersProps[]>([
  { title: "Selva" },
  { title: "Quinta" },
  { title: "Oceano" },
]);

const handleClick = (e: Event) => {
  const target = e.currentTarget as HTMLButtonElement;
  emit("filter", target.innerText);
};
</script>

<style lang="scss" scoped>
@use "assets/style/index" as *;
.filters {
  $this: &;
  display: flex;
  gap: clamp(0.4rem, 1vw, 1rem);
  align-items: center;
  justify-content: center;

  &__item {
    font-family: $font;
    font-weight: bold;
    font-size: clamp(1rem, 1.5vw, 1.2rem);
    border-radius: 32px;
    background-color: rgb(var(--neu-08));
    color: rgb(var(--neu-01));
    padding: clamp(0.4rem, 0.8vw, 0.8rem) clamp(0.8rem, 1.5vw, 2rem);
    cursor: pointer;

    &:hover {
      opacity: 0.6;
    }
  }
}
</style>
