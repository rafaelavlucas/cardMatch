<script setup lang="ts">
import cardsDataAnimals from "@/assets/cardsDataAnimals.json";
import { FiltersProps } from "~/types/types";

const filters: FiltersProps[] = ["Floresta", "Quinta", "Oceano", "Aves"];
</script>

<template>
  <CardGrid :data="cardsDataAnimals" :filters="filters" :level="'3'"></CardGrid>

  <!-- <Test /> -->
</template>
