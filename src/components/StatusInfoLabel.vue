<template>
  <div v-if="currentType !=='pre-announcement'" :class="'status-label-container__' + type" class="status-label-container">
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
        v-if="state == 'pendingOfAuction' || state == 'pendingSyncData'"/>
      <svg v-else-if="state === 'canceled'" class= "state_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.07 19.07"><path d="M15.09,18.56" transform="translate(-6.84 -4.39)"/><path d="M14.07,18.54" transform="translate(-6.84 -4.39)"/><path fill="#fff" d="M25.91,6.3,24,4.39,16.38,12,8.75,4.39,6.84,6.3l7.63,7.63L6.84,21.55l1.91,1.91,7.63-7.63L24,23.46l1.91-1.91-7.63-7.62Zm0,0" transform="translate(-6.84 -4.39)"/></svg>
      <svg v-else-if="state === 'completed'" class= "state_icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 22.12 17.01"><defs><clipPath id="d2e6e7f2-71df-4a16-823b-f86aae6e7c25" transform="translate(-4 -7)"><rect x="4" y="7" width="22.33" height="17.02" fill="none"/></clipPath></defs><g clip-path="url(#d2e6e7f2-71df-4a16-823b-f86aae6e7c25)"><path d="M4.25,16.36a.92.92,0,0,1-.25-.6.91.91,0,0,1,.25-.59L5.45,14a.82.82,0,0,1,1.19,0l.08.09,4.68,5a.41.41,0,0,0,.59,0L23.4,7.25h.09a.83.83,0,0,1,1.19,0l1.19,1.19a.82.82,0,0,1,0,1.19L12.25,23.76a.83.83,0,0,1-1.19,0L4.42,16.61Zm0,0" transform="translate(-4 -7)"/></g></svg>
      <svg v-else-if="state === 'active'" class= "state_icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 11.77 26.48"><defs><clipPath id="3e5076bd-8dec-47bf-b43b-b57e14aa31e4" transform="translate(-8 -2.39)"><rect x="8" y="2.39" width="11.74" height="26.49" fill="none"/></clipPath></defs><path d="M15.09,18.56" transform="translate(-8 -2.39)"/><path d="M14.07,18.54" transform="translate(-8 -2.39)"/><g clip-path="url(#3e5076bd-8dec-47bf-b43b-b57e14aa31e4)"><path fill="#fff" d="M9.18,28.87c-.28-.19,4.64-10.54,4.47-11S8.26,15.77,8,15,18.32,2.16,18.59,2.39,14,13,14.12,13.38s5.48,2.07,5.65,2.91S9.47,29.06,9.18,28.87Zm0,0" transform="translate(-8 -2.39)"/></g></svg>
      <div v-else-if="state == 'pendingOfRound'">
        <div v-if="remainedMinutesToStartRound <= 1">
          {{ remainedTimeOfRound }}
          {{ $t("seconds") }}
        </div>
        <div v-else>
          {{ remainedMinutesToStartRound }}
          {{ $t("minutes") }}
        </div>
      </div>
    </div>
  </div>
  <div v-else-if="currentType === 'pre-announcement'">
    <div class="status-label-container status-label-container__pending-of-round">
    <div class="status-label-container__text">
      {{ $t('Waiting') }}
    </div>

    <div class="status-label-container__sign_pending-of-round status-label-container__sign">
      <spinner-loader />
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
    currentType: {
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
  watch: {
    state() {
      window.scrollTo(0, document.body.scrollHeight);
    },
  },
};
</script>

<style>
.state_icon {
  width: 20px;
  height: 30px;
}
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

.status-label-container__sign_pending{
   background-color: #d38812;
}

.status-label-container__sign_pending-of-round{
   background-color: #d38812;
}

.status-label-container__sign_canceled{
   background-color: #cb5e46;
}

.status-label-container__pending{
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

@media screen and (max-width: 768px) {
  .status-label-container{
    margin-right: 0;
 }
}

@media screen and (max-width: 478px) {
  .status-label-container{
    width: 100%;
    margin-right: 0;
 }
}
</style>
