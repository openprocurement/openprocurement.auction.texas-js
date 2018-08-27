<template>
 <div class="start-pricing">
            <h3>Стартова ціна</h3>
            <div class="start-pricing-label">
                   <h4>{{startRate}} грн</h4>
            </div>
        </div>
</template>

<script>
export default {
    props: ['startRate']

}
</script>

<style>


.start-pricing-label{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 50px;
    border: 1px solid #a1a1a1;
    margin-bottom: 50px;
}

.start-pricing{
    margin-top: 30px;
}

</style>

