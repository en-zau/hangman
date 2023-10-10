import { defineStore } from 'pinia';

export const useGame = defineStore('game', {
  state: () => ({
    currentIndex: 0,
    user: {
      username: null,
      socketId: null,
      role: null,
    },
    gameCode: null

  }),
  actions: {
    changeIndex(target, option) {
      if(this.currentIndex === 0) {
        console.log('target :>> ', target);
        this.user.role = option;
        this.currentIndex = target;
      }
      else if(this.currentIndex === 1) {
        this.user.username = option;
        this.currentIndex = this.user.role === "player" ? 2 : 3
      }
    }

  }
})
