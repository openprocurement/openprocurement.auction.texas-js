
<template>
<div class="hong-container"
     :class="'hong-container_'"
>
    <div class="hong-container__text">
        ЛУНАЄ ГОНГ!
    </div>
</div>
</template>

<script>
export default{

}
</script>

<style>
.hong-container{
    width: 100%;
    height: 43px;
    background:#bce6ea;
    position: fixed;
    left: 0;
    top: 96px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.hong-container__text{
    font-family: Roboto;
    font-size: 16px;
    font-weight: 800;
    line-height: 16px;
    color: #000000;
    letter-spacing: 1.6px;
}

.hong-container_hide{
    display: none;
}

</style>
