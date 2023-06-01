<script setup lang="ts">
const showPoup = ref(false);
</script>
<template>
  <header class="mainNav">
    <div class="mainNav__wrapper wrapper">
      <ButtonBack class="mainNav__back" />

      <NuxtLink to="/" class="mainNav__logo"
        ><figure class="mainNav__logo-img">
          <img src="/images/logo.svg" alt="Logo MM" /></figure
      ></NuxtLink>

      <!-- <NuxtLink to="/">Início</NuxtLink> -->
      <Button
        class="mainNav__about"
        :altText="'Sobre'"
        :variant="'cta-02'"
        :icon="'info'"
        @click="showPoup = true"
      />
    </div>
  </header>
  <Popup
    v-if="showPoup"
    :title="'Como jogar'"
    :text="'texto'"
    @closePopup="showPoup = false"
  />
</template>

<style lang="scss" scoped>
@use "assets/style/index" as *;

.mainNav {
  padding: $spc-08 0;
  height: $spc-72;

  @include phablet {
    height: $spc-56;
  }
  &__wrapper {
    display: grid;
    grid-template-columns: $spc-24 1fr $spc-24;
    justify-items: center;
  }

  &__logo {
    grid-column: 2;
    &-img {
      max-width: $spc-56;
      display: flex;
      align-items: center;

      @include mobile {
        max-width: $spc-40;
      }
    }
  }

  &__about {
    grid-column: 3;
  }
  &__back {
    grid-column: 1;
  }
}
</style>
