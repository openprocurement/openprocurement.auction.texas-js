import PouchDB from 'pouchdb'
import {fillAuctionData} from '@/utils/getRequest'
var retry = require('retry')

export default {
  changesObj: null,
  initialize (component) {
    return new PouchDB(`${component.$store.state.urls.databaseURL}`)
  },
  startSync (component) {
    var operation = retry.operation({
      forever: true,
      retries: 3,
      factor: 3,
      minTimeout: 1 * 1000,
      maxTimeout: 60 * 1000,
    })
    // TODO: Notify user that connection lost and connection retry is started with button to reload page
    // and remove that notification if connection was successfully set up
    operation.attempt((currentAttempt) => {
      console.log('Start sync with CouchDB with attempts number ' + currentAttempt.toString())
      this.changesObj = component.pouchDB.changes({
        timeout: 40000 - Math.ceil(Math.random() * 10000),
        heartbeat: 10000,
        live: true,
        style: 'main_only',
        continuous: true,
        include_docs: true,
        since: 0,
        doc_ids: [component.id]
      }).on('change', change => {
        console.log('Graceful start on attemts number ' + currentAttempt.toString())
        if (component.id === change.id) {
          fillAuctionData(component, change.doc)
          component.syncWithServerTime()
          if (component.$store.state.terminatedStates.indexOf(component.state) !== -1) {
            this.changesObj.cancel()
          }
        }
      }).on('error', (err) => {
        this.changesObj.cancel()
        if (operation.retry(err)) {
          console.log('Retring long pool connection')
        }
        console.log('sync error', err)
      })
    })

    // eslint-disable-next-line
    component.isListeningOnChanges = true
  }
}
