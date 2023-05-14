<script setup lang="ts">
import draggable from "vuedraggable";
import useEventsBus from "@/utils/eventBus";
import { reactive, watchEffect, ref } from "vue";
import { DataProps, FiltersProps } from "~/types/types";

const props = defineProps({
  data: {
    type: Array as PropType<DataProps[]>,
    required: true,
  },
  filters: {
    type: Array as PropType<FiltersProps[]>,
    required: false,
  },
});
const cards = ref(props.data);

const list1 = ref({
  list: [...cards.value],
  dragging: true,
});
const list2 = ref({
  list: [...cards.value],
  dragging: false,
});

const { bus } = useEventsBus();

let isAllMatched = ref(false);

watch(
  () => bus.value.get("filter"),
  ([clickedFilter]) => {
    if (clickedFilter === "Todos") {
      loadCards();
      resetCards();
    } else {
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

      list1.value.list = randomCards;
      list2.value.list = list2Random;

      resetCards();
    }
  }
);

onMounted(() => {
  loadCards();
});

const loadCards = () => {
  isAllMatched.value = false;
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
  console.log(evt.originalEvent.toElement.__draggable_context);
  if (!evt.originalEvent.toElement.__draggable_context) return;
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

  const areAllCardsMatched = (list: any[]) => {
    return list.every((card) => card.matched);
  };
  const allCardsInList1Matched = areAllCardsMatched(list1.value.list);

  if (allCardsInList1Matched) {
    console.log("YAY");
    isAllMatched.value = true;
  }
}

const resetCards = () => {
  list1.value.list.forEach((element) => {
    element.matched = false;
  });
  list2.value.list.forEach((element) => {
    element.matched = false;
  });
};

const reloadGame = () => {
  loadCards();
  resetCards();
};
</script>

<template>
  <div :ref="'refReload'" class="cardGrid">
    <Filters class="cardGrid__filters" :filters="filters" v-if="filters" />
    <div class="cardGrid__wrapper grid">
      <Reload
        v-if="isAllMatched"
        class="cardGrid__reload"
        @reload-game="reloadGame"
      />

      <draggable
        class="cardGrid__left dragArea list-group"
        removeCloneOnHide="true"
        :sort="false"
        :list="list1.list"
        item-key="id"
        :group="{ name: 'cards', pull: '', put: false }"
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
        group="cards"
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
    // margin-bottom: auto;
  }

  &__filters {
    // margin-top: auto;
  }

  &__reload {
    grid-row: 1;
    grid-column: 1/4;
    z-index: 1;
    @include mobile {
      grid-column: 1/7;
    }
  }

  &__left,
  &__right {
    display: grid;
    grid-row: 1;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5vw;
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
    background: rgb(var(--neu-02));

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
      grid-row: 2;
    }
  }
}
</style>
