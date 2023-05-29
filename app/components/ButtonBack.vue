<script setup lang="ts">
const router = useRouter();
const route = useRoute();
const isHp = "/";

console.log(route.path);

const handleBack = () => {
  router.back();
};
</script>

<template>
  <Button
    v-show="route.path != isHp"
    :altText="'Voltar'"
    :variant="'cta-02'"
    :icon="'icon-chevron-left'"
    @click="handleBack()"
  />
</template>
