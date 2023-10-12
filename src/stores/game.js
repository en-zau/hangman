import { defineStore } from 'pinia';

export const useGame = defineStore('game', {
  state: () => ({
    currentIndex: 0,
    user: {
      username: null,
      socketId: null,
      role: null,
    },
    gameCode: '',
    players: [],
    letters: [
      'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
      'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
    ],
    currentState: 0,
    wordLength: 0,
    word: '',
    wordToGuess: '',
    definition: '',
    win: false,
    isMyTurn: false,

  }),
  actions: {
    restartGame(data) {
      this.letters = [
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
        'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
      ],
      this.wordLength = data;
      this.currentState = 0;
      this.word = '';
      this.definition = '';
      this.win = false;
      this.wordToGuess = '';
    },
    handleNewLetter(indexs, letter) {
      let wordTmp = '';

      for(let i = 0; i < this.wordLength; i++) {
        if(this.word.charAt(i) && this.word.charAt(i) !== ' ') {
          wordTmp += this.word.charAt(i);
        }
        else if(indexs.includes(i)) {
          wordTmp += letter
        }
        else {
          wordTmp += ' '
        }
      }
      this.word = wordTmp;

      const j = this.letters.findIndex(letter1 => letter1 === letter);

      if(j !== -1) {
        this.letters.splice(j, 1);
      }
    },
    handleBadLetter(letter) {
      const i = this.letters.findIndex(letter1 => letter1 === letter);

      if(i !== -1) {
        this.letters.splice(i, 1);
      }
    },
    changeIndex(target, option) {
      if(this.currentIndex === 0) {
        this.user.role = option;
        this.currentIndex = target;
      }
      else if(this.currentIndex === 1) {
        this.user.username = option;
        this.currentIndex = this.user.role === "player" ? 2 : 3
      }
      else {
        this.currentIndex = target;
      }
    },
    initGame(number, player) {
      this.gameCode = number;
      this.players.push({...player, isMe: true})
    },
    userLeft(id) {
      const index = this.players.findIndex(player => player.id === id);

      if(index !== -1) {
        this.players.splice(index, 1);
      }
    }

  }
})
