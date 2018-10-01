import axios from 'axios'
import router from '../router'
import parseCurrentStage from './parseCurrentStage'

const fillAuctionData = (context, data) => {
  context.initialBidsArr = data.initial_bids
  context.startBid = data.initial_value
  context.currentStage = data.current_stage
  context.currentType = data.stages[data.stages.length - 1].type
  context.endDate = data.endDate
  context.stages = data.stages
  context.companyName = data.procuringEntity.name
  context.descriptionOfProducts = data.description
  context.minimalStep = data.minimalStep.amount
  context.auctionId = data.auctionID
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