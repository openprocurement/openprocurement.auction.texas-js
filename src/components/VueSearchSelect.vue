<template>
  <div class="autocomplete">
    <input id="input_search" class="search" :class="{ 'arrow-up': isOpen, 'arrow-down': !isOpen }"
           :placeholder="`${$store.state.i18n.translations[$store.state.i18n.locale]['Select amount']}`" 
           v-model.trim="search" 
           @input="onChange()" 
           @click.stop="toggleClick">
    <ul id="autocomplete-results" v-show="isOpen" 
        class="autocomplete-results">
      <li v-for="(result, i) in results" :key="i" 
          @click.stop="setResult(result)"
          id="autocomplete-result"
          class="autocomplete-result" :class="{ 'is-active': i === orderCount }">
        {{ $t(result.text) }}
        <div v-if="result.text !== 'Select amount'">
          {{ $t('UAH') }}
        </div>
      </li>
      <li class="autocomplete-result_not-found" v-if="results.length === 0">
        {{ $t('Not found appropriate price offer') }}
      </li>
    </ul>
  </div>
</template>

<script>
import formatNumber from '../utils/formatNumber'
export default {
  props: {
    items: {
      type: Array,
      required: false,
      default: () => []
    },
  },

  data() {
    return {
      isOpen: false, 
      results: [],
      search: "",
      searchForPicker: "",
      orderCount: 0,
      kindCurrency: this.$store.state.i18n.translations[this.$store.state.i18n.locale]['UAH']
    };
  },
  watch: {
    isOpen(){
      this.$emit('allowClickAnnounce', this.isOpen);
    }
  },
  methods: {
    onChange() {
      this.$emit('setSelectedValue', '');
      // Let's warn the parent that a change was made
      this.$emit("input", (this.search));
      if( this.search === ''){
        this.searchForPicker = ''
        this.orderCount = 0
      }
      // Let's search our flat array
      this.filterResults();
    },
    filterResults() {
      // first uncapitalize all the things
      this.results = this.items.filter(item => {
        return item.value.startsWith(this.search.replace(/ /g,"").replace(/,/g,"."))
      });
    },
    toggleClick(){
      if(this.search === ''){
        this.filterResults()
      }
      this.isOpen = !this.isOpen;
      this.scrollToActiveBidAmount()
    },
    setResult(result) {
      this.results = this.items;
      if(result.text !== 'Select amount'){
        this.search =  result.text + this.kindCurrency
      }
      else{
        this.search =  result.text
      } 
      this.searchForPicker = result.value
      this.isOpen = false;
      if (this.search === 'Select amount'){
        this.search = ''
      }
      this.$emit('setSelectedValue', result.value);
      for (let i=0; i < this.items.length; i++){
        if(this.items[i].value === this.searchForPicker){
          this.orderCount = i;
        }
      }
    },
    scrollToActiveBidAmount(){
      const list = document.getElementById("autocomplete-results"),
        targetLi = document.querySelector('.is-active');
      list.scrollTop = ((targetLi.offsetTop || 0) - 50);
    }
  },
}
</script>



<style>

::-webkit-input-placeholder { /* Chrome/Opera/Safari */
   font-family: 'Roboto', sans-serif;
   font-weight: 200;
}
::-moz-placeholder { /* Firefox 19+ */
   font-family: 'Roboto', sans-serif;
   font-weight: 200;
}
:-ms-input-placeholder { /* IE 10+ */
   font-family: 'Roboto', sans-serif;
   font-weight: 200;
}
:-moz-placeholder { /* Firefox 18- */
   font-family: 'Roboto', sans-serif;
   font-weight: 200;
}

 .search {
  font-family: 'Oswald',sans-serif;
  background-color: #fff;
  width: 100%;
  border: 1px solid lightgray;
  height: 27px;
  font-size: 17px;
  padding-left: 10px;
  padding-right: 40px;
  background-repeat: no-repeat;
  background-position-x: 94%;
  background-position-y: 50%;
  cursor: pointer;
  margin-top: 15px;
  font-weight: 600;
 }

 .autocomplete-result_not-found{
  list-style: none;
  color: red;
  margin-top: 3px;
 }

 .arrow-up{
   background-image: url("/static_texas/images/arrow_up.png");
 }

 .arrow-down{
   background-image: url("/static_texas/images/arrow_down.png");
 }

 .search:focus {
     border-color:#9ab913;
 }

.autocomplete {
  position: relative;
  width: 100%;
}

.autocomplete-results {
  background-color: #fff;
  padding: 0;
  margin: 0;
  overflow: auto;
  width: 100%;
  max-height: 105px !important;
  position: absolute;
  top: 42px;
  z-index: 2;
}

.autocomplete-result {
  font-family: 'Oswald',sans-serif;
  font-weight: 600;
  font-size: 17px;
  list-style: none;
  text-align: left;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #9ab913;
  border-bottom: none;
  min-height: 27px;
  height: auto !important;
  height: 27px;
}

.autocomplete-result.is-active,
.autocomplete-result:hover {
    color: #fff;
    border-top:none;
    background-color: #9ab913;
}

</style>
