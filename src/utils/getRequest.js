import axios from 'axios'
import router from '../router'
import parseCurrentStage from './parseCurrentStage'
const getAuctionRequest =  (context, id) =>{
  axios.get(`${context.$store.state.urls.databaseURL}/${id}`)
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
      // if (response.data.auction_type !== 'texas') {
      //   router.push({name: 'errorAuctiontType'})}
      //TODO:make after adding correct auction_type
      parseCurrentStage(response.data.stages, response.data.current_stage, context)
    }).catch(error => {
      router.push({name: 'errorId'})
    })
}

export default getAuctionRequest