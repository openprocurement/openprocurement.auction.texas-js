<template>
  <audio ref="player" autoplay>
    <source src="/static_texas/media/GongHighFinal.wav">
    <source src="/static_texas/media/GongHighFinal.ogg">
    <source src="/static_texas/media/GongHighFinal.mp3">
    Your browser does not support the audio element.
  </audio>
</template>

<script>

export default {
  mounted: function () {
    this.$watch('src', function () {
      this.$refs.player.load();
    });
  },
};

</script>

<style>
</style>
