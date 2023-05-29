<script setup lang="ts">
const router = useRouter();
</script>

<template>
  <div class="wrapper">
    <Button :title="'Voltar'" :variant="'cta-02'" @click="router.back()" />
  </div>
</template>
