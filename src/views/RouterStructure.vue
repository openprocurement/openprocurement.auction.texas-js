<template>
  <div class="router-structure">
    <router-link :to="'/active'">active</router-link>
    <router-link :to="'/completed'">completed</router-link>
    <router-link :to="'/pendingOfAuction'">pendingOfAuction</router-link>
    <router-link :to="'pendingOfRound'">pendingOfRound</router-link>
  </div>
</template>

<style>
    .router-structure{
        display: flex;
        flex-direction: column;
    }
</style>