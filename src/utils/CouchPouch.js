import PouchDB from 'pouchdb'
import {fillAuctionData} from '@/utils/getRequest'


export default {
  initialize (component) {
    return new PouchDB(`${component.$store.state.urls.databaseURL}`)
  },
  startSync (component) {
    console.log('Start sync with CouchDB')
    component.pouchDB.changes({
      live: true,
      retry: true,
      include_docs: true
    }).on('change', change => {
      if (component.id === change.id) {
        fillAuctionData(component, change.doc)
        component.syncWithServerTime()
      }
    }).on('error', function (err) {
      console.log('sync error', err)
    });
    // eslint-disable-next-line
    component.isListeningOnChanges = true
  }
}
