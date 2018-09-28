<template>
  <div class="clock-container-wrapper">
    <div class="clock-container__burger-icon"
         @click="showOrHideModalWindow">
      <img src="/static_texas/images/burger_icon.svg" alt="calendar-icon">
    </div>
    <div class="clock-container-wrapper_time">
      <div class="clock-container__calendar-icon">
        <img 
          class="clock-container__calendar-icon_img" 
          src="/static_texas/images/calendar_icon.svg" alt="calendar-icon">
      </div>
      <div class="clock-container">
        <h6 class="clock-container__status-time">
          {{ $t(timeStatus) }}
        </h6>
        <div v-if="(state !== 'completed') && state !== 'pendingSyncData'" class="clock-container__time">
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

        <vue-headful v-if="state === 'completed'"
                     :title="($t(calculateTitle.timeStatus) + ' ' + $t(calculateTitle.time))" />
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
export default {
  components: {
    vueHeadful
  },
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
    syncedTime () {
      if (this.syncedTime) {
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
      if (this.timeRemaining < 0 && ['completed', 'redefined', 'cancelled'].indexOf(this.state) === -1)
        this.$emit('checkTimeOut')
    }
  },
  methods: {
    showOrHideModalWindow(){
      this.$emit('showOrHideModalWindow')
    },
  }
};
</script>

<style>
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
</style>