<template>
 <div class="list-rounds-container">
<app-list-initial-offers
:bidsArr="bidsArr"
>
  </app-list-initial-offers>
     <div v-for="(bid, index) in bidsArr" :key="index">
            <h3>
                {{$t('Round')}}
                 {{index + 1}}</h3>
            <div class="round-container">
                <div class="round-container__time-patricipant">

             <div class="round-container_time">
                <div class="round-container_time__watch-icon">
                     <img 
                    src="/static/images/watchInRound.png" 
                     alt="watch">
                </div>

                 <div class="round-container_time__watch">
                   {{currentTime | moment("hh:mm:ss")}}
                </div>

            </div>

            <div class="round-container_participant">
                {{$t('Bidder')}}
                 {{index + 1}}
            </div>

                </div>
                <div class="round-container_bid">
                   <h4>{{bid}} грн</h4>
                </div>
            </div>
            
     </div>

          <div id="active-round">
            <h3>
                {{$t('Round')}}
                 {{bidsArr.length + 1}}</h3>
            <div  class="round-container round-container_active">
                <div class="round-container__time-patricipant round-container__time-patricipant-active">
            <div 
            class="round-container_time round-container_time-active">
             <div 
             class="round-container_time-active__watch-icon">
                <radial-progress-bar
                        v-if="state !== 'pendingOfRound' && (value > 0 && value < 100)"
                        min="0" max="100" :value="value" :text="remainedTimeOfRound"
                       :remainedTimeOfRound='remainedTimeOfRound'
                       :durationOfRound='durationOfRound'
                        >
                </radial-progress-bar>
                </div>
                  <div class="round-container_time-active__watch">
                   {{currentTime | moment("hh:mm:ss")}}
                </div>
            </div>

             <div class="round-container_participant">
            </div>        
                </div>
                <div class="round-container_bid round-container_bid_active">
                   <h4>{{currentBid}} грн</h4>
                   {{calculateMovingRotate}}
                </div>
            </div>
     </div>

        </div>
</template>


<script>
 import RadialProgressBar from './RadialProgressBar.vue'
 import AppListInitialOffers from './ListInitialOffers.vue'
export default {
    props: ['bid', 'bidsArr', 'startBid', 'currentTime',
    'currentBid', 'remainedTimeOfRound', 'durationOfRound', 'state'],
data () {
    return {
         value: 0,
    }
  },
      computed: {
    calculateMovingRotate() {
        this.value = (100 - (this.remainedTimeOfRound / this.durationOfRound * 100)).toFixed(2);
    },
  },
  components: {
      RadialProgressBar,
      AppListInitialOffers
  },
};
</script>

<style scoped>
.round-container{
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 50px;
    border: 1px solid #a1a1a1;
}

.round-container_time{
    margin-left: -40px;
    width: 20%;
    display: flex;
    justify-content: space-between;
}


.round-container__time-patricipant{
    width: 70%;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.round-container__time-patricipant-active{
    height: 95%;
    background-color: #e7f5ac;
    margin: auto;
    margin-left: 1px;
}

.round-container_bid{
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: center;
    width: 30%;
    height: 90%;
    background-color: #e9e9e9;
    margin-right: 3px;
    font-family: Oswald;
}
.round-container_bid_active{
    height: 95%;
    background-color: #e7f5ac;
    margin: auto;
    margin-right: 1px;
}

.round-container_participant{
    width: 35%;
    text-align: center;
}

</style>

