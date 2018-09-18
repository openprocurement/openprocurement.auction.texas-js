<template>
  <transition>
    <div :style="progressStyles" class="progress">
      <div class="progress-bar" />
    </div>
  </transition>
</template>

<script>
import calculatingDurationTime from '../utils/calculatingDurationTime'
export default {
  props: {
    remainedTimeOfRound: {
      type: Number,
      default: null
    },
    current_stage: {
      type: Number,
      default: null
    },
    stages: {
      type: Array,
      default: null
    },
    currentTime: {
      type: Number,
      default: null
    },
  },
  data(){
    return{
      i: 1,
      progressStyles: 0
    }
  },
  watch: { 
    progressStyles() {
      let calculate;
      if(this.current_stage !== -1){
        calculate = this.remainedTimeOfRound / calculatingDurationTime(this.stages[this.current_stage].start, this.stages[this.current_stage].planned_end )
      }
      else if (this.current_stage === -1){
        calculate = this.remainedTimeOfRound / ( this.remainedTimeOfRound + (this.i ++) )
      }
      else if(this.current_stage !== -1 && stages[this.current_stage].type === 'pause'){
        calculate = this.remainedTimeOfRound / calculatingDurationTime(this.stages[this.current_stage].start, this.stages[this.current_stage + 1].start )
      }
      this.progressStyles = `width : ${(100 - (calculate * 100))}%`
    }
  }
}

</script>

<style>

.progress{
    position: fixed;
    left: 0;
    top: 92px;
    height: 4px;
    background-color: #9ab913;
    transition: width .6s ease;
}

</style>
