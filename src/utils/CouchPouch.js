import PouchDB from 'pouchdb'
import infoPouch from '@/fakeInfo/infoPouchCouch'
import config from '../config.json'

const db = new PouchDB(config.pouchURL);
let remoteDB = new PouchDB(config.couchURL)
const fetch = (store) => {
  store.commit('setInfoFromCouch', 'infoPouch');
  db.allDocs({include_docs: true})
    .then(r => r.rows)
    .then(data => {
      store.commit('setInfoFromCouch', 'infoPouch');
    })
    .catch(console.error)
}
export { db, remoteDB, fetch }
