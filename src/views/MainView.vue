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
        :current-round-number="currentRoundNumber"
        :remained-time-of-round="remainedTimeOfRound" />
    </header>
    <app-status-timer-line 
      :remained-time-of-round="remainedTimeOfRound"
      :current-stage="currentStage"
      :stages="stages"
      :current-time="currentTime" />
    <app-hong-audio-track v-if="currentStage === 0" :browser-name="browserName" />
    <app-hong-sounds-text v-if="state == 'active' && showHongSoundsText" />
    <app-notification/>
    <main class="container-wrapper container-main">
      <div class="container-main__tender-number">
        <div class="container-main__image-container">
          <img src="/static_texas/images/number-of-tender_icon.svg" alt="number-Of-tender">
        </div>
        {{ auctionId }}
      </div>
      <div class="container-main__discribe-tender">
        <div class="container-main__discribe-tender_desc container-main__discribe-tender_company-name">
          {{ companyName }}
        </div>
        <ul class="container-main__discribe-tender_desc container-main__discribe-tender_description-products">
          <li>
            {{ descriptionOfProducts }}
          </li>
        </ul>
      </div>
      <app-start-bid :start-bid="startBid" />
      <app-list-initial-offers :initial-bids-arr="initialBidsArr" />
      <app-list-of-rounds v-if="state == 'active' || state == 'pendingOfRound' || state == 'completed'" 
                          :start-bid="startBid"
                          :current-time="currentTime"
                          :remained-time-of-round="remainedTimeOfRound"
                          :state="state" 
                          :current-stage="currentStage"
                          :initial-bids-arr="initialBidsArr"
                          :stages="stages" 
                          @getCurrentRoundNumber="getCurrentRoundNumber" />
    </main>
    <footer v-if="state !== 'completed'" 
            :class="'footer-container_' + state" class="footer-container">
      <h4 v-if="state == 'pendingOfRound'" class = "footer-container__text">
        {{ $t('Waiting for start of round') }}
      </h4>
      <h4
        v-else-if="state == 'pendingOfAuction'" class = "footer-container__text">
        {{ $t('Waiting for start of auction') }}
      </h4>
      <app-increasing-and-approval v-else-if="isShowBidForm"
                                   :start-bid="startBid"
                                   :current-bid="currentBid"
                                   :minimal-step="minimalStep"
                                   @sentBid="holdRoundTime" />
    </footer>
  </div>
</template>
<script>
import AppHongSoundsText from '../components/HongSoundsText';
import AppStartBid from '../components/StartBid';
import AppTimer from '../components/Timer';
import AppStatusTimerLine from '../components/StatusTimerLine';
import AppHongAudioTrack from '../components/HongAudioTrack';
import AppModalInfoWindow from '../components/ModalInfoWindow';
import AppListInitialOffers from '../components/ListInitialOffers';
import AppStatusInfoLabel from '../components/StatusInfoLabel';
import AppIncreasingAndApproval from '../components/IncreasingAndApproval';
import AppNotification from '../components/Notification';
import AppListOfRounds from '../components/ListOfRounds';
import getAuctionRequest from '../utils/getRequest';
import parseCurrentStage from '../utils/parseCurrentStage';
import {getCookieByName} from '@/utils/utils';
import PouchDBSync from '../utils/CouchPouch';
import EventSource from '../utils/eventSource';


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
    AppListOfRounds,
    AppNotification
  },
  props: {
    id: {
      type: String,
      required: true
    },
  },
  data(){
    return {
      stages: [{}],
      currentRoundNumber: null,
      currentStage: -1,
      currentType: 'english',
      state: 'active',
      endDate: null,
      showOrHide: false,
      showHongSoundsText: false,
      auctionId: '',
      browserName: '',
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
        pendingSyncData: {
          type: 'pending-sync-data',
          textStatus: 'Waiting',
          timeStatus: 'Waiting for synchronization of data',
        },
      },
    };
  },
  computed: {
    isShowBidForm () {
      if (this.$store.state.identification.bidderID && this.state === 'active') return true
      return false
    }
  },
  watch: {
    currentStage(){
      parseCurrentStage(this.stages, this.currentStage, this)
      if (true){
        dataLayer.push({
          "tenderId": 222,
          "lotId": 55
        });
      } 
      else {
        dataLayer.push({
          "tenderId": 788
        });
      }
    }
  },
  created() {
    this.$store.commit('setAuctionUUID', this.id)
    getAuctionRequest(this, this.$store.state.id)
    PouchDBSync.initialize(this)
  },
  mounted() {
    //scrolling on bottom
    window.scrollTo(0, document.body.scrollHeight);
    // init event-source
    if (EventSource.ableToSubscribe()) {
      EventSource.initialize(this)
    }
  },
  beforeDestroy() {
    // Make sure to close the connection with the events server
    // when the component is destroyed, or we'll have ghost connections!
    EventSource.evtSrc.close();
  },
  methods: {
    holdRoundTime() {
      getAuctionRequest(this, this.$store.state.id)
    },
    checkTimeOut() {
      this.state = 'pendingSyncData'
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
    getCurrentRoundNumber(currentRoundNumber) {
      this.currentRoundNumber = currentRoundNumber;
    },
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Lato|Montserrat|Oswald|Roboto');

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

.container-wrapper {
    max-width: 1200px;
    padding-right: 40px;
    padding-left: 40px;
    margin-right: auto;
    margin-left: auto;
}

@media screen and (max-width: 1400px) {
  .container-wrapper{
    max-width: 1200px;
  }
}

@media screen and (max-width: 1200) {
  .container-wrapper {
    max-width: 1140px;
  }
}

@media screen and (max-width: 992px) {
  .container-wrapper {
    max-width: 960px;
  }
  .modal-container-wrapper {
    width: 270px !important;
}
}

@media screen and (max-width: 768px) {
  .container-wrapper {
    max-width: 720px;
  }
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

.footer-container__text {
    font-size: 16px;
    font-weight: 700;
    line-height: 25.5px;
    text-transform: uppercase;
    font-family: 'Roboto', sans-serif;
}

.footer-container_active{
    height: 200px;
}

.container-main__tender-number{
    display: flex;
    color: #000000;
    font-family: 'Roboto', sans-serif;
    font-size: 20px;
    font-weight: 600;
    line-height: 26px;
    margin-bottom: 10px;
}

.container-main__image-container{
    margin-right: 15px;
}

.container-main__discribe-tender_desc {
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
    font-weight: 400;
    line-height: 23px;
}

.container-main__discribe-tender_company-name {
    text-transform: uppercase;
  
}

</style>