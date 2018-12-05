import axios from 'axios'
import router from '../router'
import parseCurrentStage from './parseCurrentStage'


const fillAuctionData = (context, data) => {
  context.priceOffers = data.initial_bids
  context.startPrice = data.initial_value
  context.currentStage = data.current_stage
  context.currentType = data.stages[data.stages.length - 1].type
  context.endDate = data.endDate
  context.stages = data.stages
  context.companyName = data.procuringEntity.name
  context.descriptionOfProducts.description_uk = data.description
  context.descriptionOfProducts.description_ru = data.description_ru
  context.descriptionOfProducts.description_en = data.description_en
  context.minimalStep = data.minimalStep.amount
  context.auctionId = data.auctionID
  context.tenderTitles.tenderTitle_uk = data.title
  context.tenderTitles.tenderTitle_ru = data.title_ru
  context.tenderTitles.tenderTitle_en = data.title_en
  context.results = data.results
  parseCurrentStage(data.stages, data.current_stage, context)
}

// get request logic
const getAuctionRequest =  (context, id) =>{
  axios.get(`${context.$store.state.urls.databaseURL}/${id}`)
    .then(response => {
      // transfer to errorAuctiontType view when response.data.auction_type !=='texas'
      if (response.data.auction_type !== 'texas') {
        console.error({message: 'Please use the correct link to view the auction.'})
        router.push({name: 'errorAuctiontType'})}
      // for setting all appropriate property in component based on getted data from APi
      fillAuctionData(context, response.data)
      // call context.syncWithServerTime everytime when was called getAuctionRequest()
      context.syncWithServerTime()
    }).catch(error => {
      if (error) {
        if (error.response.status == 404) {
          console.error({
            message: 'Not Found Error',
            error_data: error
          })
          // transfer to errorAuctionId view when error.response.status == 404
          router.push({name: 'errorId'})
        } else {
          console.error({
            message: 'Server Error',
            error_data: error
          })
        }
      }
    })
}

export { getAuctionRequest, fillAuctionData }