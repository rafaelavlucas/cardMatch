<script setup lang="ts">
const emit = defineEmits(["reloadGame"]);
</script>

<template>
  <div class="reload">
    <p class="reload__text">Clica para jogar novamente!</p>
    <button class="reload__button" @click="$emit('reloadGame')">Jogar</button>
  </div>
</template>

<style lang="scss" scoped>
@use "assets/style/index" as *;
.reload {
  $this: &;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 2vw;
  padding: 3vw;
  transition: all 0.4s ease;

  animation: cenas 0.3s ease forwards;

  @keyframes cenas {
    0% {
      opacity: 0;
      transform: scale(0.8);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  // display: none;

  &.show {
    display: flex;
  }

  &__text {
    font-size: clamp(1rem, 1.5vw, 1.2rem);
    color: rgb(var(--neu-10));
    text-align: center;
  }
  &__button {
    font-weight: bold;
    font-size: clamp(1rem, 1.5vw, 1.2rem);
    border-radius: 32px;
    background-color: rgb(var(--neu-03));
    color: rgb(var(--neu-10));
    padding: clamp(0.4rem, 0.8vw, 0.8rem) clamp(0.8rem, 1.5vw, 2rem);
    cursor: pointer;
  }
}
</style>
