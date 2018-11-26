<template>
  <div :class="'clock-container-wrapper_' + state" class="clock-container-wrapper">
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
        <h6 v-if="( timeRemaining <= -600 ) && ( currentStage === -1 ) " class="clock-container__status-time">
          {{ $t('Auction has not started and will be rescheduled') }}
        </h6>
        <h6 v-else-if="allowParseHealthResponse && ( !healthResponse )" class="clock-container__status-time">
          {{ $t('Something was wrong. We will try to resolve the problem') }}
        </h6>
        <h6 v-else-if="(state !=='pendingSyncData')" class="clock-container__status-time">
          {{ $t(timeStatus) }}
        </h6>
        <h6 v-else-if="( timeRemaining < -5 )" class="clock-container__status-time">
          {{ $t(timeStatus) }}
        </h6>
        <div v-if="($store.state.terminatedStates.indexOf(state) === -1) && state !== 'preAnnouncement' && state !=='pendingSyncData' && timeRemaining >= -5" class="clock-container__time">
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
        <div v-else-if="timeRemaining >= -5" class="clock-container__time">
          <div v-show="seconds !==0" class="digit" >0
            {{ $t('seconds') }}
          </div>
        </div>

        <div v-if="state === 'completed'">
          {{ end }}
        </div>
        <vue-headful v-if="state === 'pendingSyncData' && timeRemaining >=-5" :title="0 + ' ' + $t('seconds')" />
        <vue-headful v-else-if="allowParseHealthResponse && ( !healthResponse )" :title="$t('Something was wrong. We will try to resolve the problem')" />
        <vue-headful v-else-if="state === 'pendingSyncData' || timeRemaining === null || timeRemaining < -6" :title="$t(calculateTitle.timeStatus)" />
        <vue-headful v-else-if="$store.state.terminatedStates.indexOf(state) !== -1"
                     :title="($t(calculateTitle.timeStatus) + ' ' + $t(calculateTitle.time))" />
        <vue-headful v-else-if="($store.state.terminatedStates.indexOf(state) === -1) && (days === 0)"
                     :title="calculateTitle.hours+':'+ calculateTitle.minutes + ':' + calculateTitle.seconds + ' ' +$t(calculateTitle.timeStatus)" />
        <vue-headful v-else
                     :title="calculateTitle.days + $t('days') + ' '+calculateTitle.hours+':' + calculateTitle.minutes + ':' + calculateTitle.seconds + ' ' +$t(calculateTitle.timeStatus)" />
      </div>
    </div>
  </div>
</template>
  
<script>
import moment from 'moment'
import vueHeadful from 'vue-headful';
import { mixin as clickaway } from 'vue-clickaway';
import {getCookieByName} from "../utils/utils"
import axios from 'axios'
const timeForWaitingHealthRequest = -20;
const maxTimeForHealthRequest = -3600;
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
    currentType: {
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
    },
    currentStage: {
      type: Number,
      default: null
    }
  },
  data() {
    let end = null
    if (this.endDate) {
      end = moment(Math.trunc(Date.parse(this.endDate))).format('MMMM Do YYYY, HH:mm:ss a')
    }
    return {
      timeRemaining: null,
      end: end,
      startInterval: false,
      allowParseHealthResponse: false, 
      healthResponse: false
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
        hours: ((this.hours.toString()).length === 1)? `0${this.hours}`: this.hours,
        minutes: ((this.minutes.toString()).length === 1)? `0${this.minutes}`: this.minutes,
        seconds: ((this.seconds.toString()).length === 1)? `0${this.seconds}`: this.seconds,
        timeStatus: this.timeStatus
      }
    }
  },
  watch: {
    endDate () {
      this.end = moment(Math.trunc(Date.parse(this.endDate))).format('MMMM Do YYYY, HH:mm:ss')
    },
    syncedTime () {
      if (this.syncedTime) {

        this.isCheckTimeOutCalled = false

        let mathSyncedTime = Math.trunc(this.syncedTime.getTime() / 1000)
        this.timeRemaining = this.date - mathSyncedTime

        if (!this.startInterval && this.timeRemaining > 0) {
          this.timer()
        }

        this.startInterval = true
      }
    },
    timeRemaining () {
      if ( (this.timeRemaining < timeForWaitingHealthRequest) 
      && Boolean(getCookieByName('auctions_loggedin'))
      && (this.timeRemaining > maxTimeForHealthRequest)
      && (this.currentStage !==-1)) {
        this.healthRequest();
        this.allowParseHealthResponse = true
      }
      else{
        this.allowParseHealthResponse = false
      }
  
      this.$emit('getRemainedTimeofRound', this.timeRemaining);
      if (this.timeRemaining < 0 && this.$store.state.terminatedStates.indexOf(this.state) === -1 && !this.isCheckTimeOutCalled) {
        this.isCheckTimeOutCalled = true
        this.$emit('checkTimeOut')
      }
      if (this.timeRemaining >= 0 && this.state === 'pendingSyncData') {
        this.$emit('stateUpdate')
      }
    }
  },
  updated(){
    moment.locale(this.$store.state.i18n.locale)
    this.end = moment(Math.trunc(Date.parse(this.endDate))).format('MMMM Do YYYY, HH:mm:ss')
  },
  methods: {
    away() {
      this.$emit('hideModalWindow')
    },
    showOrHideModalWindow(){
      this.$emit('showOrHideModalWindow')
    },
    timer(){
      window.setInterval(() => {
        this.timeRemaining = this.timeRemaining - 1
      },1000)
    },
    healthRequest () {
      axios.get(`${this.$store.state.urls.auctionURL}/${this.$store.state.id}/health`, {
        'params': {
          '_nonce': Math.random().toString()
        }
      }).then((data) => {
        this.healthResponse = true
        console.info({message: 'health_request_', data:data.data.health})
      }).catch((e) => {
        this.healthResponse = false
        // log error
        console.error({message: 'health_request_error', error_data: e})
      })
    },
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
}

.clock-container-wrapper_preAnnouncement {
   width: 550px;
}

.clock-container-wrapper_time{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 30px;
    margin-right: 10px;
}

.clock-container__burger-icon{
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-left: 30px;
    margin-right: 10px;
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
    margin-right: 5px;
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
    flex-wrap: wrap;
    margin-bottom: 30px;
    margin-top: auto;
  }
}

</style>
