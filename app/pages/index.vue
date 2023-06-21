<script setup lang="ts">
useSeoMeta({
  title: "Matchimatch",
  ogTitle: "Matchimatch",
  description:
    "App didática para crianças, com diferentes tipos de jogos de correspondência. Inspirada na pedagogia Montessori.",
  ogDescription:
    "App didática para crianças, com diferentes tipos de jogos de correspondência. Inspirada na pedagogia Montessori.",
  ogImage: "https://matchimatch.vercel.app/images/ogimage.jpg",
});
</script>

<template>
  <VitePwaManifest />
  <GameTypes />
</template>
