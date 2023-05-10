<script setup lang="ts">
interface CategoriesProps {
  title: string;
  img: string;
  link: string;
}

const categories = ref<CategoriesProps[]>([
  {
    title: "Animais",
    img: "/images/categories/animals3.jpg",
    link: "/games/animals",
  },
  {
    title: "Frutas e Vegetais",
    img: "/images/categories/fruits.jpeg",
    link: "",
  },
  {
    title: "Objectos",
    img: "/images/dog.png",
    link: "",
  },
  {
    title: "Cores",
    img: "/images/dog.png",
    link: "",
  },
]);
</script>

<template>
  <header>
    <div class="categories">
      <div
        v-for="(item, index) in categories"
        :key="index"
        class="categories__item"
      >
        <figure class="categories__img">
          <img :src="item.img" :alt="item.title" />
        </figure>
        <NuxtLink :to="item.link" class="categories__link">{{
          item.title
        }}</NuxtLink>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.categories {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  &__img {
    position: absolute;
    width: 100%;
    height: 100%;

    left: 0;
    top: 0;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    &:before {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: black;
      opacity: 0.5;
      z-index: 1;
    }
  }
  &__item {
    min-height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }

  &__link {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
  }
}
</style>
