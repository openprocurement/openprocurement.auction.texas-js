<template>
  <audio ref="player">
    <source v-bind:src="hongTrack">
    Your browser does not support the audio element.
  </audio>
</template>

<script>

export default {
  props: ['hongTrack'],

  mounted: function () {
    this.$watch('hongTrack', function () {
      this.$refs.player.load();
    });
  },
};

</script>

<style>
</style>
