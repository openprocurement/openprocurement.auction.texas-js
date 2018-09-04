
@import url(https://fonts.googleapis.com/css?family=Roboto+Condensed:400|Roboto:100);
<template>
<div class="clock-container-wrapper">
    <div class="clock-container__burger-icon"
    @click="showOrHideModalWindow"
    >
        <img
        src="/static/images/burger_icon.png"
        alt="calendar-icon">
    </div>
    <div class="clock-container-wrapper_time">
    <div class="clock-container__calendar-icon">
        <img 
        class="clock-container__calendar-icon_img" 
        src="/static/images/calendar_icon.png"
         alt="calendar-icon">
    </div>
    <div class="clock-container">
    <h6 class="clock-container__status-time"
    >
    {{$t(timeStatus)}}
    </h6>
<div class="clock-container__time">
        <div class="digit" v-show="days !==0">{{ days }}
            {{$t('days')}}
            </div>
        <div class="digit" v-show="hours !==0">{{ hours }}
            {{$t('hours')}}
            </div>
        <div class="digit" v-show="minutes !==0">{{ minutes }}
            {{$t('minutes')}}
            </div>
        <div class="digit" v-show="seconds !==0">{{ seconds }}
            {{$t('seconds')}}
            {{checkTimeOut}}
            {{getRemainedTimeofRound}}
            {{getCurrentTime}}
        </div>
</div>
</div>
    </div>

</div>

</template>

<script>
export default {
    props : {
        date : {
            coerce: date => date
        },
        state:String,
        timeStatus:String
    },
    data() {
        return {
            now: Math.trunc((new Date()).getTime() / 1000)
        }
    },
    mounted() {
        window.setInterval(() => {
            this.now = Math.trunc((new Date()).getTime() / 1000);
        },1000);
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
    checkTimeOut() {
            ((this.seconds === 0 && this.minutes === 0 && this.hours === 0 && this.days === 0))?
            (this.$emit('checkTimeOut', true))
            :
            ( this.$emit('checkTimeOut', false))
        },
    getRemainedTimeofRound(){
            this.$emit('getRemainedTimeofRound', (this.seconds + this.minutes * 60))
        },

    getCurrentTime(){
            this.$emit('getCurrentTime', this.now)
        },
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
}

.clock-container-wrapper{
    display: flex;
    width: 340px;
    justify-content: space-around;
}

.clock-container-wrapper_time{
    display: flex;
    width: 195px;
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
    font-family: Roboto;
    font-size: 13px;
    font-weight: 500;
    line-height: 16px;
}
</style>
