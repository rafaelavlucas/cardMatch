<script setup lang="ts">
const showPopup = ref(false);

const router = useRouter();
const route = useRoute();
const isHp = "/";
const isGameTypes = "/jogos";

const showPopupOnce = () => {
  if (localStorage.getItem("visited")) {
    showPopup.value = false;
  } else {
    localStorage.setItem("visited", JSON.stringify(true));
    showPopup.value = true;
  }
};

onMounted(() => {
  showPopupOnce();
});
</script>
<template>
  <header class="mainNav">
    <div class="mainNav__wrapper wrapper">
      <ButtonBack class="mainNav__back" :title="'Voltar'" />

      <NuxtLink to="/" class="mainNav__logo">
        <h1 class="mainNav__title">Matchimatch</h1>
        <figure class="mainNav__logo-img">
          <img src="/images/logo.svg" alt="Logo MM" /></figure
      ></NuxtLink>

      <!-- <NuxtLink to="/">Início</NuxtLink> -->
      <Button
        class="mainNav__about"
        :altText="'Como Jogar'"
        :title="'Instruções'"
        :variant="'cta-02--alt'"
        :icon="'info'"
        @click="showPopup = true"
      />
    </div>
  </header>

  <Popup
    :state="showPopup"
    :title="'Como jogar'"
    :text="'Clica num dos cartões, e encontra o par correspondente.'"
    @closePopup="showPopup = false"
  >
    <Video :source="'/howto.mp4'" />
  </Popup>
</template>

<style lang="scss" scoped>
@use "assets/style/index" as *;

.mainNav {
  padding: $spc-08 0;
  height: $spc-72;

  @include phablet {
    height: $spc-56;
  }
  @include mobile-h {
    height: $spc-56;
  }

  &__title {
    font-size: 0;
    opacity: 0;
    position: absolute;
  }
  &__wrapper {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
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
      @include mobile-h {
        max-width: $spc-40;
      }
    }
  }

  &__about {
    grid-column: 3;
    justify-self: flex-end;
  }
  &__back {
    grid-column: 1;
    justify-self: flex-start;
  }
}
</style>
