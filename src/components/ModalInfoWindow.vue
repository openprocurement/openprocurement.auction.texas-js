<template>
  <div class="modal-container-wrapper">
    <div class="modal-container">
      <div class="modal-container__info modal-container__tender-number">
        {{ auctionId }}
        <img class="modal-container__tender-number__info-icon" src="/static_texas/images/info-icon.svg" alt="info_icon">
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
      <img class="modal-container__powered-by__image" src="/static_texas/images/powered_by_open-procurement.svg" alt="powered_by_open-procurement.svg">
      <div class="modal-container__powered-by__container">
        Powered by
        <a class="modal-container__powered-by__container_link" href="https://openprocurement.io/en">OpenProcurement</a>
      </div>
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
    box-shadow: 200px -1px 0px 4000px rgba(36, 30, 30, 0.5);
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
    position: relative;
    width: 100%;
    margin-bottom: 0;
}

.modal-container__powered-by__image {
    width: 100%;
    filter: grayscale(80%);
}

.modal-container__powered-by__image:hover {
    filter: none;
}

.modal-container__powered-by__container {
    color: #ffffff;
    position: absolute;
    bottom: 14%;
    display: flex;
    justify-content: center;
    width: 100%;
    font-size: 10px;
}

.modal-container__powered-by__container_link {
    color: #ffffff;
    margin-left: 7px;
    border: none;
}

.modal-container__powered-by__container_link:hover {
    color: yellow;
    border: none;
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

.modal-container__tender-number {
    align-items: center;
}

.modal-container__tender-number__info-icon {
  width: 25px;
  height: 25px;
}

</style>

