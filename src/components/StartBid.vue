<template>
  <div class="start-pricing-container">
    <h5 class="start-pricing-container__label">
      {{ $t('Start value') }}
    </h5>
    <div class="start-pricing-container__block">
      <h4 class="start-pricing-container__block__amount">{{ startBid }} 
        {{ $t('UAH') }}
      </h4>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    startBid: {
      type: Number,
      default: null 
    }
  },
  data () {
    return { friends: 5 }  
  }
}
</script>

<style>


.start-pricing-container__block{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 50px;
    font-weight: 400;
    border: 1px solid #a1a1a1;
    margin-bottom: 50px;
}

.start-pricing-container__block__amount {
    font-family: 'Oswald', sans-serif;
    font-size: 24px;
    font-weight: 400;
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

