<script setup lang="ts">
import draggable from "vuedraggable";
import useEventsBus from "@/utils/eventBus";

const cards = ref([
  {
    image:
      "https://images.unsplash.com/photo-1552410260-0fd9b577afa6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    name: "Leão",
    habitat: "Selva",
  },
  {
    image:
      "https://images.unsplash.com/photo-1581852017103-68ac65514cf7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80",
    name: "Elefante",
    habitat: "Selva",
  },
  {
    image:
      "https://images.unsplash.com/photo-1635983297009-5b540eaf368d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Z2lyYWZlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60",
    name: "Girafa",
    habitat: "Selva",
  },
  {
    image:
      "https://images.unsplash.com/photo-1625265398537-abf52202a6fe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8aGlwcG98ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60",
    name: "Hipópotamo",
    habitat: "Selva",
  },
  {
    image:
      "https://images.unsplash.com/photo-1552410260-0fd9b577afa6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    name: "Tigre",
    habitat: "Selva",
  },
  {
    image:
      "https://images.unsplash.com/photo-1552410260-0fd9b577afa6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    name: "Gorila",
    habitat: "Selva",
  },
  {
    image:
      "https://images.unsplash.com/photo-1581852017103-68ac65514cf7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80",
    name: "Orca",
    habitat: "Oceano",
  },
  {
    image:
      "https://images.unsplash.com/photo-1581852017103-68ac65514cf7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80",
    name: "Baleia",
    habitat: "Oceano",
  },
]);
const list1 = ref({
  list: [...cards.value],
  dragging: true,
});
const list2 = ref({
  list: [...cards.value],
  dragging: false,
});

const { bus } = useEventsBus();

watch(
  () => bus.value.get("filter"),
  ([clickedFilter]) => {
    list1.value.list = cards.value.filter(
      (card) => card.habitat === clickedFilter
    );
    list2.value.list = cards.value.filter(
      (card) => card.habitat === clickedFilter
    );

    console.log(cards.value, list1.value.list, list2.value.list);
  }
);

onMounted(() => {
  const newCards = [...cards.value];

  const randomCards = newCards
    .sort(() => Math.random() - Math.random())
    .slice(0, 6);
  const list2Random = randomCards.sort(() => Math.random() - Math.random());

  list1.value.list = randomCards;

  list2.value.list = list2Random;

  console.log(list2Random);
});
</script>

<template>
  <Filters />

  <div class="cardGrid">
    <div class="cardGrid__wrapper grid">
      <draggable
        class="cardGrid__left dragArea list-group"
        removeCloneOnHide="true"
        :sort="false"
        @clone="cloneCard"
        :list="list1.list"
        item-key="id"
        :group="{ name: 'animals', pull: 'clone', put: false }"
        @change="log"
      >
        <template #item="{ element }">
          <Card :card="element" class="card--active" />
        </template>
      </draggable>

      <draggable
        class="cardGrid__right dragArea list-group"
        :draggable="false"
        @clone="() => false"
        :sort="false"
        :list="list2.list"
        item-key="id"
        group="animals"
      >
        <template #item="{ element }">
          <Card :card="element" class="card--disabled" />
        </template>
      </draggable>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "assets/style/index" as *;
.cardGrid {
  min-height: 100vh;
  display: flex;
  align-items: center;

  &__wrapper {
  }
  &__left,
  &__right {
    display: grid;
    grid-template-columns: repeat(3, 30%);
    gap: 2vw;
    align-items: stretch;
  }

  &__left {
    grid-column: 1/7;
    .sortable-ghost {
      opacity: 0;
    }

    // .sortable-chosen {
    //   opacity: 0;
    // }
  }

  &__right {
    grid-column: 7/13;
  }
}
</style>
