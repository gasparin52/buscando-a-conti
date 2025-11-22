<template>
    
  <div class="container">
      <div class="center">
        <h2>Game Over</h2>
        <button class="restart-btn" @click="restartGame">Reiniciar</button>
      </div>
  </div>
</template>
<script setup>
import { useGameState } from '../composables/useGameState.js';
import { useRouter } from 'vue-router';
const game = useGameState();
const router = useRouter();
function restartGame() {
  game.reset();
  router.push('/');
}
</script>
<style scoped>
.center { text-align: center; margin-top: 80px; }
.restart-btn {
  margin-top: 24px;
  padding: 10px 32px;
  font-size: 1.1em;
  border-radius: 20px;
  border: none;
  background: #ff4444;
  color: #fff;
  cursor: pointer;
  box-shadow: 0 2px 8px #0002;
  transition: background 0.2s;
}
.restart-btn:hover {
  background: #bb2222;
}
</style>
