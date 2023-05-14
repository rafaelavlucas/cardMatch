<script setup lang="ts">
interface CategoriesProps {
  title: string;
  img: string;
  link: string;
}

const categories = ref<CategoriesProps[]>([
  {
    title: "Animais",
    img: "/images/categories/animals4.jpg",
    link: "/games/animals",
  },
  {
    title: "Frutas e Vegetais",
    img: "/images/categories/animals4.jpg",
    link: "/games/fruits",
  },
  {
    title: "Objectos",
    img: "/images/categories/animals4.jpg",
    link: "",
  },
  {
    title: "Cores",
    img: "/images/categories/animals4.jpg",
    link: "",
  },
]);
</script>

<template>
  <div class="wrapper">
    <ul class="categories">
      <li v-for="(item, index) in categories" :key="index">
        <NuxtLink :to="item.link" class="categories__item">
          <figure class="categories__img">
            <img :src="item.img" :alt="item.title" />
          </figure>
          <h4 class="categories__title">{{ item.title }}</h4>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
@use "assets/style/index" as *;
.categories {
  $this: &;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  @include mobile {
    grid-template-columns: 1fr;
  }
  &__item {
    @include cardRadius;
    padding: clamp(1rem, 2vw, 2rem);
    font-size: clamp(1.5rem, 2vw, 2rem);
    text-align: center;
    font-weight: bold;
    min-height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    overflow: hidden;

    &:hover {
      #{$this}__img {
        transform: scale(1.2);

        &:before {
          opacity: 0.7;
        }
      }
    }
  }

  &__img {
    transition: all 0.3s ease;
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
      transition: inherit;
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: black;
      opacity: 0.5;
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
  }
}
</style>
