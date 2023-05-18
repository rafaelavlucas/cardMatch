<script setup lang="ts">
interface CategoriesProps {
  title: string;
  img: string;
  link: string;
}

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
  // {
  //   title: "Objectos",
  //   img: "/images/categories/animals4.jpg",
  //   link: "",
  // },
  // {
  //   title: "Veículos",
  //   img: "/images/categories/animals4.jpg",
  //   link: "",
  // },
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
