<script setup lang="ts">
interface GameTypesProps {
  title: string;
  img: string;
  link: string;
}

const gameTypes = ref<GameTypesProps[]>([
  {
    title: "Silhuetas",
    img: "/images/categories/game1.png",
    link: "/games/shapes",
  },
  {
    title: "Letras",
    img: "/images/categories/game2.png",
    link: "/games/letters",
  },
]);
</script>

<template>
  <div class="gameTypes">
    <div class="wrapper">
      <p class="gameTypes__title font-s color-neu-07">
        Escolhe um tipo de jogo
      </p>
      <ul class="gameTypes__content">
        <li v-for="(game, index) in gameTypes" :key="index">
          <NuxtLink :to="game.link">
            <CardCategory :title="game.title" :img="game.img" />
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "assets/style/index" as *;
.gameTypes {
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

  &__btnContainer {
    margin-top: 4vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
