import {getCookieByName, deleteCookie} from "../utils/utils"
import detectIE from "../utils/detectIE"
import eventSourcePolyfill from "./eventSourcePolyfill"
var retry = require('retry')
export default {
  evtSrc: null,
  isObserverNotifyCalled: false,
  ableToSubscribe () {
    return (Boolean(getCookieByName('auctions_loggedin')) || detectIE())
  },
  initialize (component) {

    var operation = retry.operation({
      retries: 3,
      factor: 3,
      minTimeout: 1 * 1000,
      maxTimeout: 60 * 1000,
      randomize: true,
    })
    operation.attempt((currentAttempt) => {
      console.debug({
        message: 'Initialize event on attempt number ' + currentAttempt.toString()}
      )
      let eventSourceURL = `${component.$store.state.urls.auctionURL}/${component.$store.state.id}/${component.$store.state.urls.eventSource}`
      // using polyfill instead of native EventSource if browser is IE
      if(detectIE() === false){
        this.evtSrc = new EventSource(eventSourceURL, {withCredentials: true})
      }
      else{
        this.evtSrc = new eventSourcePolyfill.eventSource(eventSourceURL)
      }
      this.evtSrc.addEventListener('ClientsList', e => {
        let data = JSON.parse(e.data)
        if (!!Object.keys(component.$store.state.clients).length) {
          for (let clientId in data) {
            if (!(clientId in component.$store.state.clients)) {
              if (data.hasOwnProperty(clientId)) {
                component.$notify({
                  group: 'kickClient',
                  text: ' (IP:' + data[clientId].ip + ') ',
                  duration: 30000,
                  title: clientId // TODO: try to find better solution to put client id to notification
                })
              }
            }
          }
        }
        component.$store.commit('setClientsInfo', data)
      })

      this.evtSrc.addEventListener('Tick', e => {
        let data = JSON.parse(e.data)
        console.debug({message: 'Tick: ', data})  
        // eslint-disable-next-line
        component.lastSync = new Date(data.time)
      })

      this.evtSrc.addEventListener('Identification', e => {
        let data = JSON.parse(e.data)
        component.$store.commit('setIdentificationInfo', data)
        console.debug({message: data})
      })

      this.evtSrc.addEventListener('KickClient', e => {
        console.debug({message: 'Kicked'})
        deleteCookie('auctions_loggedin')
        window.location.replace(`${component.$store.state.urls.auctionURL}/${component.$store.state.id}/logout`)
      })
      
      this.evtSrc.addEventListener('Close', e => {
        console.debug({
          message: 'Handle close event source', 
          error: e.data
        })
        if (!this.isObserverNotifyCalled) {
          component.$notify({
            group: 'auth',
            text: 'You are an observer and cannot bid.',
            duration: -1
          })
          this.isObserverNotifyCalled = true
        }

      })

      this.evtSrc.onerror = e => {
        console.error({
          message: 'Handle event source error', 
          error_data: e
        })
        this.evtSrc.close()
        if (operation.retry(e)) {
          console.debug({message: 'Retring sse connection'})
        }
      }
    })
  }
}
