<template>
  <div class="increase-approval-container">
    <div class="container-bid increase-bid-container">
      <div class="select-choice-bid-wrapper">
        <div class="select-choice-bid-container">
          <select v-model="selected" :size = "size" class="select-bid" 
                  @click.stop = "makeMaxSize" >
            <option
              value= "null" disabled hidden>
   {{ $t('Select amount') }}
            </option>
            <option 
              v-for="(option, index) in valueForOptionSelect.options"
              :key="index" 
              :value="option.value"
              type="number"
              @click.stop = "makeSizeOne">
              {{ option.text }}
            </option>
          </select>
          <i :class="'fa-angle-' + direction" class="fa" @click.stop = "makeMaxSize($event)" />
        </div>
</div>
    <button 
        type="submit" 
        v-scroll-to="'#active-round'"
        class='button'
        :class="'butoon__increase_' + type" 
        :disabled="selected === null"
    @click="addNewBidIncrease">
        {{ $t('Increase') }}
    </button>
    </div>
   <div class="container-bid approval-container">
      <div class="approval-question-container">
        <h6 class="approval-question">
              {{ $t('Do you agree on the amount') }}
        </h6>
          <strong>{{ currentBid }}</strong>
      </div>
      <button 
     v-scroll-to="'#active-round'"
        type="submit" 
    class="button button__approval" 
         @click="addNewBidApprove">
        {{ $t('Agree') }}
      </button>
</div>
  </div>
</template>

<script>
import validators from '../utils/validators.js'
export default {
  props : {
      startBid : Number,
      currentBid:Number,
      bidsArr: Array,
  },

    data(){
        return{
      selected:null,
      size: 1,
      type: '',
      calculatedValue: this.currentBid,
      direction: 'down'
    }
  },

  computed: {
      valueForOptionSelect() {
          let options = [];
            for (let i = 0; i <= 10; i++){
        this.calculatedValue = (this.calculatedValue * 1.05).toFixed(2);
        options.push(
          {value: this.calculatedValue, text: this.calculatedValue},
        )
      }
      return {
        selected: null,
        options
      }
    },
  },
  methods: {
    addNewBidIncrease() {
      if(!this.selected) return 
      this.$emit('calculateCurrentBid', this.currentBid);
      this.$emit('addNewBid', this.selected);
      this.$emit('holdRoundTime');
      this.submitBid(this.selected);
      this.selected = null;
    },
    addNewBidApprove() {
      this.$emit('calculateCurrentBid', this.currentBid);
      this.$emit('addNewBid', this.currentBid);
      this.$emit('holdRoundTime');
      this.submitBid(this.currentBid);
      this.selected = null;
    },
    makeSizeOne(){
      this.size = 1;
      this.type = '';
      this.direction = 'down'
    },
    makeMaxSize(event){
      this.size = 7;
      this.type = 'none';
      this.direction = 'up'
      if(event.target.className === 'fa fa-angle-up'){
        this.size = 1;
        this.direction = 'down'
        this.type = '';
      }
    },
    submitBid (amount) {
      let jsonToSend = {
        'amount': amount
      }
      this.$store.dispatch('makeBidOfRound', jsonToSend)
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

.fa{
    color: lightgrey; 
    font-size: 30px;
    background: white;
}

.select-choice-bid-wrapper{
    display: flex;
    align-items: center;
    width: 85%;
    margin: 0 auto;
    margin-top: 20px;
}
.increase-approval-container{
    display: flex;
    width: 40%;
    cursor: pointer;
}

.button{
    height: 60px;
    color:#ffffff;
    font-size: 18px;
    cursor: pointer;
}

.butoon__increase_{
    background-color: #9ab913;
    border-bottom: 3px solid #85a10f;
    height: 41px;
}

.butoon__increase_none{
    display: none;
}

.butoon__increase:hover{
    background-color: #bdce73;
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
    height: 120px;
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
    font-size: 16px;
}

.select-bid{
    width: 100%;
    text-align: left;
    color: lightgrey;
    margin-right: -11px;
    background: white;
}
.select-choice-bid-wrapper:hover{
    border: 1px solid #9ab913;
    cursor: pointer;
}

option{
    border-bottom: 1px solid #9ab913;
    border-top: 1px solid #9ab913;
}

option:hover{
    background: #9ab913;
    color: white;
    border: none;
}

</style>