<script setup lang="ts">
const props = defineProps({
  source: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="video">
    <video autoplay loop>
      <source :src="source" />
    </video>
  </div>
</template>

<style lang="scss" scoped>
@use "assets/style/index" as *;

.video {
  video {
    aspect-ratio: 16/9;
    width: 100%;
  }
}
</style>
