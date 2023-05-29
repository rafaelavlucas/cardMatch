<script setup lang="ts">
import useEventsBus from "@/utils/eventBus";
import { CategoriesProps } from "~/types/types";

const { bus, emit } = useEventsBus();

const categories = ref<CategoriesProps[]>([
  {
    title: ANIMALS_CATEGORY,
    img: "/images/categories/animals6.png",
    link: "/games/animals",
  },
  {
    title: FRUITS_CATEGORY,
    img: "/images/categories/fruits3.png",
    link: "/games/fruits",
  },
]);

const selectedCategory = ref<CategoriesProps | null>(null);

const selectCategory = (category: CategoriesProps) => {
  selectedCategory.value = category;

  emit("category", selectedCategory.value);
};
</script>

<template>
  <div class="categories">
    <div class="wrapper">
      <p class="categories__title font-s color-neu-07">Escolhe a categoria</p>
      <ul class="categories__content">
        <li v-for="(category, index) in categories" :key="index">
          <CardCategory
            :title="category.title"
            :img="category.img"
            :index="index"
            @click="selectCategory(category)"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "assets/style/index" as *;
.categories {
  $this: &;

  margin: 0 auto;
  min-height: calc(100vh - $spc-72);
  padding: $spc-40 24vw;
  display: flex;
  align-items: center;
  @include laptop {
    padding: 0 12vw;
  }
  @include phablet {
    padding: 0 4vw;
  }

  @include mobile {
    padding: 0;
    min-height: calc(100vh - $spc-56);
  }

  &__content {
    max-width: 800px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
    cursor: pointer;
    margin: 0 auto;
    margin-bottom: 4vw;
    @include phablet {
      max-width: 440px;
      grid-template-columns: 1fr;
    }
  }

  &__title {
    text-align: center;
    margin-bottom: 4vh;
  }

  &__btnContainer {
    margin-top: 4vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
