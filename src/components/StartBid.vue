<template>
  <div class="start-pricing-container">
    <h5 class="start-pricing-container__label">
      {{ $t('Start price') }}
    </h5>
    <div class="start-pricing-container__block">
      <h4 id="start-pricing_amount" class="start-pricing-container__block__amount">{{ formatNumber(startPrice) }} 
        {{ $t('UAH') }}
      </h4>
    </div>
  </div>
</template>

<script>
import formatNumber from '../utils/formatNumber'
export default {
  props: {
    startPrice: {
      type: Number,
      default: null 
    }
  },
  data () {
    return { friends: 5 }  
  },
  methods:{
    formatNumber(number){
      return formatNumber(number)
    }
  }
}
</script>

<style>


.start-pricing-container__block{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 50px;  
    height: auto !important;  
    height: 50px; 
    font-weight: 400;
    border: 1px solid #a1a1a1;
    margin-bottom: 50px;
}

.start-pricing-container__block__amount {
    font-family: 'Oswald', sans-serif;
    font-size: 24px;
}

.start-pricing-container__label{
    color: #000000;
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    font-weight: 900;
    line-height: 16px;
    margin-bottom: 20px;
}

.start-pricing-container{
    margin-top: 30px;
}

</style>

