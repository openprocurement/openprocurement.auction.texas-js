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
      retries: 4,
      factor: 3,
      minTimeout: 1 * 1000,
      maxTimeout: 60 * 1000,
      randomize: true,
    })
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
        if (currentAttempt !== 1) {
          console.log('Graceful restart on attemts number ' + currentAttempt.toString())
          operation.reset()
        }
        if (component.id === change.id) {
          fillAuctionData(component, change.doc)
          component.syncWithServerTime()
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
