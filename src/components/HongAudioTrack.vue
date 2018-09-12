<template>
  <audio ref="player">
    <source :src="hongTrack">
    Your browser does not support the audio element.
  </audio>
</template>

<script>

export default {
  props: {
    hongTrack:{
      type: String,
      default: null
    }
  },
  mounted: function () {
    this.$watch('hongTrack', function () {
      this.$refs.player.load();
    });
  },
};

</script>

<style>
</style>
