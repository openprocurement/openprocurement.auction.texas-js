<template>
  <div class="list-offers-container">
    <h5 class="list-offers-container__start-offers-label">
      {{ $t('Initial bids') }}
    </h5>
    <div v-for="(bid, index) in initialBidsArr" :key="index">
      <div class="offer-container">
        <div class="offer-container__participant">
          <div class="offer-container__participant-name">
            {{ bid.label[$store.state.i18n.locale] }}
          </div>
        </div>
        <div class="offer-container_bid">
          <h4>{{ bid.amount }} 
            {{ $t('UAH') }}
          </h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RadialProgressBar from './RadialProgressBar.vue'
export default {
  props: {
    initialBidsArr: {
      type: Array,
      default: null
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
    height: 50px;
    border: 1px solid #a1a1a1;
    margin-bottom: 10px;
}

.offer-container__participant{
    width: 70%;
    display: flex;
    align-items: center;
    margin-left: 45px;
}

.offer-container__participant-name{
    font-size: 19px;
    font-weight: 600;
    display: flex;
}

.offer-container_bid{
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

.list-offers-container__start-offers-label{
    color: #000000;
    font-family: Roboto;
    font-size: 14px;
    font-weight: 900;
    line-height: 16px;
    margin-bottom: 20px;
}

</style>

