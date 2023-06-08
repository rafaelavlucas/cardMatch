<script setup lang="ts">
interface GameTypesProps {
  title: string;
  img: string;
  link: string;
}

const gameTypes = ref<GameTypesProps[]>([
  {
    title: SHAPES_CATEGORY,
    img: "/images/categories/game1.png",
    link: "/jogos/silhuetas",
  },
  {
    title: LETTERS_CATEGORY,
    img: "/images/categories/game2.png",
    link: "/jogos/letras",
  },
  {
    title: COLORS_CATEGORY,
    img: "/images/categories/game2.png",
    link: "/jogos/cores",
  },
]);
</script>

<template>
  <CategoriesBlock :title="'Escolhe o tipo de jogo'">
    <li v-for="(game, index) in gameTypes" :key="index">
      <NuxtLink :to="game.link">
        <CardCategory :title="game.title" :img="game.img" :index="index" />
      </NuxtLink>
    </li>
  </CategoriesBlock>
</template>

<style lang="scss" scoped>
@use "assets/style/index" as *;
</style>
