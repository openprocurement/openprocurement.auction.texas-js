<template>
  <div class="modal-container-wrapper" @click.stop="showOrHideModalWindow">
    <div class="modal-container">
      <div class="modal-container__info modal-container__tender-number">
        {{ auctionId }}
        <svg class="modal-container__tender-number__info-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25.33 25.33"><path d="M20.67,7.37A12.67,12.67,0,1,0,33.33,20,12.68,12.68,0,0,0,20.67,7.37Zm0,23.77A11.11,11.11,0,1,1,31.77,20,11.12,11.12,0,0,1,20.67,31.15Zm0,0" transform="translate(-8 -7.37)"/><path d="M21.68,15a1.3,1.3,0,1,1-1.3-1.3,1.3,1.3,0,0,1,1.3,1.3Zm0,0" transform="translate(-8 -7.37)"/><path d="M20.53,18.42a.78.78,0,0,0-.78.78v6.63a.78.78,0,0,0,1.56,0V19.2a.78.78,0,0,0-.78-.78Zm0,0" transform="translate(-8 -7.37)"/></svg>
      </div>
      <div class="modal-container__info modal-container__info_description-Products">
        {{ companyName }}
      </div>
      <div class="modal-container__info modal-container__info_description-Products">
        {{ descriptionOfProducts[`description_${$store.state.i18n.locale}`] || descriptionOfProducts['description_uk'] }} : 
        {{ tenderTitles[`tenderTitle_${$store.state.i18n.locale}`] || tenderTitles['tenderTitle_uk'] }}
      </div>
      <div class="modal-container__info modal-container__info_step-bid">
        {{ $t('Step auction of Bid') }}: 
        <strong class="strong"> {{ formatNumber(minimalStep) }}</strong>
      </div>
      <div class="modal-container__info modal-container__info_start-bid">
        {{ $t('Start price') }}:
        {{ formatNumber(startPrice) }}
      </div>
      <hr>
      <div class="modal-container__info_browser-id_browser-and-session">
        <div class="modal-container__info modal-container__info_browser-id">
          Browser ID:
          {{ browserId }}
        </div>
        <div class="modal-container__info modal-container__info_sesion-id">
          Session ID:
          {{ sessionId }}
        </div>
      </div>
      <hr>
      <div class="modal-container__info modal-container__choose-languages">
        <div class="modal-container__choose-languages__language-title">{{ $t('Language') }}</div>
        <div>
          <app-languages-toggle-switch />
        </div>
      </div>
      <hr>
    </div>
    <div class="modal-container__powered-by">
      <a href="https://openprocurement.io/en" target="_blank">
        <img class="modal-container__powered-by__image" src="/static_texas/images/powered_by_open-procurement.png" alt="powered_by_open-procurement.svg">
      </a>
      <div class="modal-container__powered-by__container">
        Powered by
        <p class="open-procurement-text">OpenProcurement</p>
      </div>
    </div>
  </div>
</template>

<script>
import formatNumber from '../utils/formatNumber'
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
    startPrice: {
      type: Number,
      default: null
    },
    companyName: {
      type: String,
      default: null
    },
    descriptionOfProducts: {
      type: Object,
      default: null
    },
    minimalStep: {
      type: Number,
      default: null
    },
    tenderTitles: {
      type: Object,
      default: null
    },
    browserId: {
      type: String,
      default: null
    },
    sessionId: {
      type: String,
      default: null
    },
  },
  methods: {
    showOrHideModalWindow() {
      this.$emit('showOrHideModalWindow', true)
    },
    formatNumber(number){
      return formatNumber(number)
    }
  }
}
</script>

<style>

.modal-container-wrapper{
    font-family: 'Roboto',sans-serif;
    width: 22%;
    min-width: 280px;
    height: 91vh;
    margin-right: 30px;
    background-color: #ffffff;
    position: fixed;
    top: 95px;
    z-index: 2;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    box-shadow: 200px -1px 0px 4000px rgba(36, 30, 30, 0.5);
    overflow-y: auto;
    border-top: 2px solid lightgray;
}

.modal-container{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
    width: 100%;
    height: 400px;
    min-height: 400px;
}

.modal-container__info{
    display: flex;
    flex-direction: column;
    font-size: 14px;
    width: 95%;
    flex-wrap: wrap;
}

.modal-container__info_description-Products{
    font-weight: 900;
}

.modal-container__powered-by{
    display: flex;
    position: relative;
    margin-bottom: 0;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: flex-end;
}

.modal-container__info_browser-id {
   margin-bottom: 7px;
}

.modal-container__powered-by__image {
    width: 100%;
    filter: grayscale(80%);
}

.modal-container__powered-by__image:hover {
    filter: none;
}

.bold_p {
  font-weight: 600;
}

.modal-container__info_browser-id_browser-and-session {
  display: flex;
  flex-direction: column;
  width: 95%;
}

.modal-container__powered-by__container {
    color: #ffffff;
    position: absolute;
    bottom: 40px;
    right: 0;
    left: 0;
    display: flex;
    justify-content: center;
    width: 95%;
    flex-direction: row;
    font-size: 10px;
}

.modal-container__choose-languages__language-title {
  margin-bottom: 10px;
}

.open-procurement-text {
  text-decoration: underline;
  margin-left: 2px;
}

.modal-container__info_step-bid {
  flex-direction: row;
  align-items: last baseline;
}

.modal-container__powered-by__container_link {
    color: #ffffff;
    margin-left: 7px;
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

hr {
  background-color: lightgray;
  height: 1px;
  border: 0;
  width: 100%;
}

.strong {
  margin-left: 2px;
}

@media screen  and (max-width: 478px){
  .modal-container__tender-number {
    margin-top: 15px;
  }
}

@media screen  and (max-height: 580px){
  .modal-container-wrapper {
    height: 84vh;
  }
}

@media screen  and (max-height: 480px){
  .modal-container-wrapper {
    height: 80vh;
  }
}

@media screen  and (max-height: 280px){
  .modal-container-wrapper {
    height: 67vh;
  }
}

</style>

