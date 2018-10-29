<template>
  <div class="autocomplete">
    <input class="search" 
           :placeholder="`${$store.state.i18n.translations[$store.state.i18n.locale]['Select amount']}`" 
           v-model="search" 
           @input="onChange" 
           @click="toggleClick"
           @keyup.down="onArrowDown" 
           @keyup.up="onArrowUp" 
           @keyup.enter="onEnter">
    <input>
    <ul id="autocomplete-results" v-show="isOpen" 
        class="autocomplete-results">
      <li class="loading" v-if="isLoading">
        Loading results...
      </li>
      <li v-else v-for="(result, i) in results" :key="i" 
          @click="setResult(result)"
          class="autocomplete-result" :class="{ 'is-active': i === orderCount }">
        {{ $t(result.text) }}
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
    isAsync: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  data() {
    return {
      isOpen: false,
      results: [],
      search: "",
      searchForPicker: "",
      isLoading: false,
      orderCount:0
    };
  },
  watch: {
    items: function(val, oldValue) {
      // actually compare them
      if (val.length !== oldValue.length) {
        this.results = val;
        this.isLoading = false;
      }
    }
  },
  methods: {
    onChange() {
      // Let's warn the parent that a change was made
      this.$emit("input", this.search);

      // Is the data given by an outside ajax request?
      if (this.isAsync) {
        this.isLoading = true;
      } else {
        // Let's search our flat array
        this.filterResults();
        this.isOpen = true;
      }
    },

    filterResults(item) {
      // first uncapitalize all the things
      this.results = this.items.filter(item => {
        return item.value.toLowerCase().startsWith(this.search.toLowerCase());
      });
    },
    toggleClick(){
      if(this.search === ''){
        this.filterResults()
      }
      for (let i=0; i < this.items.length; i++){
        if(this.items[i].value === this.searchForPicker){
          this.orderCount = i;
        }
      }
      this.isOpen = !this.isOpen;
    },
    setResult(result) {
      this.search = result.text;
      this.searchForPicker = result.value
      this.isOpen = false;
      this.$emit('setSelectedValue', result.value);
    },

    handleClickOutside(evt) {
      if (!this.$el.contains(evt.target)) {
        this.isOpen = false;
      }
    }
  },
}
</script>



<style>

 .search {
  background-color: #fff;
  width: 100%;
  border: 1px solid lightgray;
  height: 27px;
  padding-left: 10px;
  background-image: url("/static_texas/images/arrow_down.png");
  background-repeat: no-repeat;
  background-position-x: 94%;
  background-position-y: 50%;
  cursor: pointer;
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
}

.autocomplete-result {
  list-style: none;
  text-align: left;
  padding: 4px 2px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #9ab913;
  border-bottom: none;
}

.autocomplete-result.is-active,
.autocomplete-result:hover {
    color: #fff;
    border-top:none;
    height: 27px;
    background-color: #9ab913;
}

</style>
