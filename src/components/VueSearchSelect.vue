<template>
  <multi-select :options="valueForOptionSelect"
                :selected-option="item"
                :placeholder="item.text"
                @select="onSelect($event)" />
</template>
<script>
import { MultiSelect } from 'vue-search-select'
export default {
  components: {
    MultiSelect
  },
  props : {
    currentBid: {
      type:Number,
      default: null
    },
    minimalStep: {
      type:Number,
      default: null
    },
  },    
  data () {
    return {
      item: {
        value: 'Select Item',
        text: 'Select Item'
      }
    }
  },
  computed: {
    valueForOptionSelect() {
      let options = [{value: 'Select Item', text: 'Select Item'}];
      let calculateBid = this.currentBid;
      let minimalIncreaseBid = Math.floor(calculateBid / this.minimalStep) * this.minimalStep;
      for (let i = 0; i <= 10; i++){
        minimalIncreaseBid  =  (minimalIncreaseBid + this.minimalStep)
        options.push(
          {value: minimalIncreaseBid, text: minimalIncreaseBid},
        )
      }
      return options
    },
  },
  methods: {
    onSelect (item) {
      this.item.value = item[0].value
      this.item.text = String(item[0].text)
      this.$emit('setSelectedValue', this.item.value);
    },
  },
}
</script> 
<style>

</style>
