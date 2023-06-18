<script setup lang="ts">
defineEmits(["reloadGame"]);
</script>

<template>
  <div class="reload">
    <p class="reload__text font-m">Clica para jogar novamente!</p>

    <Button :title="'Jogar'" :variant="'cta-01'" @click="$emit('reloadGame')" />
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

  animation: scale 0.3s ease forwards;

  @include phablet {
    gap: $spc-24;
  }

  // display: none;

  &.show {
    display: flex;
  }

  &__text {
    // font-size: clamp(1rem, 1.5vw, 1.2rem);
    color: rgb(var(--neu-10));
    text-align: center;
  }
}
</style>
