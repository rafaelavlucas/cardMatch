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
    const filteredCards = computed(() =>
      newCards.filter((card) => card.genre.includes(clickedFilter))
    );

    const randomCards = filteredCards.value
      .sort(() => Math.random() - Math.random())
      .slice(0, 6);

    const list2Random = [...randomCards].sort(
      () => Math.random() - Math.random()
    );
    console.log(list2Random);
    list1.value.list = randomCards;
    list2.value.list = list2Random;

    resetCards();
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

  const list2Random = [...randomCards].sort(
    () => Math.random() - Math.random()
  );

  list1.value.list = randomCards;

  list2.value.list = list2Random;
};

function onEnd(evt: any) {
  const draggedElement = evt.item.__draggable_context.element;
  const toElement = evt.originalEvent.toElement.__draggable_context.element;
  const findMatchFromList1 = list1.value.list.find(
    (card) => card.name === draggedElement.name
  );

  const findMatchFromList2 = list2.value.list.find(
    (card) => card.name === toElement.name
  );

  if (
    findMatchFromList1?.name !== findMatchFromList2?.name ||
    evt.originalEvent.toElement.classList.contains("card--active")
  )
    return;

  findMatchFromList1!.matched = true;
  findMatchFromList2!.matched = true;
}

const resetCards = () => {
  [...list1.value.list].forEach((element) => {
    element.matched = false;
  });
  [...list2.value.list].forEach((element) => {
    element.matched = false;
  });
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
        :list="list1.list"
        item-key="id"
        :group="{ name: 'animals', pull: '', put: false }"
        @end="onEnd"
      >
        <template #item="{ element, index }">
          <Card
            :matched="element.matched"
            :card="element"
            class="card--active"
          />
        </template>
      </draggable>

      <draggable
        class="cardGrid__right dragArea list-group"
        draggable="false"
        @clone="() => false"
        :sort="false"
        :list="list2.list"
        item-key="id"
        group="animals"
      >
        <template #item="{ element }">
          <Card
            :matched="element.matched"
            :card="element"
            class="card--disabled"
          />
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
    gap: 2%;
    align-items: stretch;
    padding: clamp(0.5rem, 2.5vw, 2.5rem);
    border-radius: clamp(0.5rem, 2.5vw, 2.5rem);

    @include mobile {
      gap: 2vw;
      padding: 4vw;
    }
  }

  &__left {
    grid-column: 1/4;
    background: rgb(var(--neu-03));

    .sortable-ghost {
      opacity: 0;
    }

    @include mobile {
      grid-column: 1/7;
    }
  }

  &__right {
    grid-column: 4/7;

    @include mobile {
      grid-column: 1/7;
    }
  }
}
</style>
