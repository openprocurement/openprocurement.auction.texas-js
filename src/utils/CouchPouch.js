import PouchDB from 'pouchdb'
import getAuctionRequest from '@/utils/getRequest'


export default {
  db: null,
  initialize (component) {
    this.db = new PouchDB(`${component.$store.state.urls.databaseURL}`)
    this.db.changes({
      live: true,
      retry: true
    }).on('change', change => {
      if (component.id === change.id) {
        getAuctionRequest(component, component.id)
      }
    }).on('error', function (err) {
      console.log('sync error', err)
    });
  }
}
