<template>
 <div class="list-rounds-container">
     <div v-for="(rate, index) in rateArr" :key="index">
            <h3>Раунд {{index + 1}}</h3>
            <div class="round-container">
                <div class="round-container__time-patricipant">
            <div class="round-container_time">
                +++ {{currentTime | moment("hh:mm:ss")}}
            </div>
            <div class="round-container_participant">
                Учасник {{index + 1}}
            </div>

                </div>
                <div class="round-container_rate">
                   <h4>{{rate}} грн</h4>
                </div>
            </div>
            
     </div>

          <div id="active-round">
            <h3>Раунд {{round}}</h3>
            <div  class="round-container round-container_active">
                <div class="round-container__time-patricipant round-container__time-patricipant-active">
            <div class="round-container_time round-container_time-active">
                +++ {{currentTime | moment("hh:mm:ss")}}
            </div>

             <div class="round-container_participant">
    
            </div>        
                </div>
                <div class="round-container_rate round-container_rate_active">
                   <h4>{{currentRate}} грн</h4>
                </div>
            </div>
     </div>

        </div>
</template>


<script>
export default {
    props: ['round', 'rate', 'rateArr', 'startRate', 'rateArr', 'currentTime', 'currentRate'],
     data () {
    return {
         currentRate: this.startRate * 1.05,
    }
  },
}
</script>

<style scoped>

.round-container{
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 50px;
    border: 1px solid #a1a1a1;
}


.round-container__time-patricipant{
    width: 70%;
    display: flex;
    justify-content: space-around;
    align-items: center;
}


.round-container_active{
    background-color: lightgreen;
}

.round-container_rate{
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: center;
    width: 30%;
    height: 90%;
    background-color: #e9e9e9;
    margin-right: 3px;
}
.round-container_rate_active{
    background-color: inherit;
}

.round-container_time-active{
    color:white;
}

.round-container_participant{
    width: 35%;
    text-align: center;
    
}

</style>

