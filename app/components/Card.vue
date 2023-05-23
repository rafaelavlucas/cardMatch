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
  <div class="card" :class="{ matched: card.matched }">
    <div class="card__wrapper color-neu-10 bg-neu-01">
      <span class="card__letter">{{ card.letter }}</span>
      <figure class="card__image">
        <img :src="card.image" :alt="card.name" />
      </figure>

      <p class="card__name">{{ card.name }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "assets/style/index" as *;

.card {
  $this: &;
  padding: clamp(0.2rem, 0.7vw, 0.7rem);

  &__wrapper {
    pointer-events: none;
    @include cardRadius;
    display: grid;
    grid-template-rows: 1fr clamp(0.5rem, 3.5vw, 3.5rem);

    // padding: clamp(0.5rem, 1vw, 1rem);
    padding: 10%;
    isolation: isolate;
    position: relative;
    user-select: none;

    @include mobile {
      // padding: min(2vw, 4rem);
      grid-template-rows: 1fr clamp(1rem, 3.5vw, 3.5rem);
    }
  }

  // &:before {
  //   content: "";
  //   width: 100%;
  //   height: 100%;
  //   background-color: red;
  //   position: absolute;
  //   border-radius: inherit;
  //   z-index: -1;
  //   opacity: 0;
  // }

  &__image {
    transition: transform 0.3s ease;
    pointer-events: none;
    border-radius: clamp(0.1rem, 0.8vw, 0.5rem);
    overflow: hidden;
    grid-row: 1;
    grid-column: 1;
    @include mobile {
      img {
        max-height: 60px;
        object-fit: contain;
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
    font-size: clamp(0.5rem, 1.2vw, 1rem);
    align-self: end;
    word-break: break-word;
    hyphens: auto;
    grid-row: 2;
    grid-column: 1;

    @include mobile {
      font-size: clamp(0.5rem, 2.5vw, 2.5rem);
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

    @include mobile {
      // font-size: 10vw;
    }
  }

  &--active {
    #{$this} {
      &__wrapper {
        @include MS-02;
        cursor: pointer;
        transition: all 0.2s ease;
        border: 1px solid rgb(var(--neu-03));
        &:hover {
          @include MS-03;
          transform: scale(1.05);
        }
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

    &:active {
      cursor: grab;
    }
    &:hover {
      cursor: pointer;
      #{$this}__wrapper {
        transform: scale(1.05);
        box-shadow: 0px 1rem 2.5rem -1rem rgb(var(--neu-05));
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
        opacity: 0.4;
      }

      &__name {
        opacity: 0.4;
      }
    }
    &.matched {
      #{$this} {
        &__wrapper {
          opacity: 1;
          filter: none;
          background: rgb(var(--add-01), 0.15);
          border: 2px solid rgb(var(--add-01));
          pointer-events: none;
          animation: test 0.3s 0s ease backwards;
          z-index: 2;

          &:before {
            content: "✓";
            width: clamp(1rem, 2vw, 2rem);
            height: clamp(1rem, 2vw, 2rem);
            font-size: clamp(1rem, 1.8vw, 2rem);
            position: absolute;
            background: rgb(var(--add-01));
            color: white;
            opacity: 1;
            left: 3%;
            top: 3%;
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

      @keyframes test {
        80% {
          transform: scale(1.2);
          border: 8px solid rgb(var(--add-01));
          box-shadow: 0px 0.5rem 2rem -1rem rgb(var(--add-01));
          z-index: 3;
        }
        100% {
          transform: scale(1);
          border: 2px solid rgb(var(--add-01));
          box-shadow: none;
          z-index: 3;
        }
      }
    }

    &[data-level="2"] {
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

    &[data-level="3"] {
      #{$this} {
        &__image {
          visibility: hidden;
        }
        &__letter {
          display: flex;
        }
      }

      &.matched {
        #{$this} {
          &__image {
            visibility: visible;
            transform: scale(0.7);
            top: -16%;
            @include mobile {
              transform: scale(0.6);
              top: -20%;
            }
          }

          &__letter {
            // color: white;
            // background-color: rgba(var(--neu-01), 0.5);
            // border-radius: 50%;
            // transform: scale(0.5);
            font-size: 3vw;
            bottom: -8%;
            align-self: end;
            @include mobile {
              font-size: 6vw;
              bottom: 0%;
            }
          }
        }
      }
    }
  }

  &.sortable-chosen,
  &.sortable-ghost {
    cursor: grab;

    #{$this}__wrapper {
      transition: none;
      box-shadow: inset 0px 0px 0px 4px rgb(var(--m-01));
      transform: scale(1.05);
      cursor: grab;
      border: none;
    }
  }

  &.sortable-ghost {
    opacity: 0;
  }
}
</style>
