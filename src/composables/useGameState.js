import { reactive, provide, inject } from 'vue';

const key = Symbol('gameState');

export function provideGameState() {
  const state = reactive({
    lives: 3,
    reset() {
      state.lives = 3;
    },
    loseLife() {
      if (state.lives > 0) state.lives--;
    }
  });
  provide(key, state);
  return state;
}

export function useGameState() {
  return inject(key);
}
