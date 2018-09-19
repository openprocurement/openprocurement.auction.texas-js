<template>
  <div class="clock-container-wrapper">
    <div class="clock-container__burger-icon"
         @click="showOrHideModalWindow">
      <img src="/static/images/burger_icon.png" alt="calendar-icon">
    </div>
    <div class="clock-container-wrapper_time">
      <div class="clock-container__calendar-icon">
        <img 
          class="clock-container__calendar-icon_img" 
          src="/static/images/calendar_icon.png" alt="calendar-icon">
      </div>
      <div class="clock-container">
        <h6 class="clock-container__status-time">
          {{ $t(timeStatus) }}
        </h6>
        <div v-if="state !== 'completed'" class="clock-container__time">
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
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
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
    }
  },
  data() {
    return {
      now: Math.trunc((new Date()).getTime() / 1000),
      end:null
    }
  },
  computed: {
    seconds() {
      return (this.date - this.now) % 60;
    },
    minutes() {
      return Math.trunc((this.date - this.now) / 60) % 60;
    },
    hours() {
      return Math.trunc((this.date- this.now) / 60 / 60) % 24;
    },
    days() {
      return Math.trunc((this.date - this.now) / 60 / 60 / 24);
    },
  },
  watch: {
    now(){
      const locale = this.$store.state.i18n.locale;
      if (  locale === 'Українська' ){
        moment.locale('uk')
      }
      else if ( locale === 'Русский' ){
        moment.locale('ru')
      } 
      else {
        moment.locale('en')
      } 
      this.end = moment(Math.trunc(Date.parse(this.endDate))).format('MMMM Do YYYY, h:mm:ss a');
      this.$emit('getCurrentTime', this.now);
      this.$emit('getRemainedTimeofRound', (this.days * 24 * 3600 +  this.seconds + this.minutes * 60));
      ((this.seconds === 0 && this.minutes === 0 && this.hours === 0 && this.days === 0))?
        (this.$emit('checkTimeOut', true))
        :
        (null)
    }
  },
  mounted() {
    window.setInterval(() => {
      this.now = Math.trunc((new Date()).getTime() / 1000);
    },1000);
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
}

.clock-container{
    display: flex;
    flex-direction: column;
    margin-left: 10px;
}

.clock-container-wrapper{
    display: flex;
    width: 340px;
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
    margin-top: 17px;
}

.digit {
    font-family: Roboto;
    font-size: 13px;
    font-weight: 500;
    line-height: 16px;
}
</style>