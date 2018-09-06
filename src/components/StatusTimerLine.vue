<template>
<transition>
    <div  v-if="state == 'active'"
    :style="progressStyles"
    class="progress">
    <div class="progress-bar"
    >
    </div>
</div>
</transition>
</template>

<script>
export default {
props:['remainedTimeOfRound', 'durationOfRound', "state" ],

    computed: { 
        progressStyles() {
            return {
                width: (100 - (this.remainedTimeOfRound / this.durationOfRound * 100)) + '%'
            }
        }
    }
}

</script>

<style>

.progress{
    position: fixed;
    left: 0;
    top: 92px;
    height: 4px;
    background-color: #9ab913;
    transition: width .6s ease;
}

</style>
