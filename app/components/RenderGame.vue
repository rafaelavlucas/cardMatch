<script setup lang="ts">
import AnimalsData from "@/src/gamesData/AnimalsData.json";
import FruitsData from "@/src/gamesData/FruitsData.json";
import VehiclesData from "@/src/gamesData/VehiclesData.json";
import { DataProps, CategoryTitle } from "~/types/types";
import useEventsBus from "~/utils/eventBus";

const router = useRouter();
const route = useRoute();

const selectedCategory = ref<CategoryTitle | null>(
  route.query.category as string
);
// const clickedCategory = ref("");

const gameData = ref<DataProps | null>(null);

const { bus } = useEventsBus();

const loadGameDataBasedOnCategory = () => {
  switch (selectedCategory.value) {
    case ANIMALS_CATEGORY:
      gameData.value = AnimalsData;
      break;

    case FRUITS_CATEGORY:
      gameData.value = FruitsData;
      break;

    case VEHICLES_CATEGORY:
      gameData.value = VehiclesData;
      break;

    default:
      break;
  }
};

const addGameCategoryToQueryParam = () => {
  router.push({
    path: route.path,
    query: { category: selectedCategory.value },
  });
};

onMounted(() => {
  if (selectedCategory.value) {
    loadGameDataBasedOnCategory();
  }
});

watch(
  () => bus.value.get("category"),
  ([clickedCategory]) => {
    selectedCategory.value = clickedCategory.title;

    loadGameDataBasedOnCategory();
    addGameCategoryToQueryParam();
  }
);

// watch(clickedCategory, (newValue, oldValue) => {
//   clickedCategory.value = newValue;
//   loadGameDataBasedOnCategory();
//   addGameCategoryToQueryParam();
// });

watch(
  () => route.query.category,
  (category) => {
    selectedCategory.value = category as string;
    loadGameDataBasedOnCategory();
  }
);
</script>

<template>
  <GameCategories v-if="!selectedCategory" />
  <GameLayout v-if="selectedCategory" :data="gameData" />
</template>
