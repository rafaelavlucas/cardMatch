<script setup lang="ts">
import AnimalsData from "@/src/gamesData/AnimalsData.json";
import FruitsData from "@/src/gamesData/FruitsData.json";
import { DataProps, CategoryTitle } from "~/types/types";
import useEventsBus from "~/utils/eventBus";

const selectedCategory = ref<CategoryTitle | null>(null);
const renderData = ref<DataProps | null>(null);

const { bus, emit } = useEventsBus();

watch(
  () => bus.value.get("category"),
  ([clickedCategory]) => {
    selectedCategory.value = clickedCategory;
    switch (selectedCategory.value?.title) {
      case "Animais":
        renderData.value = AnimalsData;
        break;

      case "Frutas e Vegetais":
        renderData.value = FruitsData;

      default:
        break;
    }
  }
);
</script>

<template>
  <Categories v-if="!selectedCategory" />
  <Category v-if="selectedCategory" :data="renderData" />
</template>
