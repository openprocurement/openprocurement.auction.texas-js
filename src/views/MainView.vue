<template>
<div class="app-wrapper">
    <app-modal-info-window
            v-show="showOrHide"
            :tenderNumber="tenderNumber"
            :startRate="startRate"
            :browserId="browserId"
            :companyName="companyName"
            :descriptionOfProducts="descriptionOfProducts"
            >
              </app-modal-info-window>
    <header class="header_container">
          <app-timer 
          @checkTimeOut="checkTimeOut"
          @getRemainedTimeofRound="getRemainedTimeofRound"
          @getCurrentTime="getCurrentTime"
          :date="dateOfAuction.date"
          :timeStatus="statusMessage[state].timeStatus"
          :state="state"
          @showOrHideModalWindow="showOrHideModalWindow"
          >
            </app-timer>
      <app-status-info-label 
      :type="statusMessage[state].type"
      :textStatus="statusMessage[state].textStatus"
      :round="round"
      :state="state"
      :remainedTimeOfRound="remainedTimeOfRound"
      >
        </app-status-info-label>
    </header>
        <app-status-timer-line 
        v-if="state == 'active'"
        :durationOfRound="durationOfRound"
        :remainedTimeOfRound="remainedTimeOfRound"
        :state="state"
        >
          </app-status-timer-line>
                  <app-hong-sounds-text
                  v-if="state == 'active'"
                  >
      </app-hong-sounds-text>
    <main class="container container-main">
      <app-hong-audio-track
      v-if="state === 'active'"
      :hongTrack="hongTrack"
      >
        </app-hong-audio-track>
        <div class="container-main__tender-number">
          <div class="container-main__image-container">
            <img src="/static/images/numberOfTender_icon.png" alt="number-Of-tender">
          </div>
        {{tenderNumber}}
        </div>
        <div class="container-main__discribe-tender">
          <div class="container-main__discribe-tender_company-name">
            {{companyName}}
          </div>
          <ul class="container-main__discribe-tender_description-products">
            <li>
            {{descriptionOfProducts}}
            </li>
          </ul>
        </div>
        <app-start-rate 
        :startRate="startRate">
          </app-start-rate>

          <app-list-initial-offers 
          :rateArr="rateArr"
          v-if="state == 'pendingOfAuction' && (remainedTimeOfRound < 300)" >
          </app-list-initial-offers>

          <app-list-of-rounds-active v-if="state == 'active' || state == 'pendingOfRound'" 
          :roundArr="roundArr"
          :round="round"
          :rateArr="rateArr"
          :startRate="startRate"
          :currentRate="currentRate"
          :currentTime="currentTime"
          :remainedTimeOfRound="remainedTimeOfRound"
          :durationOfRound='durationOfRound'
          :state="state"
          >
          {{changeStateFromUrl}}
          </app-list-of-rounds-active>

           <app-list-of-rounds-completed v-if="state == 'completed'" 
          :roundArr="roundArr"
          :round="round"
          :rateArr="rateArr"
          :startRate="startRate"
          :currentRate="currentRate"
          :currentTime="currentTime"
          >
          </app-list-of-rounds-completed>
    </main>
    <footer  v-if="state !== 'completed'" class="footer-container">
          <h4
        v-if="state == 'pendingOfRound'">
        Очікується початок раунду
        </h4>

        <h4
        v-else-if="state == 'pendingOfAuction'"
        >Очікується початок аукціону
        </h4>

       <app-increasing-and-approval v-else-if="state == 'active'"
       @addNewRate="addNewRate"
       @calculateCurrentRate="calculateCurrentRate"
       @holdRoundTime="holdRoundTime"
       :startRate="startRate"
       :currentRate="currentRate"
       :rateArr="rateArr"
       >
         </app-increasing-and-approval>
    </footer>
</div>
</template>


<script>
import AppHongSoundsText from '../components/HongSoundsText';
import AppStartRate from '../components/StartRate';
import AppTimer from '../components/Timer';
import AppStatusTimerLine from '../components/StatusTimerLine';
import AppHongAudioTrack from '../components/HongAudioTrack';
import AppModalInfoWindow from '../components/ModalInfoWindow';
import AppListInitialOffers from '../components/ListInitialOffers';
import AppStatusInfoLabel from '../components/StatusInfoLabel';
import AppIncreasingAndApproval from '../components/IncreasingAndApproval';
import AppListOfRoundsActive from '../components/ListOfRoundsActive';
import AppListOfRoundsCompleted from '../components/ListOfRoundsCompleted';
export default {
  props: {
    id: {
      type: String,
    },
  },
  data(){
    return {
      state: 'active',
      showOrHide: false,
      hongTrack: 'https://upload.wikimedia.org/wikipedia/en/4/45/ACDC_-_Back_In_Black-sample.ogg',
      timeOut: false,
      currentTime: '',
      browserId: 'b9c09979-7d7e-4ed5-81a7-730274f42e67',
      tenderNumber: 'UA-EA-2018-07-27-000020-B',
      companyName: 'AT "УКРГАЗВИДОБУВАННЯ :UA-EA-2018-07-27-000020-B aasdasdasas',
      descriptionOfProducts: 'Відпрацьовані акамуляторні батареї заправлені електролітом - 8.956 тонн',
      remainedTimeOfRound: 180,
      dateOfAuction: {
        date: Math.trunc(Date.parse('Wed Aug 31 2018 15:24:35 GMT+0200 (EET)') / 1000),
      },
      durationOfRound: 180,
      stoppingTimeOfRound: 10,
      startRate: 100.65,
      currentRate: 100.85,
      rateArr: [1232, 5656, 465345, 4534, 3243 , 234],
      round: 1,
      roundArr: [],
      statusMessage: {
        active: {
          type: 'active',
          textStatus: 'Раунд  ',
          timeStatus: 'до закінчення раунду',
        },
        pendingOfAuction: {
          type: 'pending-of-auction',
          textStatus: 'Очікується',
          timeStatus: 'до початку аукціону',
        },

        pendingOfRound: {
          type: 'pending-of-round',
          textStatus: 'Очікується',
          timeStatus: 'до початку раунду',
        },
        completed: {
          type: 'completed',
          textStatus: 'Завершений',
          timeStatus: 'аукціон завершився',
        },

        canceled: {
          type: 'canceled',
          textStatus: 'Скасований',
          timeStatus: 'аукціон скасований',
        },
      },
    };
  },
  methods: {
    addNewRate(rate) {
      this.currentRate = rate * 1.05;
      this.rateArr.push(rate);
      this.roundArr.push(this.round);
      this.round++;
      this.dateOfAuction.date = this.currentTime + this.durationOfRound;
    },

    calculateCurrentRate(rate) {
      this.currentRate = rate * 1.05;
      this.dateOfAuction.date = this.currentTime + this.durationOfRound;
    },

    holdRoundTime() {
      this.dateOfAuction.date = this.currentTime + this.stoppingTimeOfRound;
      this.state = 'pendingOfRound';
    },

    checkTimeOut(res) {
      this.timeOut = res;
      if (res) {
        this.dateOfAuction.date = this.dateOfAuction.date + this.durationOfRound;
        this.state = 'active';
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
    computed: {
    changeStateFromUrl() {
      this.state = this.id;
    },
  },
  mounted() {
    window.scrollTo(0, document.body.scrollHeight);
  },
  components :{
    AppHongSoundsText,
    AppStartRate,
    AppTimer,
    AppStatusTimerLine,
    AppHongAudioTrack,
    AppModalInfoWindow,
    AppListInitialOffers,
    AppStatusInfoLabel,
    AppIncreasingAndApproval,
    AppListOfRoundsActive,
    AppListOfRoundsCompleted
  }
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
    height: 95px;
    background-color: #e9e9e9;
    border-top: 3px solid #d9d9d9;
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
