<template>
<toggle-switch
  :options="myOptions"
  @change="updateMap($event.value)" 
  @selected="selectedMethod()" 
  v-model="selectedMapOption"
  :value="selectedMapOption" 
  :group="switchGroup"
  /> 
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
    height: 34,
    padding: 7,
    width: 250
  },
  items: {
    delay: .4,
    preSelected: 'unknown',
    disabled: false,
    labels: [
      {name: 'English', color: '#000', backgroundColor: 'lightgrey'}, 
      {name: 'Українська', color: '#000', backgroundColor: 'lightgrey'},
      {name: 'Русский', color: '#000', backgroundColor: 'lightgrey'}
    ]
  }
}
        }
    }
}

</script>

<style>

</style>

