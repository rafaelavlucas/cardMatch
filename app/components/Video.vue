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
  margin-top: $spc-24;
  video {
    width: 100%;

    @include mobile-h {
      max-height: 180px;
    }
  }
}
</style>
