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
  index: {
    type: Number,
    required: true,
  },
});
</script>

<template>
  <div
    class="cardCategory"
    :style="{ 'animation-delay': 0.2 * index + 0.4 + 's' }"
  >
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
  border: 1px solid rgb(var(--neu-03));
  // font-size: clamp(1.5rem, 2vw, 2rem);
  text-align: center;
  font-weight: bold;
  min-height: 200px;
  display: grid;
  grid-template-rows: 3fr clamp(4rem, 8vh, 6rem);
  background-color: rgb(var(--neu-01));
  overflow: hidden;
  transition: all 0.3s ease;
  animation: reveal 0.3s ease both;

  @include phablet {
    min-height: unset;
    grid-template-rows: 3fr clamp(3rem, 6vh, 6rem);
  }

  &:hover {
    transform: scale(1.05);

    @include shadowHover;
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
      @include phablet {
        max-height: 140px;
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
    font-size: clamp(1.2rem, 1.2vw, 1.2rem);
  }
}
</style>
