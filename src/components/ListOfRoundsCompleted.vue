<template>
 <div class="list-rounds-container">
     <div v-for="(bid, index) in bidsArr" :key="index">
            <div class="round-container">
                <div class="round-container__time-patricipant">
            <div class="round-container_time">
                     <img src="/static/images/watchInRound.png" alt="watch">
            </div>
            <div class="round-container_participant">
                <div class="round-container_participant__order-number">
                {{$ml.get('Bidder')}}
                {{index + 1}}
                </div>
                  <div class="round-container_participant-expended">
                MU-Moloka_komuuuuuuuuuuuuuuuuuuuuu
               </div>
            </div>
                </div>
                <div class="round-container_bid">
                   <h4>{{bid}} грн</h4>
                </div>
            </div>
     </div>

          <div  id="active-round" class="max-round">
            <h6><strong>
                {{$ml.get('Announcement')}}
                </strong></h6>
            <div  class="round-container round-container_max">
                <div class="round-container__time-patricipant">
            <div class="round-container_time round-container_time_max">
                    <img src="/static/images/watchInRoundMax.png" alt="watch">
            </div>

                <div class="round-container_participant">
                <div class="round-container_participant__order-number">
                      {{$ml.get('Bidder')}}
                       10
                      </div>
                <div class="round-container_participant-expended">
                MU-Moloka_komuuuuuuuuuuuuuuuuuuuuu
               </div>
            </div>
                </div>
                <div class="round-container_bid round-container_bid_max">
                   <h4 class="round-container_bid_max__bid-count">{{currentBid}} грн</h4>
                   <div class="round-container_bid_max-block">
                <div class="round-container_bid_max-block-count">
                    MAX
                    </div>
                   </div>
                </div>
            </div>
     </div>

        </div>
</template>


<script>
export default {
    props: ['round', 'bid', 'bidsArr', 'startBid', 'currentTime', 'currentBid', 'remainedTimeOfRound'],
}
</script>

<style scoped>

.max-round{
    margin-top: 30px;
}

.round-container{
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 65px;
    border: 1px solid #a1a1a1;
    margin-bottom: 4px;
}

.round-container_max{
    border: 1px solid #a0be22;
    margin-top: 15px;
}

.round-container__time-patricipant{
    width: 70%;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.round-container_time{
    width: 10%;
    display:flex;
    justify-content: center;
}

.round-container_time_max{
    color: lightgreen;
}

.round-container_participant{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    height: 100%;
    width: 70%;
}

.round-container_participant__order-number{
    display: flex;
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
    font-size: 20px;
    font-weight: 400;
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
}

.round-container_bid_max__bid-count{
    margin: 0 auto;
}

.round-container_bid_max-block-count{
    transform: rotate(-90deg);
    color: #000000;
    font-family: Montserrat;
}

</style>

