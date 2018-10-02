<template>
  <div class="modal-container-wrapper" @click.stop="showOrHideModalWindow">
    <div class="modal-container">
      <div class="modal-container__info modal-container__tender-number">
        {{ auctionId }}
        <svg class="modal-container__tender-number__info-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25.33 25.33"><path d="M20.67,7.37A12.67,12.67,0,1,0,33.33,20,12.68,12.68,0,0,0,20.67,7.37Zm0,23.77A11.11,11.11,0,1,1,31.77,20,11.12,11.12,0,0,1,20.67,31.15Zm0,0" transform="translate(-8 -7.37)"/><path d="M21.68,15a1.3,1.3,0,1,1-1.3-1.3,1.3,1.3,0,0,1,1.3,1.3Zm0,0" transform="translate(-8 -7.37)"/><path d="M20.53,18.42a.78.78,0,0,0-.78.78v6.63a.78.78,0,0,0,1.56,0V19.2a.78.78,0,0,0-.78-.78Zm0,0" transform="translate(-8 -7.37)"/></svg>
        <!-- <img class="modal-container__tender-number__info-icon" src="/static_texas/images/info-icon.svg" alt="info_icon"> -->
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
  methods: {
    showOrHideModalWindow() {
      this.$emit('showOrHideModalWindow', true)
    },
  }
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

