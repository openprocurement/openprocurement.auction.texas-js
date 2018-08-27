<template>
<div id="app">
    <header class="header_container">
          <app-timer 
          @checkTimeOut="checkTimeOut"
          @getRemainedTimeofRound="getRemainedTimeofRound"
          @getCurrentTime="getCurrentTime"
          :date="dateOfAuction.date"
          :timeStatus="statusMessage[state].timeStatus"
          :state="state"
          >
            </app-timer>
      <app-status-info-label 
      :type="statusMessage[state].type"
      :textStatus="statusMessage[state].textStatus"
      :round="round"
      :state="state"
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
    <main class="container container-main">
      <app-hong-audio-track
      v-if="state === 'active'"
      :hongTrack="hongTrack"
      >
        </app-hong-audio-track>
        <div class="discribe-tender">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the 
        industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of t
        ype and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic 
        typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing 
        Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </div>
        <app-start-rate 
        :startRate="startRate">
          </app-start-rate>

          <app-list-of-rounds-active v-if="state == 'active'" 
          :roundArr="roundArr"
          :round="round"
          :rateArr="rateArr"
          :startRate="startRate"
          :currentRate="currentRate"
          :currentTime="currentTime"
          >
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
    <footer  
    v-if="state == 'panding' || state == 'active' " 
    class="footer-container">
        <h4
        v-if="state == 'panding'"
        >Очікується початок аукціону</h4>
       <app-increasing-and-approval v-else-if="state == 'active'"
       @addNewRate="addNewRate"
       @calculateCurrentRate="calculateCurrentRate"
       :startRate="startRate"
       :currentRate="currentRate"
       :rateArr="rateArr"
       >
         </app-increasing-and-approval>
    </footer>
</div>


</template>


<script>
export default {
  name: 'app',
  data(){
    return {
        state:'active',
        hongTrack: 'https://upload.wikimedia.org/wikipedia/en/4/45/ACDC_-_Back_In_Black-sample.ogg',
        timeOut: false,
        currentTime: '',
        remainedTimeOfRound: 180,
        dateOfAuction: {
        date: Math.trunc(Date.parse("Wed Aug 23 2018 16:23:25 GMT+0200 (EET)") / 1000)
        },
        durationOfRound: 180,
        startRate: 100.65,
        currentRate: 100.85 ,
        rateArr: [100,200,3300],
        round: 1,
        roundArr: [],
      statusMessage: {
        active: {
          type: 'active',
        textStatus: `Раунд  `,
        timeStatus: 'до закінчення раунду'
       },
       panding: {
         type: 'panding',
        textStatus: 'Очікується',
        timeStatus: 'до початку аукціону'
       },
       completed: {
         type: 'completed',
        textStatus: 'Завершений',
        timeStatus: 'аукціон завершився'
       },

        canceled: {
         type: 'canceled',
        textStatus: 'Скасований',
        timeStatus: 'аукціон скасований'
       },
 
      }
    }
  },
  
  methods: {
    addNewRate(rate){
     this.currentRate = rate * 1.05;
     this.rateArr.push(rate);
     this.roundArr.push(this.round)
     this.round ++;
     this.dateOfAuction.date = this.currentTime + this.durationOfRound;
    },

    calculateCurrentRate(rate){
     this.currentRate = rate * 1.05;
     this.dateOfAuction.date = this.currentTime + this.durationOfRound;
    },

    checkTimeOut(res){
     this.timeOut = res
    if(res){
       this.dateOfAuction.date = this.dateOfAuction.date + this.durationOfRound
       this.state = "active"
     }
    },
    getRemainedTimeofRound(remainedTime){
      this.remainedTimeOfRound =  remainedTime;
    },
    getCurrentTime(currentTime){
      this.currentTime =  currentTime;
    }
  }
};
</script>

<style>
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
    border-bottom: 3px solid #eeeeee;
    display: flex;
    justify-content: space-between;
    align-items: center;
    }

.container-main{
  margin-bottom: 250px;
  margin-top: 100px;
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

</style>
