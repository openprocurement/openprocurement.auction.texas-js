<template>
  <div class="notifications-container">
    <notifications :max="1" group="auth" class="custom-notifications"/>
    <notifications group="kickClient" class="custom-notifications">
      <template slot="body" slot-scope="props">
        <div class="kick-client-template">
          {{ props.item.text }}
          <button class="kick-button" @click="kickNewClient(props.item.title) || props.close()">
            Kick
          </button>
        </div>
      </template>
    </notifications>
    <notifications group="clientList" class="custom-notifications"/>
  </div>
</template>
<script>
import kickClient from "@/utils/kickClient";

export default {
  data(){
    return {}
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
  border: 1px solid black;
  display: flex;
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
}
</style>
