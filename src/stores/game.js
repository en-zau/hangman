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
    players: []

  }),
  actions: {
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

      console.log('index :>> ', index);

      if(index !== -1) {
        this.players.splice(index, 1);
      }
    }

  }
})
