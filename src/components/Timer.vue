
@import url(https://fonts.googleapis.com/css?family=Roboto+Condensed:400|Roboto:100);

<template>
<div class="clock-container">
    <h6 class="start-acrtin-remain-text"
    
    >{{timeStatus}}</h6>
<div class="clock">
    <div class="block">
        <p class="digit">{{ days }}</p>
        <p class="text">Days</p>
    </div>
    <div class="block">
        <p class="digit">{{ hours }}</p>
        <p class="text">Hours</p>
    </div>
    <div class="block">
        <p class="digit">{{ minutes }}</p>
        <p class="text">Minutes</p>
    </div>
    <div class="block">
        <p class="digit">{{ seconds }}</p>
        <p class="text">Seconds
            {{checkTimeOut}}
            {{getRemainedTimeofRound}}
            {{getCurrentTime}}
        </p>
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
        }
    },
    
};
</script>

<style>
.clock{
    display: flex;
    width: 175px;
    height: 35px;
    background-color: aquamarine;
    margin-left: 40px;
}

.clock-container{
    display: flex;
    flex-direction: column;
}

.start-acrtin-remain-text{
    width: 175px;
    display: flex;
    justify-content: flex-end;
}

.block {
    display: flex;
    flex-direction: column;
}

.text {
    color: red;
    font-size: 10px;
    font-family: 'Roboto Condensed', serif;
    text-align: center;
    margin-right: 5px;
}

.digit {
    color: black;
    font-size: 10px;
    font-weight: 10;
    font-family: 'Roboto', serif;
    margin: 2px;
    text-align: center;
}
</style>
