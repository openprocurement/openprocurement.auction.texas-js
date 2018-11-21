<template>
  <div class="list-offers-container">
    <h5 class="list-offers-container__start-offers-label">
      {{ $t('Price offers') }}
    </h5>
    <div v-for="(bid, index) in priceOffers" :key="index">
      <div class="offer-container">
        <div class="offer-container__participant">
          <div v-if="$store.state.identification.bidderID === bid.bidder_id" class="offer-container__participant-name">
            <div v-if="bid.bidNumber" class="order-of-bidder">
              {{ $t('Bidder') }} {{ bid.bidNumber }}
            </div>
            {{ bid.label[$store.state.i18n.locale] }}
            ({{ $t('You') }})
          </div>
          <div v-else class="offer-container__participant-name">
            <div v-if="bid.bidNumber" class="order-of-bidder">
              {{ $t('Bidder') }} {{ bid.bidNumber }}
            </div>
            {{ bid.label[$store.state.i18n.locale] }}
          </div>
        </div>
        <div class="offer-container_bid">
          <h4 id="offer-bid__amount" class="round-container_bid__amount">
            {{ formatNumber(bid.amount) }}
            {{ $t('UAH') }}
          </h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import formatNumber from '../utils/formatNumber'
export default {
  props: {
    priceOffers: {
      type: Array,
      default: null
    }
  },
  methods: {
    formatNumber(number){
      return formatNumber(number)
    }
  }
};
</script>

<style scoped>
.list-offers-container{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-bottom: 40px;
}
.offer-container{
    display: flex;
    justify-content: space-between;
    width: 100%;
    border: 1px solid #a1a1a1;
    margin-bottom: 10px;
    line-height: 24px;
}

.offer-container__participant{
    width: 70%;
    display: flex;
    align-items: center;
    padding-left: 51px;
    font-family: 'Montserrat', sans-serif;
    font-size: 18px;
    font-weight: 800;
    text-transform: uppercase;
    min-height: 50px;  
    height: auto !important;  
    height: 50px; 
}

.offer-container__participant-name{
    font-size: 13px;
    font-weight: 600;
}

.order-of-bidder {
   text-transform:none;
}

.offer-container_bid{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30%;
    background-color: #e9e9e9;
    font-family: 'Oswald', sans-serif;
    font-size: 20px;
}

.round-container_bid__amount {
    font-weight: 600;
    font-family: 'Oswald', sans-serif;
    font-size: 20px;
}

.list-offers-container__start-offers-label{
    color: #000000;
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    font-weight: 900;
    line-height: 16px;
    margin-bottom: 20px;
}

@media screen and (max-width: 478px) {
   .offer-container {
     flex-direction: column;
     min-height: 50px;
   }
   .offer-container__participant {
     width: 100%;
     padding-left: 0;
     justify-content: center;
     min-height: 50%;
   }
   .offer-container_bid {
     width: 100%;
     height: 50%;
     margin: 0;
   }
}

</style>

