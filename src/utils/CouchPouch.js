import PouchDB from 'pouchdb'
import {getCookieByName} from "../utils/utils"
import detectIE from "../utils/detectIE"
import {fillAuctionData} from '@/utils/getRequest'
var retry = require('retry')

export default {
  changesObj: null,
  isRetried: false,
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
    console.info({
      message: "Setup connection to remote_db",
      auctions_loggedin: Boolean(getCookieByName('auctions_loggedin')) || detectIE()
    })
    // TODO: Notify user that connection lost and connection retry is started with button to reload page
    // and remove that notification if connection was successfully set up
    operation.attempt((currentAttempt) => {
      console.log({message: 'Start sync with CouchDB with attempts number ' + currentAttempt.toString()})
      this.changesObj = component.pouchDB.changes({
        timeout: 40000 - Math.ceil(Math.random() * 10000),
        heartbeat: 10000,
        live: true,
        style: 'main_only',
        continuous: true,
        include_docs: true,
        since: 0,
        doc_ids: [component.id],
      }).on('change', change => {
        if (this.isRetried) {
          component.$notify({
            clean: true,
            group: 'utils'
          })
          component.$notify({
            group: 'utils',
            text: 'Successfully reconnected.',
            duration: 2000,
            type: 'success'
          })
          console.debug({
            message: 'Successfully reconnected.'
          })
          this.isRetried = false
        }
        if (component.id === change.id) {
          fillAuctionData(component, change.doc)
          console.info({
            message: 'Change current_stage',
            current_stage: change.doc.current_stage,
            stages: (change.doc.stages || []).length - 1
          })
          component.syncWithServerTime()
          if (component.$store.state.terminatedStates.indexOf(component.state) !== -1) {
            this.changesObj.cancel()
          }
        }
      }).on('error', (err) => {
        if (!this.isRetried) {
          component.$notify({
            group: 'utils',
            text: 'Internet connection is lost. Trying to reconnect.',
            duration: -1,
            type: 'warning'
          })
          this.isRetried = true
        }
        this.changesObj.cancel()
        if (operation.retry(err)) {
          console.debug({message: 'Retrying long pool connection'})
        }
        console.error({message: 'Synchronization failed'})
      })
    })

    // eslint-disable-next-line
    component.isListeningOnChanges = true
  }
}
