<script setup lang="ts">
import draggable from "vuedraggable";
import useEventsBus from "@/utils/eventBus";
import cardsData from "@/assets/cardsData.json";

console.log(cardsData);
const cards = ref(cardsData);
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
    const newCards = [...cards.value];
    const filteredCards = newCards.filter((card) =>
      card.genre.includes(clickedFilter)
    );

    const randomCards = filteredCards
      .sort(() => Math.random() - Math.random())
      .slice(0, 6);

    const list2Random = randomCards.sort(() => Math.random() - Math.random());

    list1.value.list = randomCards;
    list2.value.list = list2Random;

    console.log(cards.value, list1.value.list, list2.value.list);
  }
);

onMounted(() => {
  loadCards();
});

const loadCards = () => {
  const newCards = [...cards.value];

  const randomCards = newCards
    .sort(() => Math.random() - Math.random())
    .slice(0, 6);
  const list2Random = randomCards.sort(() => Math.random() - Math.random());

  list1.value.list = randomCards;

  list2.value.list = list2Random;
};
</script>

<template>
  <div class="cardGrid">
    <Filters class="cardGrid__filters" />
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
  flex-direction: column;
  justify-content: center;

  &__wrapper {
    margin-bottom: auto;
  }

  &__filters {
    margin-top: auto;
  }
  &__left,
  &__right {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5vw;
    align-items: stretch;
  }

  &__left {
    grid-column: 1/7;
    margin-right: 0.5vw;
    .sortable-ghost {
      opacity: 0;
    }

    // .sortable-chosen {
    //   opacity: 0;
    // }
  }

  &__right {
    grid-column: 7/13;
    margin-left: 0.5vw;
  }
}
</style>
