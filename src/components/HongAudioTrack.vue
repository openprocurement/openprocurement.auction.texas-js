<template>
  <audio ref="player" autoplay>
    <source :src="src">
    Your browser does not support the audio element.
  </audio>
</template>

<script>

export default {
  props: {
    browserName:{
      type: String,
      default: null
    }
  },
  data(){
    return{
      src: '/static_texas/media/gong-auction-v1-short.mp3'
    }
  },
  watch:{
    browserName(){
      this.src = '/static_texas/media/gong-auction-v1-short.ogg'
    }
  },
  mounted: function () {
    this.$watch('src', function () {
      this.$refs.player.load();
    });
  },
};

</script>

<style>
</style>
