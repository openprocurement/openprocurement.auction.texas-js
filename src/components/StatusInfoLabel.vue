<template>
        <div 
        class="status-label-container" 
        :class="'status-label-container__' + type"
        >
        <div
        class="status-label-container__text"
         v-if="state == 'active'">
            {{textStatus}}
            <div class="status-label-container-active__round">
            {{round}}
            </div>
        </div>
          <div v-else
          class="status-label-container__text"
          >
            {{textStatus}}
        </div>
    <div 
    class="status-label-container__sign" 
    :class="'status-label-container__sign_' + type ">
     <img 
     :src="'../assets/images/sign_' + type + '.svg'" 
     :alt="type">
    </div>

        </div>
</template>

<script>
export default {
    props: ['type', 'textStatus', 'round', 'state']

};
</script>

<style>
.status-label-container{
    color: #ffffff;
    width: 198px;
    height: 40px;
    margin-right: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: Roboto;
    font-size: 18px;
    font-weight: 500;
}

.status-label-container__text{
    display: flex;
    align-items: center;
    margin: 0 auto;
}

.status-label-container__sign{
   display: flex;
   justify-content: center;
   align-items: center;
   width: 46px;
   height: 40px;
}

.status-label-container__sign_active{
   background-color: #85a10f;
}

.status-label-container__sign_completed{
   background-color: #e1e7d9;
}

.status-label-container__sign_panding{
   background-color: #d38812;
}

.status-label-container__sign_canceled{
   background-color: #cb5e46;
}

.status-label-container__panding{
    background-color: #f39c11;
}

.status-label-container__active{
    background-color: #9aba13;
}

.status-label-container__canceled{
    background-color: #e4694e;
}

.status-label-container__completed{
    color: #000000;
    background-color:#f1f3f2;
}

.status-label-container-active__round{
    font-family: Oswald;
    font-size: 24px;
    font-weight: 500;
    line-height: 18.35px;
    margin-left: 5px;

}
</style>
