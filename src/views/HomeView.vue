<script setup>
import BottomCard from '../components/BottomCard.vue';

</script>

<template>
    <div class="slogan">
        <p>Dites non au harcelement.</p>
        <img src="@/assets/yellow.png" alt="">
    </div>
    <div class="illustration">
        <img src="@/assets/ilu1.svg" alt="">
        <img src="@/assets/blob1.svg" alt="">
    </div>
    <BottomCard />
</template>

<style>
.illustration img:last-of-type {
    position: absolute;
    z-index: -1;
    top: -33px;
}
.illustration {
    position: relative;
    margin-top: 20px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.slogan {
    text-align: center;
    width: 100%;
    position: relative;
}
.slogan img {
    position: absolute;
    top: 50%;  
    left: 50%;
    transform: translate(-47%, 0%)
}
</style>
