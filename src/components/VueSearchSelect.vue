<template>
  <basic-select :options="valueForOptionSelect"
                :selected-option="item"
                placeholder="Select Item"
                @select="onSelect" />
</template>
<script>
import { BasicSelect } from 'vue-search-select'
export default {
  components: {
    BasicSelect
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
      for (let i = 0; i <= 10; i++){
        calculateBid  =  (calculateBid + this.minimalStep)
        options.push(
          {value: calculateBid, text: calculateBid},
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
