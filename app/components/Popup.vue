<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: false,
  },
  text: {
    type: String,
    required: false,
  },
});

const emit = defineEmits(["closePopup"]);
</script>

<template>
  <div class="popup">
    <div class="popup__wrapper wrapper">
      <div class="popup__container">
        <Button
          :variant="'cta-02'"
          :icon="'x'"
          :icon-size="'l'"
          class="popup__close"
          @click="$emit('closePopup')"
        />
        <article class="popup__content">
          <h3 class="popup__title font-m color-m-01">{{ title }}</h3>
          <p class="popup__text font-s color-neu-09">{{ text }}</p>
        </article>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "assets/style/index" as *;

.popup {
  position: absolute;
  z-index: 2;
  width: 100%;
  height: 100%;
  background-color: rgba(var(--neu-08), 0.6);
  top: 0;
  left: 0;
  padding: $spc-40 0;
  animation: reveal 0.3s ease backwards;

  &__wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__container {
    @include MS-03;
    border: 1px solid rgb(var(--neu-03));
    width: clamp(40rem, 50vw, 600px);
    height: 50dvh;
    @include cardRadius;
    background-color: rgb(var(--neu-01));
    padding: clamp(2rem, 5vw, 5rem);
  }

  &__close {
    position: absolute;
    right: $spc-32;
    top: $spc-32;
    z-index: 2;
  }
  &__content {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  &__title {
  }

  &__text {
    margin-top: $spc-32;
  }

  // .list-enter-active,
  // .list-leave-active {
  //   transition: all 0.5s ease;
  // }
  // .list-enter-from,
  // .list-leave-to {
  //   opacity: 0;
  //   transform: translateX(30px);
  // }
}
</style>
