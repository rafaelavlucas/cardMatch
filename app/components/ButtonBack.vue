<script setup lang="ts">
const router = useRouter();
</script>

<template>
  <Button :title="'Voltar'" :variant="'cta-02'" @click="router.back()" />
</template>
