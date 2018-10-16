<template>
  <div class="clock-container-wrapper">
    <div v-on-clickaway="away" 
         class="clock-container__burger-icon"
         @click="showOrHideModalWindow">
      <svg class="burger_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.4 9.6"><path d="M290,425.49h14.4v-1.6H290Zm0-4h14.4v-1.6H290Zm0-5.6v1.6h14.4v-1.6Zm0,0" transform="translate(-290 -415.89)"/></svg>
    </div>
    <div class="clock-container-wrapper_time">
      <div class="clock-container__calendar-icon">
        <svg class="clock-container__calendar-icon_img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35.02 32.62"><title>calendar</title><path d="M28.89,7.07h-4.6V4.8H22V7.07H13.79V4.8H11.52V7.07H6.64a3.5,3.5,0,0,0-3.41,3.75v20a3.36,3.36,0,0,0,3.41,3.06H28.89a3.41,3.41,0,0,0,3.41-3.41v-20A3.41,3.41,0,0,0,28.89,7.07ZM6.64,9.34h4.88v2.27h2.27V9.34H22v2.27h2.27V9.34h4.6A1.14,1.14,0,0,1,30,10.47v4.65H5.5V10.47A1.14,1.14,0,0,1,6.64,9.34ZM28.89,31.59H6.64A1.14,1.14,0,0,1,5.5,30.45V17.4H30V30.45A1.14,1.14,0,0,1,28.89,31.59Z" transform="translate(-3.23 -4.8)"/><path d="M38.25,27.94c0,.05,0,.11,0,.16a9.46,9.46,0,0,1-9.48,9.32h-.25a9.48,9.48,0,0,1,.25-19,9.26,9.26,0,0,1,1.21.08l.16,0A9.48,9.48,0,0,1,38.25,27.94Z" transform="translate(-3.23 -4.8)" fill="#99ba3c"/><path d="M29.7,28.23V22.51a1.18,1.18,0,0,0-1.18-1.18,1.09,1.09,0,0,0-1.07,1.18v6.22a1.18,1.18,0,0,0,.35.84l2.72,2.72a1.18,1.18,0,0,0,.84.35,1,1,0,0,0,.78-.29,1.18,1.18,0,0,0,0-1.67Zm.11,0Z" transform="translate(-3.23 -4.8)" fill="#fff"/></svg>
      </div>
      <div class="clock-container">
        <h6 class="clock-container__status-time">
          {{ $t(timeStatus) }}
        </h6>
        <div v-if="($store.state.terminatedStates.indexOf(state) === -1) && state !== 'pendingSyncData' && timeRemaining >= 0" class="clock-container__time">
          <div v-show="days !==0" class="digit" >{{ days }}
            {{ $t('days') }}
          </div>
          <div v-show="hours !==0" class="digit">{{ hours }}
            {{ $t('hours') }}
          </div>
          <div v-show="minutes !==0" class="digit" >{{ minutes }}
            {{ $t('minutes') }}
          </div>
          <div v-show="seconds !==0" class="digit" >{{ seconds }}
            {{ $t('seconds') }}
          </div>
        </div>
        <div v-if="state === 'completed'">
          {{ end }}
        </div>

        <vue-headful v-if="$store.state.terminatedStates.indexOf(state) !== -1"
                     :title="($t(calculateTitle.timeStatus) + ' ' + $t(calculateTitle.time))" />
        <vue-headful v-else-if="($store.state.terminatedStates.indexOf(state) === -1) && (days === 0)"
                     :title="calculateTitle.hours+':' + 
                     + calculateTitle.minutes + ':' + calculateTitle.seconds + ' ' +$t(calculateTitle.timeStatus)" />
        <vue-headful v-else
                     :title="calculateTitle.days + $t('days') + ' '+calculateTitle.hours+':' + 
                     + calculateTitle.minutes + ':' + calculateTitle.seconds + ' ' +$t(calculateTitle.timeStatus)" />
      </div>
    </div>
  </div>
</template>
  
<script>
import moment from 'moment'
import vueHeadful from 'vue-headful';
import { mixin as clickaway } from 'vue-clickaway';
export default {
  components: {
    vueHeadful
  },
  mixins: [ clickaway ],
  props : {
    date : {
      type: Number,
      default: null
    },
    state: {
      type: String,
      default: null
    },
    timeStatus: {
      type: String,
      default: null
    },
    endDate: {
      type: String,
      default: null
    },
    syncedTime: {
      type: Date,
      default: null
    }
  },
  data() {
    let end = null
    if (this.endDate) {
      end = moment(Math.trunc(Date.parse(this.endDate))).format('MMMM Do YYYY, h:mm:ss a')
    }
    return {
      timeRemaining: null,
      end: end,
      startInterval: false,
      currentTime: null
    }
  },
  computed: {
    seconds() {
      return this.timeRemaining % 60
    },
    minutes() {
      return Math.trunc(this.timeRemaining / 60) % 60
    },
    hours() {
      return Math.trunc(this.timeRemaining / 60 / 60) % 24
    },
    days() {
      return Math.trunc(this.timeRemaining / 60 / 60 / 24)
    },
    calculateTitle() {
      return {
        time: this.end,
        days: this.days,
        hours: this.hours,
        minutes: this.minutes,
        seconds: this.seconds,
        timeStatus: this.timeStatus
      }
    }
  },
  watch: {
    endDate () {
      this.end = moment(Math.trunc(Date.parse(this.endDate))).format('MMMM Do YYYY, h:mm:ss a')
    },
    syncedTime () {
      if (this.syncedTime) {

        this.isCheckTimeOutCalled = false

        let mathSyncedTime = Math.trunc(this.syncedTime.getTime() / 1000)
        this.timeRemaining = this.date - mathSyncedTime

        if (!this.startInterval && this.timeRemaining > 0) {
          window.setInterval(() => {
            this.timeRemaining = this.timeRemaining - 1
          },1000)
        }
        this.startInterval = true
      }
    },
    timeRemaining () {
      // change language of moment.js
      moment.locale(this.$store.state.i18n.locale)
      this.$emit('getCurrentTime', this.timeRemaining);
      this.$emit('getRemainedTimeofRound', (this.days * 24 * 3600 +  this.seconds + this.minutes * 60));
      if (this.timeRemaining < 0 && this.$store.state.terminatedStates.indexOf(this.state) === -1 && !this.isCheckTimeOutCalled) {
        this.isCheckTimeOutCalled = true
        this.$emit('checkTimeOut')
      }
      if (this.timeRemaining >= 0 && this.state === 'pendingSyncData') {
        this.$emit('stateUpdate')
      }
    }
  },
  methods: {
    away() {
      this.$emit('hideModalWindow')
    },
    showOrHideModalWindow(){
      this.$emit('showOrHideModalWindow')
    }
  }
};
</script>

<style>

.clock-container__calendar-icon_img {
  width: 35px;
  height: 35px;
}

.burger_icon {
  width: 25px;
  height: 25px;
}
.clock-container__time{
    display: flex;
    justify-content: space-between;
    margin-top: 5px;
}

.clock-container{
    display: flex;
    flex-direction: column;
    margin-left: 10px;
}

.clock-container-wrapper{
    display: flex;
    width: 400px;
    justify-content: space-around;
}

.clock-container-wrapper_time{
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.clock-container__burger-icon{
    display: flex;
    align-items: center;
    cursor: pointer;
}

.clock-container__calendar-icon{
    display: flex;
    align-self: center;
}

.digit {
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    font-weight: 600;
    line-height: 16px;
}

.clock-container__status-time {
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  font-weight: 300;
  line-height: 16px;
}


@media screen and (max-width: 478px) {
  .header_container{
    flex-direction: column;
    width: 100%;
    align-items: center;
    justify-content: initial;
  }
  .clock-container-wrapper{
    width: 100%;
    justify-content: space-evenly;
  }
}
</style>