<template>
    <div class="game">
        <img src="" alt="">
        <div class="word">
            
        </div>
    </div>
    
</template>
<script>
import socket from '../socket';
import { useGame } from '@/stores/game';

export default {
    setup() {
      return {
        game: useGame(),
      };
    },
}

</script>
<style>

</style>