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
  <input minlength="3" maxlength="10" v-model="username" class="username" type="text" placeholder="Nom d'utilisateur">
  <button class="btn black" @click="this.changeIndex(2, this.username)">Suivant</button>
</div>
<div v-if="currentIndex === 2" class="bottom-card">
  <p style="margin: 10px 0;font-size: 22px;font-style: normal;font-weight: 600;">Rejoindre une session</p>
  <div class="input-code">
    <input ref="input-0" @input="handleChange" type="number" pattern="[0-9]*" min="0" max="9" maxlength="1"  value="" inputtype="numeric" required>
    <input ref="input-1" @input="handleChange" type="number" pattern="[0-9]*" min="0" max="9" maxlength="1"  value="" inputtype="numeric" required>
    <input ref="input-2" @input="handleChange" type="number" pattern="[0-9]*" min="0" max="9" maxlength="1"  value="" inputtype="numeric" required>
    <input ref="input-3" @input="handleChange" type="number" pattern="[0-9]*" min="0" max="9" maxlength="1"  value="" inputtype="numeric" required>
    <input ref="input-4" @input="handleChange" type="number" pattern="[0-9]*" min="0" max="9" maxlength="1"  value="" inputtype="numeric" required>
  </div>
  <button @click="this.changeIndex(3, this.code)" class="btn black">Rejoindre</button>
</div>
<div v-if="currentIndex === 3" class="bottom-card">
  <p style="margin: 10px 0 0;font-size: 22px;font-style: normal;font-weight: 600;">{{ this.role === 'creator' ? 'Créer une session' : "La partie va commencer..." }}</p>
  <div style="position: relative;">
    <p style="margin: 4px;">Partager ce code:</p>
    <img style="position:absolute;width:67px; height:13px; top: 14px; left:10px" src="/src/assets/yellow.png" alt="">
  </div>
  <p style="font-size: 25px; margin:3px">{{this.gameCode}}</p>
  <p style="margin: 3px;">Joueurs connectés:</p>
  <div class="players">
    <p v-for="player in players" class="player">{{ player.username }}</p>
  </div>
  <button @click="startGame" v-if="this.role === 'creator'" class="btn black">Commencer</button>
  <button disabled v-else class="btn loading">En attente de l'hôte<div class="spinner"></div></button>
</div>
<div v-if="currentIndex === 4" class="bottom-card">
  <p style="margin: 10px 0 0;font-size: 22px;font-style: normal;font-weight: 600;text-align:center">Choisissez une lettre <br ou >deviner le mot!</p>
  <div class="letters">
      <button @click="handleClick(letter)" class="letter" v-for="letter in this.game.letters" v-bind::key="letter" >{{ letter }}</button>
  </div>
  <button class="btn black">Deviner le mot?</button>
</div>
<div v-if="currentIndex === 5" class="bottom-card">
  <div v-if="currentIndex === 5" class="bottom-card">
    <p style="margin: 10px 0 0;font-size: 22px;font-style: normal;font-weight: 600;text-align:center">Attendez votre tour...</p>
    <p style="font-weight: 400;margin: 40px 30px;text-align: center;">C'est à <span class="current-player">{{ this.currentPlayer }}</span> de tenter sa chance...</p>
    <div class="spinner1"></div>
  </div>
</div>
<div v-if="this.game.currentState === 6" class="modal-lost">
  <div class="modal-content">
    <p>{{ gameMsg }}</p>
    <p>Le mot a trouvé était: {{this.game.wordToGuess}}</p>
    <p>Définition :</p>
    <p>{{ this.game.definition }}</p>
    <button @click="restartGame" v-if="this.role === 'creator'" class="btn black">Rejouer ?</button>
    <button v-else disabled class="btn loading">En attente de l'hôte<div class="spinner"></div></button>
  </div>
</div>

</template>
  
<script>
import { useSocketIO } from '../socket';
import { useGame } from '@/stores/game';
import { useToast } from "vue-toastification";

const { socket } = useSocketIO();

  export default {
    name: 'BottomCard',
    data() {
      return {
        username: '',
        code: '',
        codeIndex: 0,
        currentPlayer: '',
      }
    },
    computed: {
      gameMsg() {
        return this.game.win ? 'Vous avez gagné!' : 'Vous avez perdu...' 
      },
      currentIndex() {
        return this.game.currentIndex;
      },
      gameCode() {
        return this.game.gameCode.toString().split('').join(' ')
      },
      players() {
        return this.game.players;
      },
      role() {
        return this.game.user.role;
      }
    },
    methods: {
      restartGame() {
        socket.emit('game:restart', {code: this.game.gameCode})
      },
      handleClick(letter) {
        if(this.game.isMyTurn) {
          this.game.isMyTurn = false;
          socket.emit('game:letter', {letter, code: this.game.gameCode})
        }
      },
      startGame() {
         socket.emit('game:start', {code: this.game.gameCode});
      },
      handleChange(event) {
        this.code += event.target.value.toString()
        this.codeIndex++;
        if(this.codeIndex  < 5) {  
          const ref = this.$refs['input-' + this.codeIndex];
          ref.focus()
        }
        
      },
      changeIndex(index, option) {
        if(this.game.currentIndex === 1 && this.game.user.role === 'creator') {
          if(this.username.length < 3) {
            this.toast.error("Nom d'utilisateur trop court");
            return 
          }
          else if (this.username.length > 14) {
            this.toast.error("Nom d'utilisateur trop long");
          }
          this.createGame();
          this.game.changeIndex(index, option);
        }
        else if(this.game.currentIndex === 2 && this.game.user.role === 'player') {
          if(this.code.length < 5) {
            const lack = 5 - this.code.length;
            this.toast.error(`Il manque ${lack} chiffre${ lack > 1 ? "s" : ""}`);
          } else {
            this.game.gameCode = this.code;
            this.joinGame(index, option);
          }
        }
        else {
          this.game.changeIndex(index, option);
        }
      },
      createGame() {
        console.log('d');
        const data = {
            username: this.username,
        }
        socket.emit('game:create', data);
      },
      joinGame(index, code) {
        socket.emit('game:join', {gameCode: code, username: this.game.user.username});
      },
    },
    mounted() {
      socket.on('game:lost', data => {
        this.game.wordToGuess = data.word;
        this.game.definition = data.definition
      })

      socket.on('game:win', data => {
        this.game.win = true;
        this.game.wordToGuess = data.word;
        this.game.definition = data.definition;
        this.game.currentState = 6;
      })

      socket.on('game:turn', data => {
        if(data.username === this.game.user.username) {
          this.game.isMyTurn = true;
          this.game.currentIndex = 4;
          this.currentPlayer = data.username;
        } else {
          this.currentPlayer = data.username;
          this.game.currentIndex = 5;
        }
      })
      socket.on('game:start', data => {
        this.game.wordLength = data;
      })

      socket.on('game:restart', data => {
        this.game.restartGame(data);
      })

      socket.on('game:letterwin', data => {
        if(this.currentPlayer === this.username) {
          this.toast.success(`Vous avez trouvé la lettre ${data.letter}`);
        } else {
          this.toast.success(`${this.currentPlayer} a trouvé la lettre ${data.letter}`);
        }
        this.game.handleNewLetter(data.indexs, data.letter);

      })
      socket.on('game:letterlost', data => {
        if(this.currentPlayer === this.username) {
          this.toast.warning(`Vous vous êtes trompé avec la lettre ${data}`);
        } else {
          this.toast.warning(`${this.currentPlayer} s'est trompé avec la lettre ${data}`);
        }
        this.game.handleBadLetter(data);
        this.game.currentState++;
      })

      socket.on('game:init', (data) => {
        this.game.initGame(data.number, data.player)
      });

      socket.on('game:playerjoin', data => {
        this.game.players.push(data);
      });

      socket.on('game:joinsuccesful', data => {
        this.game.players = data.players;
        this.game.changeIndex(3, this.game.currentIndex);
      });

      socket.on('error', data => {
        if(data === "Ce code n'existe pas") {
          this.code = '';
          this.codeIndex = 0;

          for(let i= 0; i < 5; i++) {
            const ref = this.$refs['input-' + i];
            ref.value = ''
          }
          const ref1 = this.$refs['input-0'];
          ref1.focus()
        }

        this.toast.error(data);
      });
      
      socket.on('game:playerleft', data => {
        this.game.userLeft(data);
      })
    },
    beforeUnmount() {
      socket.disconnect();
    },
  
    setup() {
      return {
        game: useGame(),
        toast: useToast()
      };
  },

  }
</script>
<style>
.current-player {
  border-radius: 5px;
  background: #F2F2F2;
  padding: 2px 5px;
}

.input-code input{
  border: none;
  background-color: #eeeeee;
  font-size: 25px;
  margin: 5px;
  height: 35px;
  border-radius: 4px 4px 0 0;
  width: 27px;
  text-align: center;
}
.input-code {
  margin-top: 20px;
  margin-bottom: 40px;
}

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


.two-buttons {
  margin-top: 15px;
  display: inline-flex;
flex-direction: column;
align-items: flex-start;
gap: 15px;
}
.game {
  position: relative;
}
.letters {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin: 14px;
}
.letter {
  border: none;
  border-radius: 4px;
  background: #FFF;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.20);
  padding: 0 6px;
  text-align: center;
  font-family: 'Red Hat Display', sans-serif;
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
  margin: 5px;
  color: black;
  min-width: 28px;
}
</style>
  