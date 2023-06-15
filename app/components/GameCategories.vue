<script setup lang="ts">
import useEventsBus from "@/utils/eventBus";
import { CategoriesProps } from "~/types/types";

const { bus, emit } = useEventsBus();

const categories = ref<CategoriesProps[]>([
  {
    title: ANIMALS_CATEGORY,
    img: "/images/categories/animals6.png",
  },
  {
    title: FRUITS_CATEGORY,
    img: "/images/categories/fruits3.png",
  },
  {
    title: VEHICLES_CATEGORY,
    img: "/images/categories/vehicles.png",
  },
]);

const selectedCategory = ref<CategoriesProps | null>(null);

const selectCategory = (category: CategoriesProps) => {
  selectedCategory.value = category;

  emit("category", selectedCategory.value);
};
</script>

<template>
  <CategoriesBlock :title="'Escolhe a categoria'" :grid="3">
    <li v-for="(category, index) in categories" :key="index">
      <CardCategory
        :title="category.title"
        :img="category.img"
        :index="index"
        @click="selectCategory(category)"
      />
    </li>
  </CategoriesBlock>
</template>

<style lang="scss" scoped>
@use "assets/style/index" as *;
</style>
