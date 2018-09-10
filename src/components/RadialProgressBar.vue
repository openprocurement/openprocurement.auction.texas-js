<template>
  <svg class="progress-ring" viewBox="-50,-50,100,100">
    <circle class="progress-ring_circle" r="46"/>
    <path :d="path" class="progress-ring_ring" />
    <circle :cx="endX" :cy="endY" r="4" class="progress-ring_end" />
    <text class="progress-ring_text" alignment-baseline="middle" text-anchor="middle">{{ text }}</text>
  </svg>
</template>

<script>
export default {
  props: {
    max: {
      type: Number,
      default: null
    },
    min: {
      type: Number,
      default: null
    },
    value: {
      type:  Number,
      default: null
    },
    text: {
      type:  Number,
      default: null
    },
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
  width: 45px;
  height: 50px;
}

.progress-ring_circle {
 stroke: red;
 stroke-width: 11;
 fill: none;
}

.progress-ring_ring {
  stroke: #007fff;
  stroke-width: 10;
  fill: context-fill;
}

.progress-ring_end {
  fill: #007fff;
}

.progress-ring_text{
  font-size: 28px;
}

</style>
