<template>
  <div class="app-wrapper">
    <app-modal-info-window
      v-show="showOrHide"
      :auction-id="auctionId"
      :start-bid="startBid"
      :browser-id="browserId"
      :company-name="companyName"
      :description-of-products="descriptionOfProducts" />
    <header class="header_container">
      <app-timer 
        :date="dateOfAuction.date"
        :time-status="statusMessage[state].timeStatus"
        :state="state"
        @checkTimeOut="checkTimeOut"
        @getRemainedTimeofRound="getRemainedTimeofRound"
        @getCurrentTime="getCurrentTime"
        @showOrHideModalWindow="showOrHideModalWindow" />
      <app-status-info-label 
        :type="statusMessage[state].type"
        :text-status="statusMessage[state].textStatus"
        :bids-arr="bidsArr"
        :state="state"
        :remained-time-of-round="remainedTimeOfRound" />
    </header>
    <app-status-timer-line 
      v-if="state == 'active' && (remainedTimeOfRound > 0)"
      :duration-of-round="durationOfRound"
      :remained-time-of-round="remainedTimeOfRound"
      :state="state" />
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
      <app-pouch-couch />
      <app-list-initial-offers v-if="(state === 'pendingOfAuction' || state === 'active') && (remainedTimeOfRound < 300)" :initial-bids-arr="initialBidsArr" />
      <app-list-of-rounds-active v-if="state == 'active' || state == 'pendingOfRound'" 
                                 :round-arr="roundArr"
                                 :round="round"
                                 :bids-arr="bidsArr"
                                 :start-bid="startBid"
                                 :current-bid="stages[1].amount"
                                 :current-time="currentTime"
                                 :pause-time="stages[0].start"
                                 :remained-time-of-round="remainedTimeOfRound"
                                 :duration-of-round="durationOfRound"
                                 :state="state">
        {{ changeStateFromUrl }}
      </app-list-of-rounds-active>
      <app-list-of-rounds-completed v-if="state == 'completed'" 
                                    :round-arr="roundArr"
                                    :round="round"
                                    :bids-arr="bidsArr"
                                    :start-bid="startBid"
                                    :current-bid="stages[1].amount"
                                    :current-time="currentTime" />
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
                                   :bids-arr="bidsArr"
                                   :current-bid="stages[1].amount"
                                   @addNewBid="addNewBid"
                                   @calculateCurrentBid="calculateCurrentBid"
                                   @holdRoundTime="holdRoundTime" />
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
import AppListOfRoundsActive from '../components/ListOfRoundsActive';
import AppListOfRoundsCompleted from '../components/ListOfRoundsCompleted';
import AppPouchCouch from '../components/PouchCouch';
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
    AppListOfRoundsActive,
    AppListOfRoundsCompleted,
    AppPouchCouch
  },
  props: {
    id: {
      type: String,
      default: null
    },
  },
  data(){
    return {
      state: 'active',
      showOrHide: false,
      showHongSoundsText: false,
      hongTrack: 'https://upload.wikimedia.org/wikipedia/en/4/45/ACDC_-_Back_In_Black-sample.ogg',
      timeOut: false,
      currentTime: '',
      pauseTime : '',
      browserId: 'b9c09979-7d7e-4ed5-81a7-730274f42e67',
      auctionId: this.$store.state.infoFromCouch.auctionId,
      companyName: 'AT "УКРГАЗВИДОБУВАННЯ :UA-EA-2018-07-27-000020-B aasdasdasas',
      descriptionOfProducts: 'Відпрацьовані акамуляторні батареї заправлені електролітом - 8.956 тонн',
      remainedTimeOfRound: 180,
      dateOfAuction: {
        date: Math.trunc(Date.parse(this.$store.state.infoFromCouch.stages[0].start) / 1000),
      },
      durationOfRound: 180,
      stoppingTimeOfRound: 10,
      startBid: this.$store.state.infoFromCouch.initial_value,
      currentBid: 100.85,
      bidsArr: [],
      initialBidsArr: [100, 130, 150, 154],
      round: 1,
      roundArr: [],
      stages: [
        {
          start: this.$store.state.infoFromCouch.stages[0].start,
          type: this.$store.state.infoFromCouch.stages[0].type
        },
        {
          amount: this.$store.state.infoFromCouch.stages[1].amount,
          start: this.$store.state.infoFromCouch.stages[1].start,
          time: this.$store.state.infoFromCouch.stages[1].time,
          type: this.$store.state.infoFromCouch.stages[1].type
        }
      ],
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
      },
    };
  },
  computed: {
    changeStateFromUrl() {
      this.state = this.id;
    },
  },
  mounted() {
    window.scrollTo(0, document.body.scrollHeight);
  },
  methods: {
    addNewBid(bid) {
      this.currentBid = bid * 1.05;
      this.bidsArr.push(bid);
      this.roundArr.push(this.round);
      this.round++;
      this.dateOfAuction.date = this.currentTime + this.durationOfRound;
    },

    calculateCurrentBid(bid) {
      this.currentBid = bid * 1.05;
      this.dateOfAuction.date = this.currentTime + this.durationOfRound;
    },

    holdRoundTime() {
      this.dateOfAuction.date = Math.trunc(Date.parse(this.stages[1].start)/1000);
      this.state = 'pendingOfRound';
    },

    checkTimeOut(res) {
      if(res){
        window.scrollTo(0, document.body.scrollHeight);
      }
      if (res && this.state === 'pendingOfAuction' || res && this.state === 'pendingOfRound' ) {
        this.state = 'active';
        this.dateOfAuction.date = this.dateOfAuction.date + this.durationOfRound;
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
