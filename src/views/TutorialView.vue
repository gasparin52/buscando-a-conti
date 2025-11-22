<template>
  <div class="tutorial-container">
    <h2>¿Cómo jugar?</h2>
    <p class="tutorial-title">Haz click en la cara para ganar. Si haces click fuera, pierdes.</p>
    <div class="tutorial-content">
      <div class="cara-cursor-wrapper">
        <img src="/src/assets/cara.png" alt="Cara objetivo" class="cara-img" />
        <img src="/src/assets/click.gif" alt="Tutorial click" class="tutorial-gif-cursor" />
      </div>
    </div>
    <button class="tutorial-btn" @click="goToEasy">¡Empezar el juego!</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
function goToEasy() {
  router.push('/facil');
}
</script>

<style scoped>
.tutorial-container {
  text-align: center;
  margin-top: 60px;
}
.tutorial-title {
  font-size: 1.2em;
  margin-bottom: 24px;
  color: #333;
}
.tutorial-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 32px;
}
.cara-cursor-wrapper {
  position: relative;
  display: inline-block;
  width: 220px;
  height: 220px;
  padding: 2rem 0;
}
.cara-img {
  width: 220px;
  height: 220px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
  animation: rotar-cara-tutorial 1.2s infinite;
}

@keyframes rotar-cara-tutorial {
  0% { transform: rotate(0deg) translateX(0); }
  20% { transform: rotate(-10deg) translateX(-10px); }
  50% { transform: rotate(10deg) translateX(10px); }
  80% { transform: rotate(-10deg) translateX(-10px); }
  100% { transform: rotate(0deg) translateX(0); }
}
.tutorial-gif-cursor {
  position: absolute;
  left: 120px;
  top: 140px;
  width: 100px;
  pointer-events: none;
  z-index: 2;
}

.tutorial-btn {
  margin-top: 32px;
  font-size: 1.1em;
  padding: 12px 36px;
  border-radius: 18px;
  border: none;
  background: #0077ff;
  color: #fff;
  cursor: pointer;
  box-shadow: 0 2px 8px #0002;
  transition: background 0.2s;
}
.tutorial-btn:hover {
  background: #0055bb;
}
</style>
