<template>
  <header class="mainNav">
    <div class="mainNav__wrapper wrapper">
      <NuxtLink to="/"
        ><figure class="mainNav__logo">
          <img src="/images/logo.svg" alt="Logo MM" /></figure
      ></NuxtLink>

      <!-- <NuxtLink to="/">Início</NuxtLink> -->
      <NuxtLink to="/about">Sobre</NuxtLink>
    </div>
  </header>
</template>

<style lang="scss" scoped>
@use "assets/style/index" as *;

.mainNav {
  padding: $spc-08 0;
  height: $spc-72;

  @include mobile {
    height: $spc-56;
  }
  &__wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__logo {
    max-width: $spc-56;
    @include mobile {
      max-width: $spc-40;
    }
  }
}
</style>
