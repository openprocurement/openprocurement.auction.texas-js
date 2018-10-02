
<template>
  <div class="arrow-button">
    <a :href="url">
      <img class ="arrow-button"
           src="/static_texas/images/left-arrow-button.svg" alt="left-arrow-button">
    </a>
  </div>
</template>

<script>
export default {
  data(){
    return{
      url: this.$store.state.identification.returnURL
    }
  }
}
</script>

<style>
.arrow-button {
    width: 25px;
    height: 25px;
    position: fixed;
    top: 50%;
}
</style>
