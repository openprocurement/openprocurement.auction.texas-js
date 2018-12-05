<template>
  <toggle-switch
    :options="myOptions"
    @change="changeLanguage"/> 
</template>

<script>
const languagesListing = {
  en : 'English',
  ru: 'Русский',
  uk: 'Українська',
  Русский: 'ru',
  Українська: 'uk',
  English: 'en'
}
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
          noBorder: false,

        },
        size: {
          fontSize: 14,
          height: 42,
          padding: 11,
          width: 280
        },
        items: {
          delay: .4,
          preSelected: languagesListing[localStorage.getItem('language')] || languagesListing.en,
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
    changeLanguage(e){
    // globally change of language  by commit to store
      this.$store.commit('language', languagesListing[e.value] )
    }
  }
}

</script>

<style scoped>
.toggle-switch{
  max-width: 90%;
}
</style>

