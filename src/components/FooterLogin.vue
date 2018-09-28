<template>
  <div class="button_login-container ">
    <button v-if="allowedLogin"
            class="butoon_login positionLogin"
            type="submit" 
            @click="actionLogin">
      {{ $t("Login") }}
    </button>
    <div v-else class="close-login-container positionLogin">
      <h4 class="close-login-container__close">
        {{ $t("Login is currently closed.") }}
      </h4>
      <h5 class="close-login-container__later">
        {{ $t ("Please try again later.") }}
      </h5>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    allowedLogin: {
      type: Boolean,
      default: null
    }
  },
  methods: {
    actionLogin() {
      let loginURL = `${this.$store.state.urls.auctionURL}/${this.$store.state.id}/login?bidder_id=${this.$route.query.bidder_id}&hash=${this.$route.query.hash}`
      location.replace(loginURL)
    }
  }
}
</script>

<style>

.button_login-container {
    width: 100%;
    display: flex;
    justify-content: center;
}
.butoon_login{
    height: 60px;
    color:#ffffff;
    font-size: 20px;
    font-weight: 500;
    font-family: 'Roboto', sans-serif;
    cursor: pointer;
    background-color: rgb(48, 148, 48);
    width: 90%;
    height: 41px;
}

.positionLogin {
    position: fixed;
    bottom: 3%;
    z-index: 1;
}

.close-login-container {
    display: flex;
    flex-direction: column
}

.close-login-container__later {
    color: rgb(97, 190, 221);
    text-align: center;
}

.butoon_login:hover {
    background-color: rgb(16, 177, 16);
}

.butoon_login:hover:active{
    background-color: rgb(9, 116, 9);
}


</style>
