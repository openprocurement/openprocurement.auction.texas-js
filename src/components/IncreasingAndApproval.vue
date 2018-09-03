<template>
<div class="increase-approval-container">
  <div class="increase-bid-container">
      <div class="choice-bid">
     <select class="select-bid" v-model="selected"
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

    @click="addNewBidIncrease"
    >
    Підвищення</button>
  </div>

   <div class="approval-container">
      <div class="approval-question-container">
          <h6 class="approval-question">Чи погоджуєтеся на суму</h6>
          <strong>{{currentBid}}</strong>
      </div>
    <button 
     v-scroll-to="'#active-round'"
    type="button" 
    class="button button__approval" 
     @click="addNewBidApprove"
    >Погоджуюсь</button>
  </div>
</div>
</template>

<script>
export default {
        props : {
        startBid : Number,
        currentBid:Number,
        bidsArr: Array
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
                 { value: this.currentBid * 1.05, text: this.currentBid * 1.05 },
                 { value: this.currentBid * 1.1, text: this.currentBid * 1.1 },
                 { value: this.currentBid * 1.2, text: this.currentBid * 1.2 },
               ]
             }
      }
  },
    methods: {
      addNewBidIncrease() {
        this.$emit('calculateCurrentBid', this.currentBid);
        this.$emit('addNewBid', this.selected);
        this.$emit('holdRoundTime');
        this.selected = null;
      },

      addNewBidApprove() {
        this.$emit('calculateCurrentBid', this.currentBid);
        this.$emit('addNewBid', this.currentBid);
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

.choice-bid{
    display: flex;
    align-items: center;
    height: 100px;
    width: 85%;
    margin: 0 auto;
}
.increase-approval-container{
    display: flex;
    width: 40%;
    cursor: pointer;
}
.increase-bid-container{
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
    cursor: pointer;
}

.butoon__increase{
    background-color: #9ab913;
    border-bottom: 3px solid #85a10f;
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

.select-bid{
    width: 100%;
    text-align: center;
    border: 1px solid lightgrey;
    color: lightgrey;
}

.select-bid:hover{
    border: 2px solid #9ab913;
    cursor: pointer;
}
</style>