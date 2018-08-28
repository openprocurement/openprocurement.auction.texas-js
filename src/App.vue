<template>
  <div id="app">
    <router-link :to='"auctions/active"'>active</router-link>
    <router-link :to='"auctions/completed"'>completed</router-link>
      <router-view/>
  </div>
</template>

<style>

</style>
