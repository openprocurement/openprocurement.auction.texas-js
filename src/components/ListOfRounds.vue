<template>
  <div class="list-rounds-container">
    <div v-for="(stage, index) in previouseStages" :key="index">
      <h3 class="round-label">
        {{ $t('Round') }}
        {{ index + 1 }}
      </h3>
      <div v-if="state === 'completed' || state === 'preAnnouncement'" class="round-container round-container_completed">
        <div class="round-container__time-patricipant">
          <div class="round-container_time-completed">
            <svg class="watch-in-round" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28.06 28.06"><title>checkmark_clock</title><path d="M15.13,18.93" transform="translate(-1 -1.13)"/><path d="M21.27,8.74a1.25,1.25,0,0,0-1.7.46l-5.13,8.32h0L10.57,12.4a1.29,1.29,0,1,0-2.08,1.51s3,4.31,4.76,6.62a1.49,1.49,0,0,0,2.39,0c2-3.11,6-10.06,6-10.06A1.25,1.25,0,0,0,21.27,8.74Z" transform="translate(-1 -1.13)"/><path d="M14,18.91" transform="translate(-1 -1.13)"/><path d="M15,1.13a14,14,0,1,0,14,14A14,14,0,0,0,15,1.13Zm0,25.69A11.66,11.66,0,1,1,26.69,15.16,11.65,11.65,0,0,1,15,26.82Z" transform="translate(-1 -1.13)"/></svg>
          </div>
          <div class="round-container_participant-completed">
            <div v-if="$store.state.identification.bidderID === stage.bidder_id" class="round-container_participant-expended">
              <div v-if="stage.bidNumber" class="order-of-bidder">
                {{ $t('Bidder') }} {{ stage.bidNumber }}
              </div>
              {{ stage.label[$store.state.i18n.locale] }}
              ({{ $t('You') }})
            </div>
            <div v-else class="round-container_participant-expended">
              <div v-if="stage.bidNumber" class="order-of-bidder">
                {{ $t('Bidder') }} {{ stage.bidNumber }}
              </div>
              {{ stage.label[$store.state.i18n.locale] }}
            </div>
            <div class="round-container_time__watch">
              {{ stage.time | moment("hh:mm:ss") }}
            </div>
          </div>
        </div>
        <div class="round-container_bid">
          <div class="round-container_bid__amount">
            {{ formatNumber(stage.amount) }} 
            {{ $t('UAH') }}
          </div>
        </div>
      </div>

      <div v-else-if="(state ==='active' || state == 'pendingOfRound')" class="round-container round-container_active">
        <div class="round-container__time-patricipant">
          <div class="round-container_time-active">
            <div class="round-container_time__watch-icon">
              <svg class="watch-in-round" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28.06 28.06"><title>checkmark_clock</title><path d="M15.13,18.93" transform="translate(-1 -1.13)"/><path d="M21.27,8.74a1.25,1.25,0,0,0-1.7.46l-5.13,8.32h0L10.57,12.4a1.29,1.29,0,1,0-2.08,1.51s3,4.31,4.76,6.62a1.49,1.49,0,0,0,2.39,0c2-3.11,6-10.06,6-10.06A1.25,1.25,0,0,0,21.27,8.74Z" transform="translate(-1 -1.13)"/><path d="M14,18.91" transform="translate(-1 -1.13)"/><path d="M15,1.13a14,14,0,1,0,14,14A14,14,0,0,0,15,1.13Zm0,25.69A11.66,11.66,0,1,1,26.69,15.16,11.65,11.65,0,0,1,15,26.82Z" transform="translate(-1 -1.13)"/></svg>
            </div>
            <div class="round-container_time__watch">
              {{ stage.time | moment("hh:mm:ss") }}
            </div>
          </div>
          <div v-if="$store.state.identification.bidderID === stage.bidder_id" class="round-container_participant_active">
            {{ stage.label[$store.state.i18n.locale] }}
            ({{ $t('You') }})
          </div>
          <div v-else class="round-container_participant_active">
            {{ stage.label[$store.state.i18n.locale] }}
          </div>
        </div>
        <div class="round-container_bid">
          <h4 class="round-container_bid__amount">
            {{ formatNumber(stage.amount) }}
            {{ $t('UAH') }}
          </h4>
        </div>
      </div>
    </div>

    <div v-if="state ==='active' || state == 'pendingOfRound'" id="active-round">
      <h3 class="round-label">
        {{ $t('Round') }}
        {{ currentRoundNumber }}
      </h3>      
      <div class="round-container round-container_active round-container_active-round">
        <div class="round-container__time-patricipant round-container__time-patricipant-active">
          <div class="round-container_time-active">
            <div 
              class="round-container_time-active__watch-icon">
              <radial-progress-bar
                v-if="state !== 'pendingOfRound' && (value > 0 && value < 100)"
                :value="value"
                :remained-time-of-round="remainedTimeOfRound"
                min="0" max="100" />
            </div>
            <div class="round-container_time__watch  round-container_time-active__watch">
              {{ stages[stages.length - 1].planned_end | moment("hh:mm:ss") }}
            </div>
          </div>
          <div class="round-container_participant_active" />       
        </div>
        <div class="round-container_bid round-container_bid_active round-container_bid_active-round">
          <h4 class="round-container_bid__amount">
            {{ formatNumber(stages[stages.length - 1].amount) }}
            {{ $t('UAH') }}
          </h4>
        </div>
      </div>
    </div>
    <div v-if="( state ==='completed' || state == 'preAnnouncement') && lastRoundWithoutBidder">
      <h3 class="round-label">
        {{ $t('Round') }}
        {{ currentRoundNumber }}
      </h3>     
      <div class="round-container round-container_completed round-container_completed-not-set">
        <div class="round-container__time-patricipant round-container__time-patricipant-not-set">
          <div class="round-container_time-completed round-container_time-completed_not-set">
            <svg class="watch-in-round watch-in-round-not-set" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28.06 28.06"><title>cross</title><path d="M15.13,18.93" transform="translate(-1.05 -1.13)"/><path d="M14,18.91" transform="translate(-1.05 -1.13)"/><path d="M15.08,1.13a14,14,0,1,0,14,14A14,14,0,0,0,15.08,1.13Zm0,25.69A11.66,11.66,0,1,1,26.74,15.16,11.65,11.65,0,0,1,15.08,26.82Z" transform="translate(-1.05 -1.13)"/><path d="M21.73,9.84,20.4,8.51l-5.32,5.32L9.76,8.51,8.43,9.84l5.32,5.32L8.43,20.48l1.33,1.33,5.32-5.32,5.32,5.32,1.33-1.33-5.32-5.32Zm0,0" transform="translate(-1.05 -1.13)" stroke="#000" stroke-miterlimit="10"/></svg>
          </div>
          <div class="round-container_time__watch">
            {{ lastRoundWithoutBidder.planned_end | moment("hh:mm:ss") }}
          </div>
        </div>
        <div class="round-container_bid round-container_bid_not-set">
          <div class="line" />
        </div>
      </div>
    </div>

    <div v-if="( state ==='completed' || state == 'preAnnouncement') && lastBiddedRound" id="active-round" class="max-round-container">
      <h6 class = "announcement"><strong>
        {{ $t('Announcement') }}
      </strong></h6>
      <div class="round-container_completed round-container round-container_max">
        <div class="round-container__time-patricipant">
          <div class="round-container_time-completed">
            <svg class="watch-in-round" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28.06 28.06"><title>checkmark_clock</title><path d="M15.13,18.93" transform="translate(-1 -1.13)"/><path d="M21.27,8.74a1.25,1.25,0,0,0-1.7.46l-5.13,8.32h0L10.57,12.4a1.29,1.29,0,1,0-2.08,1.51s3,4.31,4.76,6.62a1.49,1.49,0,0,0,2.39,0c2-3.11,6-10.06,6-10.06A1.25,1.25,0,0,0,21.27,8.74Z" transform="translate(-1 -1.13)"/><path d="M14,18.91" transform="translate(-1 -1.13)"/><path d="M15,1.13a14,14,0,1,0,14,14A14,14,0,0,0,15,1.13Zm0,25.69A11.66,11.66,0,1,1,26.69,15.16,11.65,11.65,0,0,1,15,26.82Z" transform="translate(-1 -1.13)"/></svg>
          </div>
          <div class="round-container_participant-expended round-container_participant-expended_max">
            <h3 v-if="$store.state.identification.bidderID === lastBiddedRound.bidder_id" class="word-winner">
              <div v-if="lastBiddedRound.bidNumber" class="order-of-bidder">
                {{ $t('Bidder') }} {{ lastBiddedRound.bidNumber }}
              </div>
              {{ $t('winner') }}
              ({{ $t('You') }})
            </h3>
            <h3 v-else class="word-winner">
              <div v-if="lastBiddedRound.bidNumber" class="order-of-bidder">
                {{ $t('Bidder') }} {{ lastBiddedRound.bidNumber }}
              </div>
              {{ $t('winner') }}
            </h3>
            {{ lastBiddedRound.label[$store.state.i18n.locale] }}
          </div>
          <div class="round-container_time__watch">
            {{ lastBiddedRound.time | moment("hh:mm:ss") }}
          </div>
        </div>
        <div class="round-container_bid round-container_bid_max">
          <h4 class="round-container_bid__amount round-container_bid_max__bid-count">
            {{ formatNumber(lastBiddedRound.amount) }}
            {{ $t('UAH') }}
          </h4>
          <div class="round-container_bid_max-block">
            <div class="round-container_bid_max-block-count">
              MAX
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="state ==='completed' && results.length === 0" class="round-container round-unsuccessful-container ">
      {{ $t('The auction is unsuccessful') }}
    </div>
  </div>
</template>

<script>
import formatNumber from '../utils/formatNumber'
import RadialProgressBar from './RadialProgressBar.vue'
import AppListInitialOffers from './ListInitialOffers.vue'
import calculatingDurationTime from '../utils/calculatingDurationTime'

export default {
  components: {
    RadialProgressBar,
    AppListInitialOffers
  },
  props: {
    startPrice: {
      type: Number,
      default: null
    },
    remainedTimeOfRound: {
      type: Number,
      default: null
    },
    state: {
      type: String,
      default: null
    },
    stages: {
      type: Array,
      default: null
    },
    priceOffers: {
      type: Array,
      default: null
    },
    currentStage: {
      type: Number,
      default: null
    },
    currentTime: {
      type: Number,
      default: null
    },
    results: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
      value: 0,
    }
  },
  computed: {
    previouseStages () {
      let prevStages = []
      for (let i in this.stages) {
        if (this.stages[i].bidder_id) prevStages.push(this.stages[i])
      }
      return prevStages
    },
    currentRoundNumber () {
      this.$emit('getCurrentRoundNumber', (this.previouseStages.length + 1) )
      return this.previouseStages.length + 1
    },
    lastBiddedRound () {
      if (this.state === 'completed' || this.state === 'preAnnouncement') {
        let reversedStages = this.stages.slice().reverse()
        for (let i in reversedStages) {
          if (reversedStages[i].type === 'english' && reversedStages[i].bidder_id) {
            return reversedStages[i]
          }
        }
      }
      return null
    },
    lastRoundWithoutBidder () {
      if (this.state === 'completed' || this.state === 'preAnnouncement') {
        let reversedStages = this.stages.slice().reverse()
        for (let i in reversedStages) {
          if (reversedStages[i].type === 'english' && !reversedStages[i].bidder_id) {
            return reversedStages[i]
          }
        }
      }
      return null
    }
  },
  watch: {
    remainedTimeOfRound() {
      let calculate = calculatingDurationTime(this.stages[this.currentStage].start, this.stages[this.currentStage].planned_end );
      this.value = (100 - (this.remainedTimeOfRound / calculate * 100)).toFixed(2);
    }
  },
  methods: {
    formatNumber(number){
      return formatNumber(number)
    }
  }
};
</script>

<style scoped>

.round-container_time-active__watch-icon {
  display: flex;
  justify-content: center;
  align-items: center;
}

.round-container{
    display: flex;
    justify-content: space-between;
    width: 100%;
    border: 1px solid #a1a1a1;
    margin-bottom: 25px;
}
.round-container_active{
    min-height: 50px;
}

.round-unsuccessful-container {
   min-height: 60px;
   background-color: #e9e9e9;
   font-family: 'Montserrat', sans-serif;
   font-weight: 600;
   display: flex;
   justify-content: center;
   align-items: center;
   font-size: 16px;
}

.round-container_completed{
    margin-top: 10px;
}

.round-container_bid_active-round {
    background-color: #e7f5ac !important;
}

.round-container_time-active{
    margin-left: -40px;
    width: 20%;
    display: flex;
    justify-content: space-between;
}

.round-container_participant-completed {
    width: 89%;
    display: flex;
    justify-content: space-between;
    height: 90%;
    align-items: center;
}

.round-container_time-completed{
    display:flex;
    justify-content: center;
}

.order-of-bidder {
   text-transform:none;
}

.round-container__time-patricipant{
    width: 70%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-family: 'Montserrat', sans-serif;
    font-size: 18px;
    font-weight: 500;
    min-height: 50px;
}

.round-container_active-round {
   background-color: #e7f5ac;
}

.round-container__time-patricipant-active{
    margin: auto;
    margin-left: 1px;
    background-color: #e7f5ac;
}

.round-container__time-patricipant-not-set {
   justify-content: initial;
}
.round-container_time__watch {
    font-size: 18px;
    font-weight: 300;
    font-family: 'Oswald', sans-serif;
    display: flex;
    align-items: center
}


.round-container_bid{
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 30%;
    background-color: #e9e9e9;
}

.round-container_bid_not-set {
    position: relative;
    background-color: initial;
}

.watch-in-round{
    width: 27px;
    height: 27px;
    margin-right: 12px;
    margin-left: 3px;
}

.watch-in-round-not-set {
    margin-right: 20px;
    margin-left: 20px;
}

.line {
    width: 112px;
    height: 47px;
    border-bottom: 1px solid black;
    position: absolute;
    bottom: 40%; 
}

.round-container_bid__amount {
    font-family: 'Oswald', sans-serif;
    font-size: 20px;
    font-weight: 400;
}

.round-container_bid_active{
    margin: auto;
    margin-right: 1px;
}

.round-container_participant_active{
    width: 35%;
    text-align: center;
    font-family: 'Montserrat', sans-serif;
    font-size: 15px;
    font-weight: 800;
    line-height: 21.18px;
}

.max-round-container{
    margin-top: 30px;
}

.round-container_max{
    background-color: #e7f5ac;
    margin-top: 15px;
    padding-left: 5px;
}

.round-container_participant__order-number{
    display: flex;
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
    font-weight: 400;
}

.round-container_participant-expended {
    font-family: 'Montserrat', sans-serif;
    font-size: 13px;
    font-weight: 600;
    text-transform: uppercase;
    width: 90%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-right: 10px;
    justify-content: center;
}

.round-container_participant-expended_max {
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
}

.round-container_bid_max{
    background-color: #e7f5ac;
    justify-content: space-between;
}

.round-container_bid_max-block{
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ffffff;
    height: 100%;
    width: 17px;
    font-size: initial;
}

.round-container_bid_max__bid-count{
    margin: 0 auto;
}

.round-container_bid_max-block-count{
    transform: rotate(-90deg);
    color: #000000;
    font-family: 'Montserrat', sans-serif;
}

.round-label {
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    font-weight: 600;
    line-height: 16px;
    margin-bottom: 10px;
}

.announcement {
    font-size: 16px;
    font-weight: 500;
    font-family: 'Roboto', sans-serif;
}

.word-winner {
  text-transform: uppercase;
}

@media screen and (max-width: 768px) {
  .watch-in-round{
    margin-right: 14px;
 }
 .line {
    position: relative;
}
}

@media screen and (max-width: 478px) {
  .round-container{
    flex-direction: column;
 }

 .round-container_bid {
    width: 100%;
    margin: 0;
    height: 50%;
 }
 .round-container__time-patricipant {
    width: 100%;
    margin: auto;
 }
 .round-container_completed-not-set {
   flex-direction: row;
 }

 .round-container_completed {
   min-height: 90px;
 }

 .round-container__time-patricipant-not-set {
   justify-content: space-around;
 }

 .round-container_max {
   margin-top: 0;
   padding-left: 0;
 }
 .round-container_bid_max{
   flex-direction: column;
 }

 .round-container_bid_max-block-count {
   transform: rotate(360deg);
 }

 .round-container_bid_max-block {
   height: 20px;
   width: 100%; 
 }

 .round-container__time-patricipant-active {
   height: 90px;
   margin-left: 0;
   justify-content: center;
 }
}

</style>