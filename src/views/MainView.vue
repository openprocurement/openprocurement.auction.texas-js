<template>
  <div class="app-wrapper">
    <app-modal-info-window
      v-show="showOrHide"
      :auction-id="auctionId"
      :start-bid="startBid"
      :browser-id="browserId"
      :company-name="companyName"
      :minimal-step="minimalStep"
      :description-of-products="descriptionOfProducts" />
    <header class="header_container">
      <app-timer 
        :date="dateOfStartRoundOrAuction"
        :time-status="statusMessage[state].timeStatus"
        :state="state"
        :end-date="endDate"
        @checkTimeOut="checkTimeOut"
        @getRemainedTimeofRound="getRemainedTimeofRound"
        @getCurrentTime="getCurrentTime"
        @showOrHideModalWindow="showOrHideModalWindow" />
      <app-status-info-label 
        :type="statusMessage[state].type"
        :text-status="statusMessage[state].textStatus"
        :state="state"
        :count-rounds="countRounds"
        :remained-time-of-round="remainedTimeOfRound" />
    </header>
    <app-status-timer-line 
      :remained-time-of-round="remainedTimeOfRound"
      :current_stage="current_stage"
      :stages="stages"
      :current-time="currentTime" />
    <app-hong-audio-track v-if="state === 'active'" :hong-track="hongTrack" />
    <app-hong-sounds-text v-if="state == 'active' && showHongSoundsText" />
    <main class="container container-main">
      <div class="container-main__tender-number">
        <div class="container-main__image-container">
          <img src="/static/images/numberOfTender_icon.png" alt="number-Of-tender">
        </div>
        {{ auctionId }}
      </div>
      <div class="container-main__discribe-tender">
        <div class="container-main__discribe-tender_company-name">
          {{ companyName }}
        </div>
        <ul class="container-main__discribe-tender_description-products">
          <li>
            {{ descriptionOfProducts }}
          </li>
        </ul>
      </div>
      <app-start-bid :start-bid="startBid" />
      <app-list-initial-offers v-if="(state !== 'completed')" :initial-bids-arr="initialBidsArr" />
      <app-list-of-rounds v-if="state == 'active' || state == 'pendingOfRound' || state == 'completed'" 
                          :start-bid="startBid"
                          :current-time="currentTime"
                          :remained-time-of-round="remainedTimeOfRound"
                          :state="state" 
                          :current_stage="current_stage"
                          :round-arr="roundArr"
                          :stages="stages" />
    </main>
    <footer v-if="state !== 'completed'" 
            :class="'footer-container_' + state" class="footer-container">
      <h4 v-if="state == 'pendingOfRound'">
        {{ $t('Waiting for start of round') }}
      </h4>
      <h4
        v-else-if="state == 'pendingOfAuction'">
        {{ $t('Waiting for start of auction') }}
      </h4>
      <app-increasing-and-approval v-else-if="state == 'active'"
                                   :start-bid="startBid"
                                   :current-bid="currentBid"
                                   @holdRoundTime="holdRoundTime" />
    </footer>
  </div>
</template>
r
<script>
// We store the reference to the SSE object out here
// so we can access it from other methods
let msgServer;
import AppHongSoundsText from '../components/HongSoundsText';
import AppStartBid from '../components/StartBid';
import AppTimer from '../components/Timer';
import AppStatusTimerLine from '../components/StatusTimerLine';
import AppHongAudioTrack from '../components/HongAudioTrack';
import AppModalInfoWindow from '../components/ModalInfoWindow';
import AppListInitialOffers from '../components/ListInitialOffers';
import AppStatusInfoLabel from '../components/StatusInfoLabel';
import AppIncreasingAndApproval from '../components/IncreasingAndApproval';
import AppListOfRounds from '../components/ListOfRounds';
import getAuctionRequest from '../utils/getRequest'

export default {
  components :{
    AppHongSoundsText,
    AppStartBid,
    AppTimer,
    AppStatusTimerLine,
    AppHongAudioTrack,
    AppModalInfoWindow,
    AppListInitialOffers,
    AppStatusInfoLabel,
    AppIncreasingAndApproval,
    AppListOfRounds
  },
  data(){
    return {
      stages: [{}],
      current_stage: 0,
      current_type: 'english',
      countRounds: 0,
      roundArr: [],
      state: 'active',
      endDate: null,
      showOrHide: false,
      showHongSoundsText: false,
      auctionId: '',
      hongTrack: 'https://upload.wikimedia.org/wikipedia/en/4/45/ACDC_-_Back_In_Black-sample.ogg',
      timeOut: false,
      currentTime: null,
      browserId: '',
      companyName: '',
      descriptionOfProducts: '',
      remainedTimeOfRound: 180,
      currentBid: null,
      startBid: null,
      minimalStep: null,
      dateOfStartRoundOrAuction: null,
      initialBidsArr: [],
      statusMessage: {
        active: {
          type: 'active',
          textStatus: 'Round',
          timeStatus: 'until the round ends',
        },
        pendingOfAuction: {
          type: 'pending-of-auction',
          textStatus: 'Waiting',
          timeStatus: 'until the auction starts',
        },

        pendingOfRound: {
          type: 'pending-of-round',
          textStatus: 'Waiting',
          timeStatus: 'until the round starts',
        },
        completed: {
          type: 'completed',
          textStatus: 'Completed',
          timeStatus: 'Аuction was completed',
        },

        canceled: {
          type: 'canceled',
          textStatus: 'Canceled',
          timeStatus: 'Аuction was canceled',
        },
        redefined: {
          type: 'redefined',
          textStatus: 'Waiting',
          timeStatus: 'Auction has not started and will be rescheduled',
        },
      },
    };
  },
  watch: {
    current_stage () {
      if(this.current_stage === -100){
        this.state = 'canceled'
      }
      else if(this.current_stage === -101){
        this.state = 'redefined'
      }
      else if(this.current_stage === -1){
        this.state = 'pendingOfAuction';
        this.dateOfStartRoundOrAuction = Math.trunc(Date.parse(this.stages[0].start) / 1000);
      }
      else{
        if(this.stages[this.current_stage].type !== 'pause'){
          this.state = 'active';
          this.dateOfStartRoundOrAuction = Math.trunc(Date.parse(this.stages[this.current_stage].planned_end) / 1000);
        }
        else if(this.stages[this.current_stage].type === 'pause'){
          this.state = 'pendingOfRound';
          this.dateOfStartRoundOrAuction = Math.trunc(Date.parse(this.stages[this.current_stage + 1].start) / 1000)
        }
      }
      this.stages.map((item)=>{
        if ((Object.keys(item)).length === 5){
          this.countRounds ++
          this.roundArr.push(item)
        }})
      if(this.current_stage !== -1){
        this.currentBid = this.stages[this.current_stage].amount;
      }
    },
    current_type(){
      if(this.current_type === 'announcement'){
        this.state = 'completed'
      }
    }
  },
  created() {
    getAuctionRequest(this, this.id)
  },
  mounted() {
    //scrolling on bottom
    window.scrollTo(0, document.body.scrollHeight);
    // init event-source
    this.$sse(this.$store.state.urls.eventSource, { withCredentials: true, format: 'json' })
      .then(sse => {
        // Store SSE object at a higher scope
        msgServer = sse;
        // Catch any errors (ie. lost connections, etc.)
        // Listen for messages based on their event
        sse.subscribe('ClientsList', (e) => {
          console.log(e)
        });

        sse.subscribe('Tick', (e) => {
          console.log(e)
        });

        sse.subscribe('Identification', (e) => {
          this.$store.commit('setIdentificationInfo', e.data)
          console.log(e)
        });

        sse.subscribe('RestoreBidAmount', (e) => {
          console.log(e)
        });

        sse.subscribe('KickClient', (e) => {
          console.log(e)
        });

        sse.subscribe('Close', (e) => {
          console.log(e)
        });
      })
      .catch(err => {
        // When this error is caught, it means the initial connection to the
        // events server failed.  No automatic attempts to reconnect will be made.
        console.error('Failed to connect to server', err);
      });

  },
  beforeDestroy() {
    // Make sure to close the connection with the events server
    // when the component is destroyed, or we'll have ghost connections!
    msgServer.close();
  },
  methods: {
    holdRoundTime() {
      this.state = 'pendingOfRound';
      this.dateOfStartRoundOrAuction = Math.trunc(Date.parse(this.stages[this.current_stage + 1].start)/1000);
    },
    checkTimeOut(res) {
      if(res){
        window.scrollTo(0, document.body.scrollHeight);
      }
      if (res && this.state === 'pendingOfAuction') {
        this.state ='pendingOfRound'
      }
      else if(res && this.state === 'pendingOfRound'){
        this.state = 'active'
      }
      else if (res) {
        this.state = 'completed';
      }
    },
    getRemainedTimeofRound(remainedTime) {
      this.remainedTimeOfRound = remainedTime;
    },
    getCurrentTime(currentTime) {
      this.currentTime = currentTime;
    },
    showOrHideModalWindow() {
      this.showOrHide = !this.showOrHide;
    },
  },
};
</script>

<style>

  .app-wrapper{
    background: white;
  }

  footer{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    text-align: center;
  }

.header_container{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 95px;
    background-color: #ffffff;
    box-shadow: 0 4px 9px 1px rgba(29, 29, 29, 0.09);
    display: flex;
    justify-content: space-between;
    align-items: center;
    }

.container-main{
    margin-bottom: 250px;
    margin-top: 120px;
}

.footer-container{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-color: #e9e9e9;
    border-top: 3px solid #d9d9d9;
    height: 95px;
}

.footer-container_active{
    height: 200px;
}

.container-main__tender-number{
    display: flex;
    color: #000000;
    font-family: Roboto;
    font-size: 20px;
    font-weight: 500;
    line-height: 26px;
    margin-bottom: 10px;
}

.container-main__image-container{
    margin-right: 15px;
}

</style>
