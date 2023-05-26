<script setup lang="ts">
import useEventsBus from "@/utils/eventBus";
import { ref } from "vue";
import { Content } from "~/types/types";
import { useRouter } from "vue-router";
import { FiltersProps } from "./Filters.vue";

const route = useRoute();
const router = useRouter();

const selectedGame = route.path.split("/")[2];
const selectedFilter = ref("");

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

const { query } = useRoute();
const { bus } = useEventsBus();

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

const selectedCardFromList1 = ref<Content | null>(null);
const selectedCardFromList2 = ref<Content | null>(null);

const selectCard = (card: Content) => {
  selectedCardFromList1.value = card;
};

const matchCard = (card: Content) => {
  console.log(selectedCardFromList1);

  if (!selectedCardFromList1.value && !selectedCardFromList2.value) return;

  selectedCardFromList2.value = card;

  if (selectedCardFromList1.value?.name === selectedCardFromList2.value?.name) {
    selectedCardFromList1.value.matched = true;
    card.matched = true;
    selectedCardFromList1.value = null;
    selectedCardFromList2.value = null;
  } else {
    // selectedCardFromList1.value!.matched = false;
    card.matched = false;

    setTimeout(() => {
      card.matched = null;
    }, 500);
  }

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
    element.matched = null;
  });
  list2.value.list.forEach((element) => {
    element.matched = null;
  });

  selectedCardFromList1.value = null;
  selectedCardFromList2.value = null;
  isAllMatched.value = false;
};

const reloadGame = () => {
  if (selectedFilter.value) {
    const newCards = [...cards.value];
    const filteredCards = computed(() =>
      newCards.filter((card) => card.genre.includes(selectedFilter.value))
    );

    const randomCards = filteredCards.value
      .sort(() => Math.random() - Math.random())
      .slice(0, 6);

    const list2Random = [...randomCards].sort(
      () => Math.random() - Math.random()
    );

    list1.value.list = randomCards;
    list2.value.list = list2Random;
  } else {
    loadCards();
  }
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
