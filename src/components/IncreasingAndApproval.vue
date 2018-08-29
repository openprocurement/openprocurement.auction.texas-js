<template>
<div class="increase-approval-container">
  <div class="increase-rate-container">
      <div class="choice-rate">
     <select class= "select-rate" v-model="selected"
     >
   <option 
   value=null disabled hidden>
   Виберіть суму
   </option>
  <option 
  v-for="(option, index) in checkSelected.options" :key="index" v-bind:value="option.value"
  >
    {{ option.text }}
  </option>
</select>
      </div>
    <button type="button" 
    v-scroll-to="'#active-round'"
    class="button butoon__increase" 
    :disabled="selected === null"

    @click="addNewRateIncrease"
    >
    Підвищення</button>
  </div>

   <div class="approval-container">
      <div class="approval-question-container">
          <h6 class="approval-question">Чи погоджуєтеся на суму</h6>
          <strong>{{currentRate}}</strong>
      </div>
    <button 
     v-scroll-to="'#active-round'"
    type="button" 
    class="button button__approval" 
     @click="addNewRateApprove"
    >Погоджуюсь</button>
  </div>
</div>
</template>

<script>
export default {
        props : {
        startRate : Number,
        currentRate:Number,
        rateArr: Array
    },

    data(){
        return{
            selected:null
        }
    },

  computed: {
      checkSelected() {
          return {
               selected: null,
               options: [
                 { value: this.currentRate * 1.05, text: this.currentRate * 1.05 },
                 { value: this.currentRate * 1.1, text: this.currentRate * 1.1 },
               ]
             }
      }
  },
    methods: {
      addNewRateIncrease() {
        this.$emit('calculateCurrentRate', this.currentRate);
        this.$emit('addNewRate', this.selected);
        this.$emit('holdRoundTime');
        this.selected = null;
      },

      addNewRateApprove() {
        this.$emit('calculateCurrentRate', this.currentRate);
        this.$emit('addNewRate', this.currentRate);
        this.$emit('holdRoundTime');
        this.selected = null;
    },
  },
};
</script>

<style>
.footer-container{
    height: 200px;
}

.choice-rate{
    display: flex;
    align-items: center;
    height: 100px;
    width: 85%;
    margin: 0 auto;
}
.increase-approval-container{
    display: flex;
    width: 40%;
}
.increase-rate-container{
    display: flex;
    flex-direction: column;
    justify-content:space-between;
    min-width: 50%;
    height: 120px;
    background-color: #ffffff;
}

.button{
    height: 60px;
    color:#ffffff;
    font-size: 18px;
}

.butoon__increase{
    background-color: #9ab913;
}

.button__approval{
    background-color: #848484;
}   

.approval-container{
    margin-left: 10px;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 50%;
    height: 120px;
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

.select-rate{
    width: 100%;
    text-align: center;
    border: 1px solid lightgrey;
    color: lightgrey;
}
</style>