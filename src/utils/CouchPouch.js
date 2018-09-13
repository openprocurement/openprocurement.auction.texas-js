import PouchDB from 'pouchdb'
import infoPouch from '@/fakeInfo/infoPouchCouch'
import store from '../store';

const db = new PouchDB('auction');
let remoteDB = new PouchDB('http://localhost:5984/c1')
const fetch = () => {
  db.allDocs({include_docs: true})
    .then(r => r.rows)
    .then(data => {
      store.commit('setInfoFromCouch', infoPouch);
    })
    .catch(console.error)
}
export { db, remoteDB, fetch }
