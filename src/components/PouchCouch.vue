<template>
</template>
<script>
import PouchDB from 'pouchdb'
import infoPouch from '@/fakeInfo/infoPouchCouch'
export default {
    db: null,
    data(){
        return{
            data: []
        }
    },

    methods: {
    fetch() {
      this.db.allDocs({include_docs: true})
        .then(r => r.rows)
        .then(list => {
          this.data = infoPouch;
          this.$store.commit('setInfoFromCouch', this.data);
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
      this.data = change
      this.$store.commit('setInfoFromCouch', this.data);
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
