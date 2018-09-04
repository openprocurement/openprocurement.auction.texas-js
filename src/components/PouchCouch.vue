<template>
</template>
<script>
import PouchDB from 'pouchdb'
export default {
    db: null,
    data(){
        return{
            dataa: []
        }
    },

    methods: {
    fetch() {
      this.db.allDocs({include_docs: true})
        .then(r => r.rows)
        .then(list => {
          this.dataa = list
          console.log('fetched %d data', this.$store.commit('setInfoFromCouch', 'data'))
        })
        .catch(console.error)
    }
  },
  created() {
    this.db = new PouchDB('auction')
    let remoteDB = new PouchDB('http://localhost:5984/c1')
    this.db.sync(remoteDB, {
      live: true,
      retry: true
    }).on('change', change => {
      console.log('data change', change)
      this.fetch()
    }).on('error', function (err) {
      console.log('sync error', err)
    });
    this.fetch() // fetch initial
  },
}
</script>

<style>

</style>
