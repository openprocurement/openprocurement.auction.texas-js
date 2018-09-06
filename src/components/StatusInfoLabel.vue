<template>
        <div 
        class="status-label-container" 
        :class="'status-label-container__' + type"
        >
        <div
        class="status-label-container__text"
         v-if="state == 'active'">
            {{$t(textStatus)}}
            <div class="status-label-container-active__round">
            {{bidsArr.length + 1}}
            </div>
        </div>
          <div v-else
          class="status-label-container__text"
          >
           {{$t(textStatus)}}
        </div>
    <div 
    class="status-label-container__sign" 
    :class="'status-label-container__sign_' + type ">
    <spinner-loader 
    v-if="state === 'pendingOfAuction'">
    </spinner-loader>
           <!-- <radial-progress-bar
                        v-if="state === 'pendingOfAuction'"
                        min="0" max="100" :value="value" :text="remainedTimeOfRound"
                       :remainedTimeOfRound='remainedTimeOfRound'
                       :durationOfRound='durationOfRound'
                        >
            </radial-progress-bar> -->
     <img 
        v-if="state === 'canceled' || state === 'completed' || state === 'active'"
     :src="'/static/images/sign_' + type + '.png'" 
     :alt="type">
     <div v-if="state == 'pendingOfRound'">
         {{remainedMinutesToStartRound}} хв
         </div>
    </div>

        </div>
</template>

<script>
import SpinnerLoader from './SpinnerLoader.vue'
import RadialProgressBar from './RadialProgressBar.vue'
export default {
    data(){
        return{
            value:0
        }
    },
    props: ['type', 'textStatus', 'bidsArr', 'state', 'remainedTimeOfRound', 'durationOfRound'],
    computed: {
        remainedMinutesToStartRound() {
            return Math.ceil(this.remainedTimeOfRound / 60)
        },
        calculateMovingRotate() {
        this.value = (100 - (this.remainedTimeOfRound / this.durationOfRound * 100)).toFixed(2);
    },
    },
      updated() {
     window.scrollTo(0, document.body.scrollHeight);
  },
     components: {
    SpinnerLoader,
    RadialProgressBar
  }

};
</script>

<style>
.status-label-container{
    color: #ffffff;
    width: 198px;
    height: 40px;
    margin-right: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: Roboto;
    font-size: 18px;
    font-weight: 500;
}

.status-label-container__text{
    display: flex;
    align-items: center;
    margin: 0 auto;
}

.status-label-container__sign{
   display: flex;
   justify-content: center;
   align-items: center;
   width: 46px;
   height: 40px;
}

.status-label-container__sign_active{
   background-color: #85a10f;
}

.status-label-container__sign_completed{
   background-color: #e1e7d9;
}

.status-label-container__sign_pending-of-auction{
   background-color: #d38812;
}

.status-label-container__sign_pending-of-round{
   background-color: #d38812;
}

.status-label-container__sign_canceled{
   background-color: #cb5e46;
}

.status-label-container__pending-of-auction{
    background-color: #f39c11;
}

.status-label-container__pending-of-round{
    background-color: #f39c11;
}

.status-label-container__active{
    background-color: #9aba13;
}

.status-label-container__canceled{
    background-color: #e4694e;
}

.status-label-container__completed{
    color: #000000;
    background-color:#f1f3f2;
}

.status-label-container-active__round{
    font-family: Oswald;
    font-size: 24px;
    font-weight: 500;
    line-height: 18.35px;
    margin-left: 5px;

}
</style>
