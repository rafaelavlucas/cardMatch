<script setup lang="ts">
import { Content } from "~/types/types";

const props = defineProps({
  card: {
    type: Object as PropType<Content>,
    required: true,
  },
});
</script>

<template>
  <div
    class="card"
    :class="{ matched: card.matched, unmatched: card.matched === false }"
    :data-color="[`${card.color}`.toLocaleLowerCase()]"
  >
    <div class="card__wrapper color-neu-10 bg-neu-01">
      <span v-if="card.letter" class="card__letter color-neu-09">{{
        card.letter
      }}</span>
      <span v-if="card.color" class="card__color color-neu-09">{{
        card.color
      }}</span>
      <figure class="card__image">
        <img :src="card.image" :alt="card.name" loading="lazy" />
      </figure>

      <p class="card__name">{{ card.name }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "assets/style/index" as *;

.card {
  $this: &;
  padding: clamp(0.3rem, 0.7vw, 0.7rem);
  // animation: scale 0.3s ease backwards;

  &__wrapper {
    // pointer-events: none;
    @include cardRadius;
    display: grid;
    grid-template-rows: 1fr clamp(0.5rem, 2.5vw, 2.5rem);

    // padding: clamp(0.5rem, 1vw, 1rem);
    padding: 10%;
    isolation: isolate;
    position: relative;
    user-select: none;

    @include phablet {
      // padding: min(2vw, 4rem);
      padding: 10% 8%;
      grid-template-rows: 1fr clamp(1.4rem, 3.5vw, 3.5rem);
    }
  }

  &__image {
    position: relative;
    transition: transform 0.3s ease;
    pointer-events: none;

    overflow: hidden;
    grid-row: 1;
    grid-column: 1;
    img {
      object-fit: contain;
    }
    @include phablet {
      img {
        max-height: 20vh;
      }
    }
    @include mobile {
      img {
        max-height: 9vh;
      }
    }
    @include mobile-h {
      img {
        max-height: 15vh;
      }
    }
  }

  &__name {
    transition: all 0.3s ease;
    pointer-events: none;
    text-align: center;
    // padding-top: max(0.5rem, 1.5vw);
    font-family: $font;
    font-weight: bold;
    font-size: clamp(0.7rem, 1.2vw, 1rem);
    align-self: end;
    word-break: break-word;
    hyphens: auto;
    grid-row: 2;
    grid-column: 1;

    @include phablet {
      font-size: clamp(0.7rem, 1.6vw, 2rem);
    }
  }

  &__letter {
    display: none;
    transition: all 0.3s ease;

    pointer-events: none;
    grid-column: 1;
    grid-row: 1;
    z-index: 1;
    font-size: clamp(2rem, 5vw, 5rem);
    font-weight: bold;
    justify-content: center;
    align-items: center;

    @include phablet {
      // font-size: 10vw;
    }
  }

  &__color {
    display: none;
    grid-column: 1;
    grid-row: 2;
    font-weight: bold;
    justify-content: center;
    align-items: flex-end;
    font-size: clamp(0.7rem, 1.2vw, 1rem);
    word-break: break-word;
    hyphens: auto;
    text-align: center;
    @include phablet {
      font-size: clamp(0.7rem, 1.6vw, 2rem);
    }
  }

  &--active {
    #{$this} {
      &__wrapper {
        @include MS-02;

        cursor: pointer;
        transition: all 0.2s ease;
        border: 1px solid rgb(var(--neu-03));
      }
    }
    &.matched {
      opacity: 0;
      pointer-events: none;

      #{$this} {
        &__image {
          opacity: 0;
        }

        &__name {
          opacity: 0;
        }
      }
    }
    &.selected,
    &.selected:hover {
      pointer-events: none;
      #{$this} {
        &__wrapper {
          transition: all 0.3s ease;
          background: rgb(var(--m-01), 0.15);
          border-color: transparent;
          box-shadow: inset 0 0 0 2px rgb(var(--m-01));
        }
      }
    }

    &:active {
      cursor: grab;
    }

    &:hover {
      cursor: pointer;
      #{$this}__wrapper {
        //  transform: scale(1.05);
        @include shadowHover;

        @include phablet {
          transform: scale(1);
        }
      }
    }
  }

  &--disabled {
    #{$this} {
      &__wrapper {
        opacity: 0.8;
        filter: grayscale(100%);
        cursor: default;
        border: 1px dashed rgb(var(--neu-05));
      }
      &__image {
        opacity: 0.6;
      }

      &__name {
        opacity: 0.5;
      }
    }
    &.matched {
      pointer-events: none;
      #{$this} {
        &__wrapper {
          opacity: 1;
          filter: none;
          background: rgb(var(--add-01), 0.15);
          border-color: transparent;
          // border: 2px solid rgb(var(--add-01));
          pointer-events: none;
          animation: success 0.3s 0s ease both;
          z-index: 2;

          &:before {
            content: "\e92c";
            font-family: "feather" !important;
            width: clamp(1rem, 2vw, 2rem);
            height: clamp(1rem, 2vw, 2rem);
            font-size: clamp(1rem, 1.8vw, 2rem);
            position: absolute;
            // background: rgb(var(--add-01));
            color: rgb(var(--add-01));
            opacity: 1;
            left: 3%;
            top: 2.5%;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1;
          }
        }
        &__image {
          opacity: 1;
        }

        &__name {
          opacity: 1;
          color: rgb(var(--add-01));
        }
      }

      @keyframes success {
        80% {
          transform: scale(1.1);
          border-color: transparent;
          box-shadow: 0 0 0 4px rgb(var(--add-01));
          z-index: 3;
        }
        100% {
          transform: scale(1);
          border-color: transparent;
          box-shadow: 0 0 0 2px rgb(var(--add-01));
          z-index: 3;
        }
      }
    }
    &.unmatched {
      #{$this} {
        &__wrapper {
          transition: all 0.3s ease;
          background: rgb(var(--add-02), 0.15);
          border-color: transparent;
          box-shadow: inset 0px 0px 0px 2px rgb(var(--add-02));
          filter: grayscale(0);
          animation: error 0.3s 0s ease backwards;
        }
      }
      @keyframes error {
        40% {
          transform: translateX(4px);
        }
        60% {
          transform: translateX(-4px);
        }
        80% {
          transform: translateX(4px);
        }

        100% {
          transform: translateX(0px);
        }
      }
    }

    &[data-game="silhuetas"] {
      #{$this} {
        &__image {
          filter: contrast(0%);
        }
      }
      &.matched {
        #{$this} {
          &__image {
            filter: contrast(100%);
          }
        }
      }
    }

    &[data-game="letras"] {
      #{$this} {
        &__image {
          visibility: hidden;
        }
        &__letter {
          display: flex;
          bottom: -13%;
        }
        &__name {
          opacity: 0;
        }
      }

      &.matched {
        #{$this} {
          &__image {
            visibility: visible;
            transform: scale(0.7);
            top: -16%;
            @include phablet {
              transform: scale(0.6);
              top: -20%;
            }
          }

          &__letter {
            // color: white;
            // background-color: rgba(var(--neu-01), 0.5);
            // border-radius: 50%;
            // transform: scale(0.5);
            font-size: clamp(1.5rem, 2.5vw, 2.5rem);
            bottom: 0%;
            align-self: end;
            transform: none;
            @include phablet {
              // font-size: 6vw;
              bottom: 0%;
            }
          }

          &__name {
            opacity: 1;
          }
        }
      }
    }

    &[data-game="cores"] {
      #{$this} {
        &__wrapper {
          filter: none !important;
          opacity: 1;
          // background-color: purple;
          // grid-template-rows: 1fr auto;
          // gap: 10%;

          &:after {
            transition: all 0.3s ease;
            content: "";
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            border-radius: clamp(0.3rem, 0.8vw, 0.8rem);
            // transform: translate(-50%, -50%);

            z-index: -1;
            grid-row: 1/2;
            grid-column: 1/2;
          }
        }
        &__image {
          // visibility: hidden;
          opacity: 0;
        }
        &__name {
          opacity: 0;
        }
        &__color {
          display: flex;
        }
      }

      &.matched {
        #{$this} {
          &__wrapper {
            &:after {
              grid-row: 2/3;
              height: 100%;
            }
          }
          &__image {
            opacity: 1;
            visibility: visible;
            transform: scale(0.7);
            top: -16%;
            @include phablet {
              transform: scale(0.6);
              top: -20%;
            }
          }

          &__color {
            // color: white;
            // background-color: rgba(var(--neu-01), 0.5);
            // border-radius: 50%;
            // transform: scale(0.5);
            // font-size: 3vw;
            // bottom: -8%;
            // align-self: end;
            // transform: none;
            align-items: center;
            color: white;
          }

          &__name {
            opacity: 1;
            grid-row: 1;
            bottom: 10%;
          }
        }
      }

      &[data-color="roxo"] {
        #{$this}__wrapper:after {
          background-color: #8539ab;
        }
      }
      &[data-color="vermelho"] {
        #{$this}__wrapper:after {
          background-color: #ea3030;
        }
      }
      &[data-color="amarelo"] {
        #{$this}__wrapper:after {
          background-color: #ffe127;
        }
      }
      &[data-color="azul"] {
        #{$this}__wrapper:after {
          background-color: #277dc8;
        }
      }
      &[data-color="verde"] {
        #{$this}__wrapper:after {
          background-color: #249f40;
        }
      }
      &[data-color="laranja"] {
        #{$this}__wrapper:after {
          background-color: #ff861f;
        }
      }
      &[data-color="rosa"] {
        #{$this}__wrapper:after {
          background-color: #f065a5;
        }
      }
      &[data-color="castanho"] {
        #{$this}__wrapper:after {
          background-color: #8c592e;
        }
      }
      &[data-color="cinzento"] {
        #{$this}__wrapper:after {
          background-color: #828282;
        }
      }
      &[data-color="preto"] {
        #{$this}__wrapper:after {
          background-color: black;
        }
      }
      &[data-color="branco"] {
        #{$this}__wrapper:after {
          background-color: white;
          box-shadow: 0px 0px 0px 1px rgb(var(--neu-03));
        }
      }

      &[data-color="branco"],
      &[data-color="amarelo"] {
        #{$this}__color {
          color: rgb(var(--neu-09));
        }
      }
    }
  }
  &[data-game="cores"] {
    @include mobile {
      img {
        max-height: 25vh;
      }
    }
    @include mobile-h {
      img {
        max-height: 19vh;
      }
    }
  }

  &.anime {
    animation: scale 0.3s ease backwards;
  }
}
</style>
