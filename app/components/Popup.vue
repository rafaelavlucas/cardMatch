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
  state: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["closePopup"]);

const popupRef = ref<HTMLDivElement | null>(null);

const clickOutside = ({ target }: Event) => {
  if (!popupRef.value) return;

  if (!(popupRef.value === target || popupRef.value.contains(target as Node))) {
    emit("closePopup");
  }
};
</script>

<template>
  <transition tag="div" name="fade">
    <div v-if="state" class="popup">
      <div class="popup__wrapper wrapper" @click="clickOutside">
        <div class="popup__container" ref="popupRef">
          <Button
            :variant="'cta-icon'"
            :icon="'x'"
            :icon-size="'l'"
            class="popup__close"
            @click="$emit('closePopup')"
          />
          <article class="popup__content">
            <h3 class="popup__title font-m bold color-m-01">{{ title }}</h3>
            <p class="popup__text font-s color-neu-09">{{ text }}</p>
            <slot></slot>
          </article>
        </div>
      </div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
@use "assets/style/index" as *;

.popup {
  position: absolute;
  z-index: 4;
  width: 100%;
  height: 100%;
  min-height: 100dvh;
  background-color: rgba(var(--neu-09), 0.5);
  top: 0;
  left: 0;
  padding: $spc-40 0;

  // animation: reveal 0.3s ease backwards;

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
    width: clamp(40rem, 60vw, 800px);
    //    min-height: 50dvh;
    @include cardRadius;
    background-color: rgb(var(--neu-01));
    padding: clamp(3rem, 8vh, 8rem) clamp(2rem, 5vw, 5rem);
    transition: transform 0.3s cubic-bezier(0.25, 0.1, 0.1, 1.33);
    @include phablet {
      padding: clamp(4rem, 5vw, 5rem) clamp(1rem, 4vw, 4rem);
    }
    @include mobile-h {
      max-height: 90vh;
      overflow: auto;
    }
  }

  &__close {
    position: absolute;
    right: $spc-32;
    top: $spc-32;
    z-index: 2;

    @include phablet {
      right: $spc-16;
      top: $spc-16;
    }

    @include mobile-h {
      right: $spc-16;
      top: $spc-16;
    }
  }
  &__content {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  &__title {
  }

  &__text {
    margin-top: $spc-24;
    line-height: normal;
  }

  &.fade-enter-active,
  &.fade-leave-active {
    transition: opacity 0.2s ease;
    .popup__container {
      transform: scale(1);
    }
  }

  &.fade-enter-from,
  &.fade-leave-to {
    opacity: 0;
    transition: opacity 0.15s ease;
    .popup__container {
      transition: transform 0.15s 0.1s ease;
      transform: scale(0.9);
    }
  }
}
</style>
