<script setup lang="ts">
import useEventsBus from "@/utils/eventBus";

interface CategoriesProps {
  title: string;
  img: string;
  link: string;
}

const { bus } = useEventsBus();

const categories = ref<CategoriesProps[]>([
  {
    title: "Animais",
    img: "/images/categories/animals6.png",
    link: "/games/animals",
  },
  {
    title: "Frutas e Vegetais",
    img: "/images/categories/fruits3.png",
    link: "/games/fruits",
  },
]);

const selectedCategory = ref<CategoriesProps | null>(null);
const selectedLevel = ref("1");

const selectCategory = (category: CategoriesProps) => {
  selectedCategory.value = category;
};

watch(
  () => bus.value.get("level"),
  ([clickedLevel]) => {
    selectedLevel.value = clickedLevel;
  }
);
</script>

<template>
  <div class="wrapper">
    <ul class="categories">
      <li v-for="(category, index) in categories" :key="index">
        <div
          class="categories__item"
          @click="selectCategory(category)"
          :class="{ active: category === selectedCategory }"
        >
          <figure class="categories__img">
            <img :src="category.img" :alt="category.title" />
          </figure>
          <h4 class="categories__title">{{ category.title }}</h4>
        </div>
      </li>
    </ul>
    <Levels class="cardGrid__levels" />
    <NuxtLink
      v-if="selectedCategory"
      :to="{ path: selectedCategory.link, query: { level: selectedLevel } }"
      >Jogar</NuxtLink
    >
  </div>
</template>

<style lang="scss" scoped>
@use "assets/style/index" as *;
.categories {
  $this: &;
  max-width: 600px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  cursor: pointer;
  @include phablet {
    grid-template-columns: repeat(2, 1fr);
  }
  @include mobile {
    grid-template-columns: 1fr;
  }
  &__item {
    @include cardRadius;
    cursor: pointer;
    transition: all 0.2s ease;
    border: 1px solid rgb(var(--neu-03));
    // font-size: clamp(1.5rem, 2vw, 2rem);
    text-align: center;
    font-weight: bold;
    min-height: 200px;
    display: grid;
    grid-template-rows: 3fr 0.8fr;
    background-color: rgb(var(--neu-01));
    overflow: hidden;
    box-shadow: 0px 0.5rem 2rem -1rem rgb(var(--neu-05));

    &:hover {
      transform: scale(1.05);
      box-shadow: 0px 1rem 2.5rem -1rem rgb(var(--neu-05));
    }

    &.active {
      border: 2px solid red;
    }
  }

  &__img {
    transition: all 0.3s ease;
    // border-bottom: 2px solid red;
    overflow: hidden;
    background-color: rgb(var(--neu-02));
    // position: absolute;
    // width: 100%;
    // height: 100%;

    // left: 0;
    top: 0;
    img {
      width: 100%;
      // height: 100%;
      // object-fit: cover;
      // transform: scale(1.1);
    }
    &:before {
      transition: inherit;
      // content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: black;
      opacity: 0.2;
      z-index: 1;
    }
  }

  &__title {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
    color: black;
    padding: 0 1rem;
    font-size: clamp(1.2rem, 1.2vw, 1.3rem);
  }
}
</style>
