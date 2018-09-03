<template>
<toggle-switch
  :options="myOptions"
  @change="$ml.change($event.value)"
  /> 
</template>

<script>
export default {
    data(){
        return{
          language: 'english',
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
      {name: 'english', color: '#000', backgroundColor: 'lightgrey'}, 
      {name: 'українська', color: '#000', backgroundColor: 'lightgrey'},
      {name: 'русский', color: '#000', backgroundColor: 'lightgrey'}
    ]
  }
}
        }
    }
}

</script>

<style>

</style>

