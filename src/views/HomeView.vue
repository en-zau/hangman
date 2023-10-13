<script>
import BottomCard from '../components/BottomCard.vue';
import { useGame } from '@/stores/game';

export default {
    setup() {
      return {
        game: useGame(),
      }
    },
    computed: {
        currentImg() {
            return `/src/assets/${ this.game.currentState}.png`
        }
    },
    methods: {
        getLetter(index) {
            if(this.game.word.charAt(index)) {
                return this.game.word.charAt(index)
            }
            else {
                return ''
            }
        }
    },
    components: {
        BottomCard
    }
}

</script>

<template>
    <div v-if="this.game.currentIndex < 4" class="container">
        <div class="slogan">
            <p>Dites non au harcelement.</p>
            <img src="@/assets/yellow.png" alt="">
        </div>
        <div class="illustration">
            <img src="@/assets/ilu1.svg" alt="">
            <img src="@/assets/blob1.svg" alt="">
        </div>
    </div>
    <div v-else-if="this.game.currentIndex === 4 || this.game.currentIndex === 5" class="game">
        <img class="game-img" :src="currentImg" alt="">
        <div class="word-letters">
            <div v-for="index in this.game.wordLength" v-bind="index" class="word-letter">
                {{ getLetter(index -1) }}
            </div>
        </div>
    </div>
    <BottomCard /> 
</template>

<style>
.game-img {
    height: 50%;
}

.word-letters {
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    min-height: 31.500px;
}
.word-letter {
    margin: 0 5px;
    width: 20px;
    text-align: center;
    font-size: 23px;
    border-bottom: 1px solid black;
}

.game {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    width: 100vw;
    height: calc(100vh - 360px)  ;
}

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
