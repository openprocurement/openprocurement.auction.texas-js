<template>
  <div class="not-found-container">
    <div v-if="refresh">
      {{ $t("Not Found") }}
    </div>
  </div> 
</template>

<script>
export default {
  data(){
    return{
      refresh: false
    }
  },
  created() {
    window.onload = ()=> this.refresh = true
    document.title = '-'
  }
}
</script>


<style>
  .not-found-container {
    color: #a94442;
    background-color: #f2dede;
    border-color: #ebccd1;
    padding: 15px;
    margin-bottom: 20px;
    border: 1px solid transparent;
    border: transparent;
    border-radius: 4px;
    max-width: 767px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-left: auto;
    margin-right: auto;
    margin-top: 50px;
    min-height: 50px;  
    height: auto !important;  
    height: 50px; 
    padding-left: 50px;
}
</style>