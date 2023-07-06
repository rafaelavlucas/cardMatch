<script setup lang="ts">
const router = useRouter();
const route = useRoute();
const isHp = "/";

const handleBack = () => {
  router.back();
};
</script>

<template>
  <Button
    v-show="route.path != isHp"
    :altText="'Voltar'"
    :variant="'cta-02'"
    :icon="'chevron-left'"
    @click="handleBack()"
  />
</template>
