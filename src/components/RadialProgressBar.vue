<template>
  <svg class="progress-ring" viewBox="-50,-50,100,100">
    <circle class="progress-ring_circle" r="46"/>
    <path :d="path" class="progress-ring_ring" />
    <circle :cx="endX" :cy="endY" r="4" class="progress-ring_end" />
  </svg>
</template>

<script>
export default {
  props: {
    max: {
      type: String,
      default: null
    },
    min: {
      type: String,
      default: null
    },
    value: {
      type:  String,
      default: null
    }
  },
  computed: {
    theta() {
      const frac = (this.value - this.min) / (this.max - this.min) || 0;
      return frac * 2 * Math.PI;
    },
    path() {
      const large = this.theta > Math.PI;
      return `M0,-46 A46,46,0,${large ? 1 : 0},1,${this.endX},${this.endY}`;
    },
    endX() {
      return Math.cos(this.theta - Math.PI * 0.5) * 46;
    },
    endY() {
      return Math.sin(this.theta - Math.PI * 0.5) * 46;
    },
  }

}
</script>

<style>
.progress-ring {
  width: 38px;
  height: 38px;
  margin-left: 12px;
}

.progress-ring_circle {
 stroke: #929293;
 stroke-width: 6;
 fill: none;
}

.progress-ring_ring {
  stroke: #EF851B;
  stroke-width: 9;
  fill: none;
}

.progress-ring_end {
  fill: #EF851B;
}

</style>
