<script setup lang="ts">
import draggable from "vuedraggable";
import useEventsBus from "@/utils/eventBus";
import { ref } from "vue";
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
  level: {
    type: String,
    required: false,
  },
});

const { query } = useRoute();
const { bus } = useEventsBus();

const selectedLevel = ref(query.level || "1");

const cards = ref(props.data);

const list1 = ref({
  list: [...cards.value],
  dragging: true,
});
const list2 = ref({
  list: [...cards.value],
  dragging: false,
});
const isAllMatched = ref(false);

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

const onEnd = (evt: any) => {
  const draggedElement = evt.item.__draggable_context.element;
  console.log(evt);
  const toElement = evt.originalEvent.srcElement.__draggable_context?.element;

  if (!toElement) return;

  const findMatchFromList1 = list1.value.list.find(
    (card) => card.name === draggedElement.name
  );
  const findMatchFromList2 = list2.value.list.find(
    (card) => card.name === toElement.name
  );
  console.log(findMatchFromList1, findMatchFromList2);
  if (findMatchFromList1?.name !== findMatchFromList2?.name) return;

  findMatchFromList1!.matched = true;

  const areAllCardsMatched = (list: any[]) => {
    return list.every((card) => card.matched);
  };

  const allCardsInList1Matched = areAllCardsMatched(list1.value.list);

  if (allCardsInList1Matched) {
    console.log("YAY");
    isAllMatched.value = true;
  }
};

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

const handleFilters = (clickedFilter: FiltersProps) => {
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
};

watch(
  () => bus.value.get("filter"),
  ([clickedFilter]: [clickedFilter: FiltersProps]) => {
    handleFilters(clickedFilter);
  }
);
watch(
  () => bus.value.get("level"),
  ([clickedLevel]) => {
    selectedLevel.value = clickedLevel;

    reloadGame();
  }
);

onMounted(() => {
  loadCards();
});
</script>

<template>
  <div :ref="'refReload'" class="cardGrid" :level="selectedLevel">
    <div class="wrapper">
      <Filters class="cardGrid__filters" :filters="filters" v-if="filters" />
      <div class="justGrid">
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
              :data-level="selectedLevel"
              class="card--disabled"
            />
          </template>
        </draggable>
      </div>
      <Levels class="cardGrid__levels" :title="'Nível'" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "assets/style/index" as *;
.cardGrid {
  min-height: calc(100vh - $spc-72);
  padding: $spc-40 0;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  @include mobile {
    min-height: calc(100vh - $spc-56);
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
    // gap: 1.5vw;
    align-items: stretch;
    padding: clamp(0.5rem, 2vw, 1rem);
    border-radius: clamp(0.5rem, 2.5vw, 2.5rem);

    @include mobile {
      // gap: 2vw;
      padding: 4vw;
    }
  }

  &__left {
    grid-column: 1/4;
    background: rgb(var(--neu-02));

    // .sortable-ghost {
    //   opacity: 0;
    // }

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
