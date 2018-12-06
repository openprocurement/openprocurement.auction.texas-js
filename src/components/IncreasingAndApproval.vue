<template>
  <div class="increase-approval-container">
    <div :data-tip="`${$store.state.i18n.translations[$store.state.i18n.locale]['Choose a price offer which is a multiple of the minimal step']}(${minimalStep} ${$store.state.i18n.translations[$store.state.i18n.locale]['UAH']})`"
         class="container-bid increase-bid-container">
      <div class="select-choice-bid-wrapper">
        <h6 class="approval-question announce-price-offer">
          {{ $t('Announce price offer') }}
        </h6>
        <vue-search-select :items="valueForOptionSelect"
                           @allowClickAnnounce="allowClickAnnounce" 
                           @setSelectedValue="setSelectedValue" />
      </div>
      <button v-scroll-to="'#active-round'" :disabled="selected === '' || selected === null || selected === 'null' || isAllowClickAnnounce"  
              id="button__increase"
              class="button button__increase"
              type="submit" 
              @click.stop="addNewBidIncrease">
        {{ $t("Announce") }}
      </button>
    </div>
    <div class="container-bid approval-container">
      <div class="approval-question-container">
        <h6 class="approval-question">
          {{ $t('Accept price offer') }}
        </h6>
        <h3 id="approval-mount" class="approval-mount">{{ formatNumber(currentBid) }}</h3>
      </div>
      <button 
        v-scroll-to="'#active-round'"
        type="submit" 
        id="button__approval"
        class="button button__approval" 
        @click.stop="addNewBidApprove">
        {{ $t('Accept') }}
      </button>
    </div>
  </div>
</template>

<script>
import VueSearchSelect from './VueSearchSelect.vue'
import axios from 'axios'
import formatNumber from '../utils/formatNumber'
import { createECDH } from 'crypto';

export default {
  components: {
    VueSearchSelect, 
  },
  props : {
    startPrice : {
      type: Number,
      default: null
    },
    currentBid : {
      type: Number,
      default: null
    },
    minimalStep: {
      type: Number,
      default: null
    }
  },
  data(){
    return{
      selected: null,
      isAllowClickAnnounce: false
    }
  },
  computed: {
    valueForOptionSelect() {
    // calculating 1600 variants of price offers according to this.currentBid
      let options = [{value: 'null', text: 'Select amount'}];
      let calculateBid = this.currentBid;
      let minimalIncreaseBid = Math.round((Math.floor(calculateBid / this.minimalStep) * this.minimalStep) * 100) / 100;
      for (let i = 0; i < 1600; i++){
        minimalIncreaseBid  =  Math.round((minimalIncreaseBid + this.minimalStep) * 100) / 100;
        options.push(
          {value: minimalIncreaseBid.toString(), text: `${formatNumber(minimalIncreaseBid)}`},
        )
      }
      return options
    },
  },
  methods: {
    formatNumber(number){
      return formatNumber(number)
    },
    addNewBidIncrease() {
    // submit bid from select option by clicking on button__increase
      if((!this.selected) || (this.selected === 'null')) return 
      this.submitBid(this.selected);
      this.selected = null;
    },
    addNewBidApprove() {
    // submit bid by clicking on button__approval
      this.submitBid(this.currentBid);
      this.selected = null;
    },
    setSelectedValue(value){
      if((!this.value) || (this.value === 'null') ){
        this.selected = null
      }
      this.selected = value;
    },
    allowClickAnnounce(check){
    // allow to click announce only if select option is closed
      this.isAllowClickAnnounce = check
    },
    submitBid (amount) {
    // send bid data from bidder using XHR
      this.checkAuthorization()
      let jsonToSend = {
        bid: amount,
        bidder_id: this.$store.state.identification.bidderID
      }
      axios.post(
        `${this.$store.state.urls.auctionURL}/${this.$store.state.id}/postbid`,
        jsonToSend,
        {withCredentials: true}
      ).then(response => {
        this.$emit('sentBid')
      }).catch(error => {
        console.log(error)
      })    
    },
    checkAuthorization () {
    // get confirmation of user authorization using XHR
      axios.post(
        `${this.$store.state.urls.auctionURL}/${this.$store.state.id}/check_authorization`,
        {withCredentials: true}
      ).then((data) => {
        console.log('Authorization checked')
      }).catch((err) => {
        console.log('Error while check_authorization')
        if (err.status == 401) {
          this.$notify({
          // notify that page will be reloaded
            group: 'utils',
            text: 'Ability to submit bids has been lost. Wait until page reloads.',
            duration: 10000,
            type: 'error'
          })
          console.log('Ability to submit bids has been lost. Wait until page reloads.')
          setTimeout(() => {
            window.location.replace(`${this.$store.state.urls.auctionURL}/${this.$store.state.id}/relogin`);
          }, 3000);
        }
      })
    }
  },
};
</script>

<style scoped>

.select-choice-bid-container{
    width: 100%;
    height: 100%;
    display: flex;
    border: 1px solid lightgrey;
}

.select-choice-bid-wrapper{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 85%;
    margin: 0 auto;
    margin-top: 10px;
}
.increase-approval-container{
    display: flex;
    width: 35%;
    cursor: pointer;
    margin-bottom: 45px;
}

.button{
    height: 60px;
    color:#ffffff;
    font-size: 20px;
    font-weight: 500;
    font-family: 'Roboto', sans-serif;
    cursor: pointer;
}

.button__increase{
    position: absolute;
    bottom: 0;
    width: 100%;
    background-color: #9ab913;
    border-bottom: 3px solid #85a10f;
    height: 43px;
}

.button__increase:hover:enabled{
  background-color: #bbdb2a;
}

.button__approval{
    background-color: #848484;
    border-bottom: 3px solid #777775;
}

.button__approval:hover{
    background-color: hsl(0, 2%, 41%);
}

.container-bid{
    display: flex;
    flex-direction: column;
    justify-content:space-between;
    background-color: #ffffff;
    min-width: 50%;
    height: 150px;
}
.approval-container{
    margin-left: 10px;
}

.approval-question-container{
    width: 100%;
    height: 100%;;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 19px;
}

.approval-question{
    width: 100%;
    font-size: 16px;
    font-family: 'Montserrat', sans-serif;
    font-size: 16px;
    font-weight: 400;
}

.announce-price-offer {
    width: 100%;
    margin-bottom: 10px;
}

.approval-mount {
    width: 100%;
    font-size: 24px;
    font-family: 'Oswald', sans-serif;
    font-weight: 600;
}

.select-bid{
    width: 100%;
    text-align: left;
    color: lightgrey;
    margin-right: -11px;
    background: white;
}

[data-tip] {
	position:relative;

}

[data-tip]:after {
	display:none;
	content:attr(data-tip);
	position:absolute;
  top: 10px;
  left: 0;
	background:lightgray;
	color:#000;
	z-index:9;
	font-size: 0.75em;
  min-height: 18px;  
  height: auto !important;  
  height: 18px; 
	line-height:18px;
	border-radius: 3px;
  width: 100%;
  justify-content: center;
  align-items: center;
}
[data-tip]:hover:after,
[data-tip]:focus:after
 {
	display:flex;
}

option{
    border-bottom: 1px solid #9ab913;
    border-top: 1px solid #9ab913;
}

@media screen and (max-width: 1400px) {
  .increase-approval-container{
    width: 50%;
  }
}

@media screen and (max-width: 1200) {
  .increase-approval-container{
    width: 55%;
  }
}

@media screen and (max-width: 992px) {
 .increase-approval-container{
    width: 65%;
  }
}

@media screen and (max-width: 768px) {
  .increase-approval-container{
    width: 85%;
  }
}

@media screen and (max-width: 478px) {
   .increase-approval-container{
    width: 100%;
    flex-direction: column;
    align-items: center;
  }

  .container-bid{
    width: 95%;
    margin-left: 0;
  }

  .increase-bid-container{
    margin-bottom: 45px;
    margin-top: 210px;
  }

  .approval-container{
    margin-bottom: 10px;
  }

  .select-choice-bid-wrapper {
    width: 97%;
  }
}

@media screen and (max-height: 480px) {
  .increase-approval-container{
    margin-top: 110px;
  }
}


@media screen and (max-height: 300px) {
  .increase-approval-container{
    margin-top: 150px;
  }
}
</style>