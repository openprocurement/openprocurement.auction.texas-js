<template>
  <multi-select :options="valueForOptionSelect"
                :selected-option="item"
                placeholder="Select Item"
                @select="onSelect" />
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
    }
  },    
  data () {
    return {
      searchText: '', // If value is falsy, reset searchText & searchItem
      item: {
        value: '',
        text: ''
      }
    }
  },
  computed: {
    valueForOptionSelect() {
      let options = [];
      let calculateBid = this.currentBid;
      let minimalIncreaseBid = Math.floor(calculateBid / this.minimalStep) * this.minimalStep;
      for (let i = 0; i <= 10; i++){
        minimalIncreaseBid  =  (minimalIncreaseBid + this.minimalStep)
        options.push(
          {value: minimalIncreaseBid, text: minimalIncreaseBid},
        )
      }
      return options
    }
  },
  methods: {
    onSelect (item) {
      this.item = item
      this.$emit('setSelectedValue', item.value);
    },
    reset () {
      this.item = {}
    },
    selectOption () {
      this.item = this.options[0]
    },
    setSelectedValue () {
      this.$emit('setSelectedValue', this.item.value);
    },
  },
}
</script> 
<style>

</style>
