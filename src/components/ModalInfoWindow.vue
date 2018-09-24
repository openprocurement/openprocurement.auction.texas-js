<template>
  <div class="modal-container-wrapper">
    <div class="modal-container">
      <div class="modal-container__info modal-container__tender-number">
        {{ auctionId }}
        <i class="fa fa-info-circle" />
      </div>
      <div class="modal-container__info modal-container__info_description-Products">
        {{ companyName }}
      </div>
      <div class="modal-container__info modal-container__info_description-Products">
        {{ descriptionOfProducts }}
      </div>
      <div class="modal-container__info modal-container__info_step-bid">
        {{ $t('Step reduction of Bid') }}:
        <strong>{{ minimalStep }}</strong>
      </div>
      <div class="modal-container__info modal-container__info_start-bid">
        {{ $t('Start value') }}:
        {{ startBid }}
      </div>
      <div class="modal-container__info modal-container__info_browser-id">
        <hr>
        Browser ID:
        {{ browserId }}
      </div>
      <div class="modal-container__info modal-container__info_sesion-id">
        Sesion ID:
        {{ browserId }}
        <hr>
      </div>
      <div class="modal-container__info modal-container__choose-languages">
        <div>{{ $t('Language') }}</div>
        <div>
          <app-languages-toggle-switch />
        </div>
        <hr>
      </div>
    </div>
    <div class="modal-container__info modal-container__powered-by">
      powered by:
    </div>
  </div>
</template>

<script>
import AppLanguagesToggleSwitch from './LanguagesToggleSwitch';
export default {
  components:{
    AppLanguagesToggleSwitch
  },
  props: {
    auctionId: {
      type: String,
      default: null
    },
    startBid: {
      type: Number,
      default: null
    },
    browserId: {
      type: String,
      default: null
    },
    companyName: {
      type: String,
      default: null
    },
    descriptionOfProducts: {
      type: String,
      default: null
    },
    minimalStep: {
      type: Number,
      default: null
    },
  },
}
</script>

<style>
.modal-container-wrapper{
    width: 30%;
    height: 91vh;
    margin-right: 30px;
    background-color: #ffffff;
    position: fixed;
    top: 96px;
    z-index: 2;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    box-shadow: -1px -20px 0px 5700px rgba(36, 30, 30, 0.5);
}

.modal-container{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    width: 100%;
}

.modal-container__info{
    display: flex;
    flex-direction: column;
    font-size: 14px;
    width: 95%;
    flex-wrap: wrap;
    margin-bottom: 10px;
}

.modal-container__info_description-Products{
    font-weight: 900;
}

.modal-container__powered-by{
    display: flex;
    align-self: flex-end;
}

.modal-container__choose-languages{
    display: flex;
    flex-direction: column;
}

.modal-container__tender-number{
    display: flex;
    flex-direction: initial;
    justify-content: space-between;
}

.fa-info-circle{
    color: grey;
    font-size: 27px;
}

</style>

