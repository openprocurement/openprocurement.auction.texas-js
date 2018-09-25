import kickClient from "./kickClient";
import {getCookieByName, deleteCookie} from "../utils/utils"

export default {
  evtSrc: null,
  ableToSubscribe () {
    return Boolean(getCookieByName('auctions_loggedin'));
  },
  initialize (component) {

    let eventSourceURL = `${component.$store.state.urls.auctionURL}/${component.$store.state.id}/${component.$store.state.urls.eventSource}`;
    this.evtSrc = new EventSource(eventSourceURL, {withCredentials: true});

    this.evtSrc.addEventListener('ClientsList', e => {
      let data = JSON.parse(e.data);
      if (!!Object.keys(component.$store.state.clients).length) {
        for (let clientId in data) {
          if (!(clientId in component.$store.state.clients)) {
            if (data.hasOwnProperty(clientId)) {
              component.$notify({
                group: 'kickClient',
                text: component.$t('In the room came a new user') + ' (IP:' + data[clientId].ip + ') ' + component.$t('prohibit connection'),
                duration: 5000
              });
              // TODO: Use notification bar with button instead for optionally client kicking by kickClient function
              kickClient(component.$store.state, clientId)
            }
          }
        }
      }
      component.$store.commit('setClientsInfo', data);
    });

    this.evtSrc.addEventListener('Tick', e => {
      let data = JSON.parse(e.data);
      console.log('Tick: ', data);
      // TODO: timer info and timer progress bar were bound to Tick time value in previous version of frontend app
    });

    this.evtSrc.addEventListener('Identification', e => {
      let data = JSON.parse(e.data);
      component.$store.commit('setIdentificationInfo', data);
      console.log(data)
    });

    this.evtSrc.addEventListener('KickClient', e => {
      console.log('Kicked', e.data);
      deleteCookie('auctions_loggedin');
      window.location.replace(`${component.$store.state.urls.auctionURL}/${component.$store.state.id}/logout`)
    });

    this.evtSrc.addEventListener('Close', e => {
      console.log('Close', e.data);
      component.$notify({
        group: 'auth',
        text: component.$t('You are an observer and cannot bid.'),
        duration: -1
      });
    });

    this.evtSrc.onerror = e => {
      console.log('Handle event source error', e.data);
    };
  }
}
