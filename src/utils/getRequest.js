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
  parseCurrentStage(data.stages, data.current_stage, context)
}


const getAuctionRequest =  (context, id) =>{
  axios.get(`${context.$store.state.urls.databaseURL}/${id}`)
    .then(response => {
      if (response.data.auction_type !== 'texas') {
        router.push({name: 'errorAuctiontType'})}
      fillAuctionData(context, response.data)
      context.syncWithServerTime()
    }).catch(error => {
      console.log(error)
      router.push({name: 'errorId'})
    })
}

export { getAuctionRequest, fillAuctionData }