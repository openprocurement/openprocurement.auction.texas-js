import PouchDB from 'pouchdb'
import infoPouch from '@/fakeInfo/infoPouchCouch'
import config from '../config.json'

// const db = new PouchDB(config.pouchURL);
const pouchDB = new PouchDB('todo');
// let remoteDB = new PouchDB(config.couchURL)
let couchDB = new PouchDB(`${config.serverURL}database`)
// const fetch = (store) => {
//   console.log('pouch')
//   db.allDocs({include_docs: true})
//     .then(r => r.rows)
//     .then(data => {
//       console.log('data',data)
//       // store.commit('setInfoFromCouch', data);
//     })
//     .catch(console.error)
// }
// export { db, remoteDB, fetch }
export { pouchDB, couchDB }
