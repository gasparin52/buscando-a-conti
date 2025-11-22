<template>
  <div class="start-container">
    <div class="start-content">
      <h1>Buscando a Conti</h1>
      <p>Encuentra al personaje oculto en cada nivel. ¡Tienes 3 vidas para lograrlo!</p>
      <img class="cara" src="../assets/cara.png" alt="cara de conti">
      <button @click="goToTutorial">Comenzar</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
function goToTutorial() {
  router.push('/tutorial');
}
</script>

<style scoped>
.start-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}


.start-content {
  background: #fff;
  padding: 48px 32px;
  border-radius: 24px;
  text-align: center;
  box-shadow: 0 2px 24px #0006;
}


h1 {
  margin-bottom: 18px;
  font-size: 2.2em;
  color: #0077ff;
}
p {
  margin-bottom: 28px;
  font-size: 1.2em;
  color: #333;
}
button {
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
button:hover {
  background: #0055bb;
}


.cara {
  width: 150px;
  border: 3px solid #ffffff;
  margin-bottom: 20px;
  animation: rotar-cara 1.2s linear infinite;
}

@keyframes rotar-cara {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

</style>
