import axios from 'axios'
const getAuctionRequest =  (context, id) =>{
  axios.get(`${context.$store.state.urls.serverURL}database/${id}`)
    .then(response => {
      context.initialBidsArr = response.data.initial_bids
      context.startBid = response.data.initial_value
      context.current_stage = response.data.current_stage
      context.current_type = response.data.stages[response.data.stages.length - 1].type
      context.endDate = response.data.endDate
      context.stages = response.data.stages
      context.companyName = response.data.procuringEntity.name
      context.descriptionOfProducts = response.data.description
      context.minimalStep = response.data.minimalStep.amount
      context.auctionId = response.data.auctionID
    }).catch(error => {
      console.log(`${context.$store.state.urls.serverURL}database/${id}`)
    })
}
export default getAuctionRequest