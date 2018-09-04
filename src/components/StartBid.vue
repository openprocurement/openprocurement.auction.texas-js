<template>
 <div class="start-pricing-container">
            <h5 class="start-pricing-container__label">
                {{$t('Start value')}}
                </h5>
            <div class="start-pricing-container__block">
                   <h4>{{startBid}} грн</h4>
            </div>
        </div>
</template>

<script>
export default {
    props: ['startBid'],
    data () {
    return { friends: 5 }
  }
}
</script>

<style>


.start-pricing-container__block{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 50px;
    border: 1px solid #a1a1a1;
    margin-bottom: 50px;
}

.start-pricing-container__label{
    color: #000000;
    font-family: Roboto;
    font-size: 14px;
    font-weight: 900;
    line-height: 16px;
    margin-bottom: 20px;
}

.start-pricing-container{
    margin-top: 30px;
}

</style>

