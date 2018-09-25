import axios from 'axios'

const kickClient = (context, clientId) => {
  console.log('got into kickClient');
  let jsonToSend = {
    'client_id': clientId
  };
  axios.post(
    `${context.urls.auctionURL}/${context.id}/kickclient`,
    jsonToSend,
    {withCredentials: true}
  ).then(response => {
    console.log(response);
    console.log('disable connection for client ' + clientId)
  }).catch(error => {
    console.log(error)
  })
};

export default kickClient
