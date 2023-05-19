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
  <div class="categories">
    <div class="wrapper">
      <p class="categories__title font-s color-neu-07">Escolhe uma categoria</p>
      <ul class="categories__content">
        <li v-for="(category, index) in categories" :key="index">
          <div
            class="categories__item"
            @click="selectCategory(category)"
            :class="{ active: category === selectedCategory }"
          >
            <figure class="categories__item-img">
              <img :src="category.img" :alt="category.title" />
            </figure>
            <h4 class="categories__item-title">{{ category.title }}</h4>
          </div>
        </li>
      </ul>

      <Levels
        v-if="selectedCategory"
        class="cardGrid__levels"
        :title="'Define um nível'"
      />

      <div class="categories__btnContainer" v-if="selectedCategory">
        <MainButton
          :to="{ path: selectedCategory.link, query: { level: selectedLevel } }"
          :title="'Jogar'"
        ></MainButton>
      </div>
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
      grid-template-columns: repeat(2, 1fr);
    }
    @include mobile {
      grid-template-columns: 1fr;
    }
  }

  &__title {
    text-align: center;
    margin-bottom: 4vh;
  }
  &__item {
    @include cardRadius;
    @include MS-02;
    cursor: pointer;
    transition: transform 0.2s ease;
    border: 1px solid rgb(var(--neu-03));
    // font-size: clamp(1.5rem, 2vw, 2rem);
    text-align: center;
    font-weight: bold;
    min-height: 200px;
    display: grid;
    grid-template-rows: 3fr clamp(4rem, 8vh, 6rem);
    background-color: rgb(var(--neu-01));
    overflow: hidden;

    &:hover {
      transform: scale(1.05);
      @include MS-03;
    }

    &.active {
      border: 4px solid rgb(var(--m-01));
    }

    &-img {
      transition: all 0.3s ease;
      overflow: hidden;
      background-color: rgb(var(--neu-02));
      top: 0;
      display: flex;
      align-items: center;
      img {
        width: 100%;
        height: 30vh;
        object-fit: contain;
        max-height: 280px;
        min-height: 150px;
        @include mobile {
          max-height: 180px;
        }
      }
    }

    &-title {
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

  &__btnContainer {
    margin-top: 4vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
