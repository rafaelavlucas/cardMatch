<script setup lang="ts">
import cardsDataFruits from "@/assets/cardsDataFruits.json";
import { FiltersProps } from "~/types/types";

const filters: FiltersProps[] = ["Frutas", "Vegetais"];
</script>

<template>
  <CardGrid :data="cardsDataFruits" :filters="filters" :level="'3'" />
  <!-- <Test /> -->
</template>
