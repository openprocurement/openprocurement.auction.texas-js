<template>
  <multi-select :options="valueForOptionSelect"
                :selected-option="item"
                :placeholder="$t(item.text)"
                @select="onSelect($event)" />
</template>
<script>
import { MultiSelect } from 'vue-search-select'
import formatNumber from '../utils/formatNumber'
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
        value: 'Select amount',
        text: 'Select amount'
      }
    }
  },
  computed: {
    valueForOptionSelect() {
      let options = [{value: 'Select amount', text: `${this.$store.state.i18n.translations[this.$store.state.i18n.locale]['Select amount']}`}];
      let calculateBid = this.currentBid;
      let minimalIncreaseBid = Math.round((Math.floor(calculateBid / this.minimalStep) * this.minimalStep) * 100) / 100;
      for (let i = 0; i < 1600; i++){
        minimalIncreaseBid  =  Math.round((minimalIncreaseBid + this.minimalStep) * 100) / 100;
        options.push(
          {value: minimalIncreaseBid, text: `${formatNumber(minimalIncreaseBid)} ${this.$store.state.i18n.translations[this.$store.state.i18n.locale]['UAH']}`},
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
    formatNumber(number){
      return formatNumber(number)
    }
  },
}
</script> 
<style>

.text.default {
  color: #000 !important;
}

.ui.dropdown .menu > .item {
  border-bottom: 1px solid #9ab913 !important;
  height: 27px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}

div.menu.visible {
  max-height: 105px !important;
  border-color: #9ab913 !important;
}

.ui.selection.dropdown {
  border-radius: 0 !important;
  height: 27px !important;
  
}

.ui.selection.dropdown:hover {
  border-color: #9ab913 !important;
}

.ui.dropdown .menu.visible > .item.current{
  background-color: #9ab913 !important;
  color: #fff !important;
  border-top:none;
}

</style>
