<template>
  <toggle-switch
    :options="myOptions"
    @change="ChangeLanguage"/> 
</template>

<script>
export default {
  data(){
    return{
      myOptions: {
        layout: {
          color: 'black',
          backgroundColor: '#fff',
          selectedColor: 'white',
          selectedBackgroundColor: 'green',
          borderColor: 'lightgrey',
          fontFamily: 'Arial',
          fontWeight: 'normal',
          squareCorners: false,
          noBorder: false
        },
        size: {
          fontSize: 14,
          height: 42,
          padding: 7,
          width: 250
        },
        items: {
          delay: .4,
          preSelected: localStorage.getItem('language'),
          disabled: false,
          labels: [
            {name: 'English', color: '#000', backgroundColor: 'lightgrey'}, 
            {name: 'Українська', color: '#000', backgroundColor: 'lightgrey'},
            {name: 'Русский', color: '#000', backgroundColor: 'lightgrey'}
          ]
        },
      }
    }
  },
  methods:{
    ChangeLanguage(e){
      let locale;
      if(e.value === 'Русский'){
        locale = 'ru'
      }
      else if(e.value === 'Українська'){
        locale = 'uk'
      }
      else{
        locale = 'en'
      }
      this.$store.commit('language', locale)
    }
  }
}

</script>

<style>
.toggle-switch{
  max-width: 90%;
}

</style>

