<template>
  <div class="notifications-container">
    <notifications :max="1" :style="{color: '#0c5460', backgroundColor: '#d1ecf1', width: bgWidth, borderLeft: borderLeft, fontSize: fontSize,backgroundImage: bgImage, borderRadius: borderRadius, boxShadow: '1px 0 6px -3px #0c5460' }"
                   group="auth" class="custom-notifications">
      <template slot="body" slot-scope="props">
        <div>
          <a class="close" @click="props.close">
            <i class="fa fa-fw fa-close" />
          </a>
          <div class="text-title-info">
            {{ $t(props.item.text) }}
          </div>
        </div>
      </template>
    </notifications>

    <notifications :style="{color: '#856404', backgroundColor: '#fff3cd', width: bgWidth, borderLeft: borderLeft, fontSize: fontSize, backgroundImage: bgImage, borderRadius: borderRadius, boxShadow: '1px 0 6px -3px #fff3cd'}" 
                   group="kickClient" class="custom-notifications">
      <template slot="body" slot-scope="props">
        <a class="close" @click="props.close">
          <i class="fa fa-fw fa-close" />
        </a>
        <div class="kick-client-template">
          {{ $t('In the room came a new user') + ' ' + props.item.text }}
          <button class="kick-button" @click="kickNewClient(props.item.title) || props.close()">
            {{ $t('prohibit connection') }}
          </button>
        </div>
      </template>
    </notifications>

    <notifications group="utils" class="custom-notifications">
      <template slot="body" slot-scope="props">
        <a class="close" @click="props.close">
          <i class="fa fa-fw fa-close" />
        </a>
        <div v-if="props.item.type === 'warning'" :style="{display: display, alignItems: alignItems, fontSize: fontSize, paddingLeft: paddingLeft, color: '#856404', height: bgHeight, backgroundColor: '#fff3cd', width: bgWidth, borderLeft: borderLeft, backgroundImage: bgImage, borderRadius: borderRadius, boxShadow: '1px 0 6px -3px #fff3cd'}">
          {{ $t(props.item.text) }}
        </div>
        <div v-else-if="props.item.type === 'error'" :style="{display: display, alignItems: alignItems, fontSize: fontSize, paddingLeft: paddingLeft, color: '#721c24', height: bgHeight, backgroundColor: '#f8d7da', width: bgWidth, borderLeft: borderLeft, backgroundImage: bgImage, borderRadius: borderRadius, boxShadow: '1px 0 6px -3px #f8d7da'}">
          {{ $t(props.item.text) }}
        </div>
        <div v-else-if="props.item.type === 'success'" :style="{display: display, alignItems: alignItems, fontSize: fontSize, paddingLeft: paddingLeft, color: '#155724', height: bgHeight, backgroundColor: '#d4edda', width: bgWidth, borderLeft: borderLeft, backgroundImage: bgImage, borderRadius: borderRadius, boxShadow: '1px 0 6px -3px #d4edda'}">
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
      bgHeight: '45px',
      margin: '0',
      borderLeft: 'none',
      display: 'flex',
      alignItems: 'center',
      paddingLeft: '42px',
      bgImage: '',
      borderRadius: '5px',
      fontSize: '17px'
    }
  },

  mounted() {
    window.addEventListener('resize', this.onResize)},

  methods: {
    onResize(){
      if(window.innerWidth <= 478){
        this.bgHeight = '60px'
      }
      else {
        this.bgHeight = '45px'
      }
    },
    kickNewClient(clientId) {
      kickClient(this.$store.state, clientId)
    }
  }
};
</script>
<style>
.fa {
  font-size: 17px !important;
  color: grey !important; 
  cursor:pointer;
}
.text-title-info{ 
  margin-left: 50px;
}
.kick-client-template {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 20px;
  margin-top: 5px;
  margin-right: 55px;
}
.custom-notifications {
  display: flex;
  position: static !important;
  width: 100% !important;
  flex-direction: column;
}

.close {
  position: absolute;
  right: 5%;
}

.notifications-container {
  position: fixed;
  width: 100%;
  top: 100px !important;
}

.notification-wrapper {
  min-height: 50px;  
  height: auto !important;  
  height: 50px; 
  min-width: 324px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
}

.kick-button {
  margin-left: 15px;
  width: auto;
  padding: 0 5px;
  height: 30px;
  background-color: rgb(239, 222, 168);
  margin-left: 80px !important;
}

.kick-button:hover {
  background-color: lightcoral;
  color: #727272;
}

.vue-notification {
  display: flex !important;
  align-items: center !important;
  background: none !important ;
  color: inherit !important;
  border-left: none !important;
  margin: 0 40px 5px !important;
  height: 45px !important;
  font-size: 17px !important;
}

.notification-wrapper:hover {
  opacity: 0.8;
  transition: 1s ease;
}

@media screen and (max-width: 478px) {
  .notification-wrapper{
    display: flex !important;
    min-height: 85px !important;
    align-items: center !important;
  }

.kick-client-template {
    flex-direction: column;
    align-items: center;
 }

.kick-button {
  height: 20px;
 }

.close {
  top: 60% ;
 }
}

</style>
