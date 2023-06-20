<script setup lang="ts">
const video = ref<HTMLVideoElement | null>(null);
const props = defineProps({
  source: {
    type: String,
    required: true,
  },
});

onMounted(() => {
  if (!video.value) return;

  video.value.muted = true;
  video.value.play();
});
</script>

<template>
  <div class="video">
    <video autoplay loop ref="video">
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
