<template>
<div class="modal-container-wrapper">
    <div class="modal-container">
           <div class="modal-container__info modal-container__tender-number">
        {{tenderNumber}}
    </div>
    <div class="modal-container__info modal-container__info_description-Products">
        {{descriptionOfProducts}}
    </div>

    <div class="modal-container__info modal-container__info_step-rate">
        Крок зменшення торгів:
        <strong>{{startRate}}</strong>
    </div>

    <div class="modal-container__info modal-container__info_start-rate">
        Стартова сума:
        {{startRate}}
    </div>
     <div class="modal-container__info modal-container__info_browser-id">
    <hr>
        Browser ID:
        {{browserId}}
    </div>
     <div class="modal-container__info modal-container__info_sesion-id">
        Sesion ID:
        {{browserId}}
        <hr>
    </div>
    <div class="modal-container__info modal-container__choose-languages">
      <div>Мова</div><br/>
      <div>
      <app-languages-toggle-switch>
      </app-languages-toggle-switch>
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
     props: {
    tenderNumber: {
      type: String,
    },
    startRate: {
      type: Number,
    },
    browserId: {
      type: String,
    },
    companyName: {
      type: String,
    },
    descriptionOfProducts: {
      type: String,
    },
  },
  components:{
      AppLanguagesToggleSwitch
  },
}
</script>

<style scoped>
.modal-container-wrapper{
    min-width: 50%;
    height: 91vh;
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
}

.modal-container__info{
    display: flex;
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

</style>

