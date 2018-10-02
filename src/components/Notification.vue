<template>
  <div class="notifications-container">
    <notifications :max="1" :style="{color: '#0c5460', backgroundColor: '#d1ecf1', width: bgWidth, borderLeft: borderLeft}"
                   group="auth" class="custom-notifications"/>
    <notifications :style="{color: '#856404', backgroundColor: '#fff3cd', width: bgWidth, borderLeft: borderLeft}" 
                   group="kickClient" class="custom-notifications">
      <template slot="body" slot-scope="props">
        <div class="kick-client-template">
          {{ $t(props.item.text) }}
          <button class="kick-button" @click="kickNewClient(props.item.title) || props.close()">
            Kick
          </button>
        </div>
      </template>
    </notifications>

    <notifications group="utils" class="custom-notifications">
      <template slot="body" slot-scope="props">
        <div v-if="props.item.type === 'warning'" :style="{color: '#856404', backgroundColor: '#fff3cd', width: bgWidth, borderLeft: borderLeft, backgroundImage: bgImage}">
          {{ $t(props.item.text) }}
        </div>
        <div v-else-if="props.item.type === 'error'" :style="{color: '#721c24', backgroundColor: '#f8d7da', width: bgWidth, borderLeft: borderLeft, backgroundImage: bgImage}">
          {{ $t(props.item.text) }}
        </div>
        <div v-else-if="props.item.type === 'success'" :style="{color: '#155724', backgroundColor: '#d4edda', width: bgWidth, borderLeft: borderLeft, backgroundImage: bgImage}">
          {{ $t(props.item.text) }}
        </div>
      </template>
    </notifications>
  </div>
</template>
<script>
import kickClient from "@/utils/kickClient";

export default {
  data() {
    return {
      bgWidth: '100%',
      bgHeight: '30px',
      margin: '0',
      borderLeft: 'none',
    }
  },
  methods: {
    kickNewClient(clientId) {
      kickClient(this.$store.state, clientId)
    }
  }
};
</script>
<style>
.kick-client-template {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.custom-notifications {
  display: flex;
  position: static !important;
  width: 100% !important;
  flex-direction: column;
}

.notifications-container {
  display: flex;
  position: fixed;
  flex-direction: column;
  width: 100%;
}

.kick-button {
  margin-left: 15px;
  width: 100px;
  height: 30px;
  background-color: lightcoral;
}

.vue-notification {
  background: none !important ;
  color: inherit !important;
  border-left: 1px solid black !important;
  margin: 0 40px 5px !important;
}

.notification-wrapper:hover {
  opacity: 0.8;
  transition: 1s ease;
}

</style>
