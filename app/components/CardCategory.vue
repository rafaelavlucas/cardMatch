<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: false,
  },
});
</script>

<template>
  <div class="cardCategory">
    <figure class="cardCategory__img">
      <img :src="img" :alt="title" />
    </figure>
    <h4 class="cardCategory__title">{{ title }}</h4>
  </div>
</template>

<style lang="scss" scoped>
@use "assets/style/index" as *;

.cardCategory {
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
    box-shadow: 0px 0px 0px 4px rgb(var(--m-01));
  }

  &__img {
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
