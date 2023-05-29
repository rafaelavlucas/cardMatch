<script setup lang="ts">
import useEventsBus from "@/utils/eventBus";
import { ref } from "vue";
import { Content, FiltersProps } from "~/types/types";

const props = defineProps({
  data: {
    type: Array as PropType<Content[]>,
    required: true,
  },
  filters: {
    type: Array as PropType<FiltersProps[]>,
    required: false,
  },
});

const route = useRoute();
const { bus } = useEventsBus();

const selectedGame = route.path.split("/")[2];
const selectedFilter = ref("");

const cards = ref<Content[]>(props.data);
const selectedCardFromList1 = ref<Content | null>(null);
const selectedCardFromList2 = ref<Content | null>(null);
const isAllMatched = ref(false);

const list1 = ref({
  list: [...cards.value],
  dragging: true,
});
const list2 = ref({
  list: [...cards.value],
  dragging: false,
});

const loadCards = ({ filter }: { filter?: string | null } = {}) => {
  const newCards = [...cards.value];

  const filteredCards = computed(() =>
    filter && filter !== ALL_TEXT
      ? filterCardsByFilterType(newCards, filter)
      : newCards
  );

  isAllMatched.value = false;

  const randomCards = getRandomCards(filteredCards.value);
  const list2Random = sortCardsRandomly(randomCards);

  list1.value.list = randomCards;
  list2.value.list = list2Random;
};

const selectCard = (card: Content) => {
  selectedCardFromList1.value = card;
};

const areAllCardsMatched = (list: Content[]) => {
  return list.every((card) => card.matched);
};

const matchCard = (card: Content) => {
  if (!selectedCardFromList1.value && !selectedCardFromList2.value) return;

  selectedCardFromList2.value = card;

  const isSameCard =
    selectedCardFromList1.value?.name === selectedCardFromList2.value?.name;

  if (isSameCard) {
    selectedCardFromList1.value!.matched = true;
    card.matched = true;
    selectedCardFromList1.value = null;
    selectedCardFromList2.value = null;
  } else {
    card.matched = false;

    setTimeout(() => {
      card.matched = null;
    }, 500);
  }

  const allCardsInList1Matched = areAllCardsMatched(list1.value.list);

  if (allCardsInList1Matched) {
    isAllMatched.value = true;
  }
};

const resetCards = () => {
  list1.value.list.forEach((element) => {
    element.matched = null;
  });
  list2.value.list.forEach((element) => {
    element.matched = null;
  });

  selectedCardFromList1.value = null;
  selectedCardFromList2.value = null;
  isAllMatched.value = false;
};

const getRandomCards = (cards: Content[]) => {
  return cards.sort(() => Math.random() - Math.random()).slice(0, 6);
};

const filterCardsByFilterType = (cards: Content[], filterValue: string) => {
  return cards.filter((card) => card.genre.includes(filterValue));
};

const sortCardsRandomly = (cards: Content[]) => {
  return [...cards].sort(() => Math.random() - Math.random());
};

const reloadGame = () => {
  loadCards({ filter: selectedFilter.value || null });
  resetCards();
};

const handleFilters = (clickedFilter: FiltersProps) => {
  loadCards({ filter: clickedFilter || null });
  resetCards();
};

watch(
  () => bus.value.get("filter"),
  ([clickedFilter]: [clickedFilter: FiltersProps]) => {
    handleFilters(clickedFilter);
    selectedFilter.value = clickedFilter;
  }
);

onMounted(() => {
  loadCards();
});
</script>

<template>
  <div :ref="'refReload'" class="cardGrid">
    <div class="wrapper">
      <Filters class="cardGrid__filters" :filters="filters" v-if="filters" />
      <div class="justGrid">
        <Reload
          v-if="isAllMatched"
          class="cardGrid__reload"
          @reload-game="reloadGame"
        />

        <ul class="cardGrid__left">
          <li v-for="(card, index) in list1.list" :key="index">
            <Card
              :matched="card.matched"
              :card="card"
              :data-game="selectedGame"
              class="card--active"
              :class="{ selected: card.name === selectedCardFromList1?.name }"
              @click="selectCard(card)"
            />
          </li>
        </ul>

        <ul class="cardGrid__right">
          <li v-for="(card, index) in list2.list" :key="index">
            <Card
              :matched="card.matched"
              :card="card"
              :data-game="selectedGame"
              class="card--disabled"
              @click="matchCard(card)"
            />
          </li>
        </ul>
      </div>
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

  @include phablet {
    min-height: calc(100vh - $spc-56);
  }

  &__reload {
    grid-row: 1;
    grid-column: 1/4;
    z-index: 1;
    @include phablet {
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
    padding: clamp(0.5rem, 1.2vw, 1rem);
    border-radius: clamp(0.5rem, 2.5vw, 2.5rem);
    justify-self: center;

    @include phablet {
      // gap: 2vw;
      padding: clamp(0.5rem, 2.5vw, 1.5rem);
      max-width: 440px;
      width: 100%;
    }
  }

  &__left {
    grid-column: 1/4;
    background: rgb(var(--neu-02));

    // .sortable-ghost {
    //   opacity: 0;
    // }

    @include phablet {
      grid-column: 1/7;
    }
  }

  &__right {
    grid-column: 4/7;

    @include phablet {
      grid-column: 1/7;
      grid-row: 2;
    }
  }
}
</style>
