import axios from 'axios'
import parseCurrentStage from './parseCurrentStage'
const getAuctionRequest =  (context, id) =>{
  axios.get(`${context.$store.state.urls.serverURL}database/${id}`)
    .then(response => {
      context.initialBidsArr = response.data.initial_bids
      context.startBid = response.data.initial_value
      context.currentStage = response.data.current_stage
      context.currentType = response.data.stages[response.data.stages.length - 1].type
      context.endDate = response.data.endDate
      context.stages = response.data.stages
      context.companyName = response.data.procuringEntity.name
      context.descriptionOfProducts = response.data.description
      context.minimalStep = response.data.minimalStep.amount
      context.auctionId = response.data.auctionID;
      parseCurrentStage(response.data.stages, response.data.current_stage, context)
    }).catch(error => {
      console.log(`${context.$store.state.urls.serverURL}database/${id}`)
    })
}

export default getAuctionRequest