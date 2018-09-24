<template>
  <div :class="'status-label-container__' + type" class="status-label-container">
    <div v-if="state == 'active'" class="status-label-container__text">
      {{ $t(textStatus) }}
      <div class="status-label-container-active__round">
        {{ currentRoundNumber }}
      </div>
    </div>
    <div v-else class="status-label-container__text">
      {{ $t( textStatus) }}
    </div>
    <div :class="'status-label-container__sign_' + type " class="status-label-container__sign">
      <spinner-loader 
        v-if="state === 'pendingOfAuction'" />
      <img 
        v-if="state === 'canceled' || state === 'completed' || state === 'active'"
        :src="'/static_texas/images/sign_' + type + '.png'" 
        :alt="type">
      <div v-if="state == 'pendingOfRound'">
        {{ remainedMinutesToStartRound }} хв
      </div>
    </div>
  </div>
</template>

<script>
import SpinnerLoader from './SpinnerLoader.vue'
import RadialProgressBar from './RadialProgressBar.vue'
export default {
  components: {
    SpinnerLoader,
    RadialProgressBar
  },
  props: {
    type: {
      type: String,
      default: null
    },
    textStatus: {
      type: String,
      default: null
    },
    state: {
      type: String,
      default: null
    },
    remainedTimeOfRound: {
      type: Number,
      default: null
    },
    currentRoundNumber: {
      type: Number,
      default: null
    }
  },

  computed: {
    remainedMinutesToStartRound() {
      return Math.ceil(this.remainedTimeOfRound / 60)
    },
  },
  updated() {
    window.scrollTo(0, document.body.scrollHeight);
  },
};
</script>

<style>
.status-label-container{
    color: #ffffff;
    width: 198px;
    margin-right: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.status-label-container__text{
    display: flex;
    align-items: center;
    margin: 0 auto;
    font-family: 'Roboto', sans-serif;
    font-size: 18px;
}

.status-label-container__sign{
   display: flex;
   justify-content: center;
   align-items: center;
   width: 46px;
   height: 40px;
}

.status-label-container__sign_active{
   background-color: #85a10f;
}

.status-label-container__sign_completed{
   background-color: #e1e7d9;
}

.status-label-container__sign_pending-of-auction{
   background-color: #d38812;
}

.status-label-container__sign_pending-of-round{
   background-color: #d38812;
}

.status-label-container__sign_canceled{
   background-color: #cb5e46;
}

.status-label-container__pending-of-auction{
    background-color: #f39c11;
}

.status-label-container__pending-of-round{
    background-color: #f39c11;
}

.status-label-container__active{
    background-color: #9aba13;
}

.status-label-container__canceled{
    background-color: #e4694e;
}

.status-label-container__completed{
    color: #000000;
    background-color:#f1f3f2;
}

.status-label-container-active__round{
    font-family: 'Oswald', sans-serif;
    font-size: 24px;
    font-weight: 500;
    margin-left: 5px;
    margin-bottom: 5px;
}
</style>
