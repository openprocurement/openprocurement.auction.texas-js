<template>
  <div id="app">
    <router-link :to='"auctions/active"'>active</router-link><br/>
    <router-link :to='"auctions/completed"'>completed</router-link><br/>
    <router-link :to='"auctions/pendingOfAuction"'>pendingOfAuction</router-link><br/>
    <router-link :to='"auctions/pendingOfRound"'>pendingOfRound</router-link><br/>
      <router-view/>
  </div>
</template>

<style>

</style>
