<template>
  <div class="app-wrapper">
    <app-return-button v-if="$store.state.identification.returnURL"/>
    <app-modal-info-window
      v-show="showOrHide"
      :tender-titles="tenderTitles"
      :auction-id="auctionId"
      :start-price="startPrice"
      :browser-id="browserId"
      :company-name="companyName"
      :minimal-step="minimalStep"
      :description-of-products="descriptionOfProducts"
      @showOrHideModalWindow="showOrHideModalWindow" />
    <header class="header_container">
      <app-timer 
        :date="endTimerDate"
        :current-type="currentType"
        :time-status="statusMessage[state].timeStatus"
        :state="state"
        :end-date="endDate"
        :synced-time="lastSync"
        @stateUpdate="stateUpdate"
        @checkTimeOut="checkTimeOut"
        @getRemainedTimeofRound="getRemainedTimeofRound"
        @getCurrentTime="getCurrentTime"
        @showOrHideModalWindow="showOrHideModalWindow"
        @hideModalWindow="hideModalWindow" />
      <app-status-info-label 
        :current-type="currentType"
        :type="statusMessage[state].type"
        :text-status="statusMessage[state].textStatus"
        :state="state"
        :results="results"
        :current-round-number="currentRoundNumber"
        :remained-time-of-round="remainedTimeOfRound" />
    </header>
    <app-status-timer-line v-if="$store.state.terminatedStates.indexOf(state) === -1 && state !== 'pendingSyncData'"
                           :remained-time-of-round="remainedTimeOfRound"
                           :current-stage="currentStage"
                           :stages="stages"
                           :current-time="currentTime" />
    <app-hong-audio-track v-if="currentStage === 0" :browser-name="browserName" />
    <app-hong-sounds-text v-if="currentStage === 0" />
    <app-notification/>
    <main class="container-wrapper container-main">
      <div class="container-main__tender-number">
        <div class="container-main__image-container">
          <svg class="number-of-tender_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20.83 22.12"><path d="M25,10.57a.66.66,0,0,0-.64-.68H20a.66.66,0,0,1-.64-.68V4.62a.66.66,0,0,0-.64-.68H14.1a1,1,0,0,0-1,1V8.52l0,0,3.74,4a1.73,1.73,0,0,1,.47,1.2h0V20.6h6.69a1,1,0,0,0,1-1v-9Zm0,0" transform="translate(-4.2 -3.94)" fill="#99ba3c"/><path d="M21.2,4a.32.32,0,0,0-.55.24v4A.33.33,0,0,0,21,8.6h3.74A.34.34,0,0,0,24.94,8Zm0,0" transform="translate(-4.2 -3.94)" fill="#99ba3c"/><path d="M5.17,26.06h10a1,1,0,0,0,1-1V16.13a.66.66,0,0,0-.64-.68H11.07a.66.66,0,0,1-.64-.68V10.08a.66.66,0,0,0-.64-.68H5.17a1,1,0,0,0-1,.82V24.83a1.64,1.64,0,0,0,.09.54.93.93,0,0,0,.88.68Zm0,0" transform="translate(-4.2 -3.94)" fill="#99ba3c"/><path d="M12,14.06h3.74a.33.33,0,0,0,.32-.34.35.35,0,0,0-.09-.24l-2.87-3-.87-.92A.3.3,0,0,0,12,9.4a.33.33,0,0,0-.32.34v4a.33.33,0,0,0,.32.34Zm0,0" transform="translate(-4.2 -3.94)" fill="#99ba3c"/></svg>
        </div>
        {{ auctionId }}
      </div>
      <div class="container-main__discribe-tender">
        <div class="container-main__discribe-tender_desc container-main__discribe-tender_company-name">
          {{ companyName }} : {{ tenderTitles[`tenderTitle_${$store.state.i18n.locale}`] || tenderTitles['tenderTitle_uk'] }}
        </div>
        <ul class="container-main__discribe-tender_desc container-main__discribe-tender_description-products">
          <li>
            {{ descriptionOfProducts[`description_${$store.state.i18n.locale}`] || descriptionOfProducts['description_uk'] }}
          </li>
        </ul>
      </div>
      <app-start-bid :start-price="startPrice" />
      <app-list-initial-offers :price-offers="priceOffers" />
      <app-list-of-rounds v-if="state == 'active' || state == 'pendingOfRound' || state == 'completed' || state == 'preAnnouncement'" 
                          :start-price="startPrice"
                          :results="results"
                          :current-time="currentTime"
                          :remained-time-of-round="remainedTimeOfRound"
                          :state="state" 
                          :current-stage="currentStage"
                          :price-offers="priceOffers"
                          :stages="stages" 
                          @getCurrentRoundNumber="getCurrentRoundNumber" />
    </main>
    <footer v-if="state !== 'completed' && !showLoginForm && $store.state.identification.bidderID !== ''" 
            :class="'footer-container_' + state" class="footer-container">
      <h4 v-if="state == 'pendingOfRound'" class = "footer-container__text">
        {{ $t('Waiting for start of round') }}
      </h4>
      <h4
        v-else-if="state == 'pendingOfAuction'" class = "footer-container__text">
        {{ $t('Waiting for start of auction') }}
      </h4>
      <app-increasing-and-approval v-else-if="isShowBidForm"
                                   :start-price="startPrice"
                                   :current-bid="currentBid"
                                   :minimal-step="minimalStep"
                                   @sentBid="holdRoundTime" />
    </footer>
    <footer v-else />
    <app-footer-login v-if="showLoginForm"
                      :allowed-login="loginAllowed"/>
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
import {getAuctionRequest} from '../utils/getRequest';
import AppFooterLogin from '../components/FooterLogin';
import AppReturnButton from '../components/ReturnButton'
import parseCurrentStage from '../utils/parseCurrentStage';
import {getCookieByName} from '@/utils/utils';
import PouchDBSync from '../utils/CouchPouch';
import EventSource from '../utils/eventSource';
import axios from 'axios'


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
    AppFooterLogin,
    AppNotification,
    AppReturnButton
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
      results: [],
      pouchDB: null,
      isListeningOnChanges: false,
      currentRoundNumber: null,
      currentStage: -1,
      currentType: 'english',
      state: 'pendingSyncData',
      endDate: null,
      showOrHide: false,
      auctionId: '',
      browserName: '',
      currentTime: null,
      lastSync: null,
      showLoginForm: false,
      loginAllowed: false,
      browserId: '',
      companyName: '',
      descriptionOfProducts: {},
      tenderTitles: {},
      remainedTimeOfRound: 180,
      currentBid: null,
      startPrice: null,
      minimalStep: null,
      endTimerDate: null,
      priceOffers: [],
      statusMessage: {
        active: {
          type: 'active',
          textStatus: 'Round',
          timeStatus: 'until the round ends',
        },
        pendingOfAuction: {
          type: 'pending',
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
          textStatus: 'Sold',
          timeStatus: 'auction is completed by the licitator',
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
          type: 'pending',
          textStatus: 'Waiting',
          timeStatus: 'Waiting for synchronization of data',
        },
        preAnnouncement:  {
          type: 'pending',
          textStatus: 'Waiting',
          timeStatus: "Waiting for the disclosure of the participants\' names"
        }
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
    currentStage () {
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
    this.pouchDB = PouchDBSync.initialize(this)
    this.$store.commit('setAuctionUUID', this.id)
    getAuctionRequest(this, this.$store.state.id)
  },
  mounted() {
    //GTM
    this.$gtm.trackView('MyScreenName', 'currentpath'); 
    //scrolling on bottom
    window.scrollTo(0, document.body.scrollHeight);
    // init event-source
    if (EventSource.ableToSubscribe()) {
      EventSource.initialize(this)
    } else {
      this.$notify({
        group: 'auth',
        text: this.$t('You are an observer and cannot bid.'),
        duration: -1
      })
    }
  },
  beforeDestroy() {
    // Make sure to close the connection with the events server
    // when the component is destroyed, or we'll have ghost connections!
    EventSource.evtSrc.close();
  },
  methods: {
    syncWithServerTime () {
      axios.get(`${this.$store.state.urls.serverURL}get_current_server_time`, {
        'params': {
          '_nonce': Math.random().toString()
        }
      }).then((data) => {
        this.lastSync = new Date(data.headers.date)
        let countdownSeconds = (new Date(this.stages[0].start) - this.lastSync) / 1000
        if (this.currentStage === -1) {
          if (countdownSeconds < 900) {
            if (!this.isListeningOnChanges) PouchDBSync.startSync(this)
          } else {
            setTimeout(PouchDBSync.startSync, (countdownSeconds - 900)  * 1000, this)
          }
        }
        if (this.currentStage >= -1 && this.$route.query.wait) {
          this.showLoginForm = true
          if (countdownSeconds < 900) {
            this.loginAllowed = true
          } else {
            this.loginAllowed = false
            setTimeout(() => {this.loginAllowed = true}, (countdownSeconds - 900) * 1000)
          }
        }
        if (!this.isListeningOnChanges && this.currentStage >= 0 && this.$store.state.terminatedStates.indexOf(this.state) === -1)
          PouchDBSync.startSync(this)
      }).catch((e) => {
        // log error
        console.log('get_current_server_time error')
      })
    },
    holdRoundTime() {
      getAuctionRequest(this, this.$store.state.id)
    },
    checkTimeOut() {
      this.state = 'pendingSyncData'
      if (this.currentStage === -1) {
        this.$notify({
          group: 'utils',
          text: this.$t('Please wait for the auction start.'),
          duration: 120000, // TODO: make logic to remove single notification
          type: 'warning'
        })
      }
    },
    getRemainedTimeofRound(remainedTime) {
      this.remainedTimeOfRound = remainedTime;
    },
    getCurrentTime(currentTime) {
      this.currentTime = currentTime;
    },
    hideModalWindow() {
      this.showOrHide = false
    },
    stateUpdate () {
      parseCurrentStage(this.stages, this.currentStage, this)
      this.$notify({
        clean: true,
        group: 'utils'
      })
    },
    showOrHideModalWindow(trigger) {
      if(trigger){
        this.showOrHide = true;
      }
      else {
        this.showOrHide = !this.showOrHide;
      }
    },
    getCurrentRoundNumber(currentRoundNumber) {
      this.currentRoundNumber = currentRoundNumber;
    },
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Lato|Montserrat|Oswald|Roboto');

 .footer-container_hide {
   display: none;
 }

  .number-of-tender_icon {
    width: 20px;
    height: 20px;
  }
  .app-wrapper{
    background: white;
    min-width: 324px;
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
    min-width: 324px;
    min-height: 95px;
    background-color: #ffffff;
    box-shadow: 0 4px 9px 1px rgba(29, 29, 29, 0.09);
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 2;
    }

.container-main{
    margin-bottom: 250px;
    margin-top: 120px;
}

.container-wrapper {
    max-width: 807px;
    padding-left: 20px;
    padding-right: 20px;
    margin-right: auto;
    margin-left: auto;
}

@media screen and (max-width: 1200px) {
   .modal-container-wrapper {
    width: 290px !important;
 }
}

@media screen and (max-width: 478px) {
  .container-wrapper {
    width: 100%;
    padding-right: 10px;
    padding-left: 10px;
  }
}

.footer-container{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-width: 324px;
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
    height: 220px;
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