<template>
<div v-if="currentIndex === 0" class="bottom-card">
  <p style="margin: 14px 0;font-size: 22px;font-style: normal;font-weight: 600;">Lutter contre le harcèlement</p>
  <p style="font-size: 17px;font-style: normal;font-weight: 400;margin: 0 30px; text-align:center">Vous pouvez créer une session ou rejoindre une session avec un code.</p>
  <div class="two-buttons">
    <button @click="this.changeIndex(1, 'creator')" class="btn black">Créer</button>
    <button @click="this.changeIndex(1, 'player')" class="btn border">Rejoindre</button>
  </div>
</div>
<div v-if="currentIndex === 1" class="bottom-card">
  <p style="margin: 14px 0;font-size: 22px;font-style: normal;font-weight: 600;">Comment vous vous appelez?</p>
  <input v-model="username" class="username" type="text" placeholder="Nom d'utilisateur">
  <button class="btn black" @click="this.changeIndex(2, this.username)">Suivant</button>
</div>
<div v-if="currentIndex === 2" class="bottom-card">
  <p style="margin: 10px 0;font-size: 22px;font-style: normal;font-weight: 600;">Rejoindre une session</p>
  <input v-model="username" class="username" type="text" placeholder="Nom d'utilisateur">
  <button class="btn black">Rejoindre</button>
</div>
<div v-if="currentIndex === 3" class="bottom-card">
  <p style="margin: 10px 0 0;font-size: 22px;font-style: normal;font-weight: 600;">Créer une session</p>
  <div style="position: relative;">
    <p style="margin: 4px;">Partager ce code:</p>
    <img style="position:absolute;width:67px; height:13px; top: 14px; left:10px" src="/src/assets/yellow.png" alt="">
  </div>
  <p style="font-size: 25px; margin:3px">4 5 6 5 4</p>
  <p style="margin: 3px;">Joueurs connectés:</p>
  <div class="players">
    <p class="player">Romain</p>
    <p class="player">Enzo</p>
    <p class="player">Elouanne</p>
    <p class="player">Elouanne</p>
    <p class="player">Elouanne</p>
  </div>
  <button class="btn black">Commencer</button>
</div>
</template>
  
<script>
import { useGame } from '@/stores/game';
  export default {
    name: 'BottomCard',
    data() {
      return {
        username: ''
      }
    },
    computed: {
      currentIndex() {
        return this.game.currentIndex;
      }
    },
    methods: {
      changeIndex(index, option) {
        this.game.changeIndex(index, option);
      }
    },
    setup() {
      return {
        game: useGame()
      };
  },

  }
</script>
<style>
.players {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 90%;
  justify-content: center;
  height: 80px;
  align-items: start;
}

.player {
  font-size: 17px;
  padding: 2px 10px;
gap: 10px;
border-radius: 5px;
background: #F2F2F2;
margin: 4px;
}
.username {
  padding: 15px 20px;
  border-radius: 8px;
border: 0.5px solid #BCBCBC;
background: #FFF;
width: 70%;
margin: 30px 0 60px;
color: black;
  font-family: 'Red Hat Display', sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}
.username::placeholder {
  color: #818181;
  font-family: 'Red Hat Display', sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}
.bottom-card {
  border-radius: 35px 35px 0px 0px;
  background: #FFF;
  box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.25);
  position: absolute;
  bottom: 0;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.two-buttons {
  margin-top: 15px;
  display: inline-flex;
flex-direction: column;
align-items: flex-start;
gap: 15px;
}
</style>
  