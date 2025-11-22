<template>
  <div class="modal-bg">
    <div class="modal-content">
      <h3>{{ mensaje }}</h3>
      <img src="/src/assets/cara.png" alt="Cara" class="modal-img" :class="animClass" />
      <p>{{ descripcion }}</p>
      <button @click="continuar">Continuar</button>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import confetti from 'canvas-confetti';

const props = defineProps({
  mensaje: { type: String, default: '¡Nivel Completado!' },
  descripcion: { type: String, default: '' },
  animClass: { type: String, default: '' }
});
const emits = defineEmits(['continuar']);
function continuar() {
  emits('continuar');
}

onMounted(() => {
  if (props.descripcion) {
    let confettiOptions = {
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      zIndex: 300
    };
    if (props.descripcion.includes('Fácil')) {
      confettiOptions.colors = ['#00ff99', '#ffe600', '#fff'];
    } else if (props.descripcion.includes('Intermedio')) {
      confettiOptions.colors = ['#0077ff', '#ff4444', '#ffe600'];
      confettiOptions.particleCount = 110;
      confettiOptions.spread = 90;
    } else if (props.descripcion.includes('Difícil')) {
      confettiOptions.colors = ['#ffe600', '#ff4444', '#0077ff', '#00ff99'];
      confettiOptions.particleCount = 120;
      confettiOptions.spread = 80;
    }
    setTimeout(() => {
      confetti(confettiOptions);
    }, 300);
  }
});
</script>

<style scoped>
.modal-bg {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
}
.modal-content {
  background: #fff;
  padding: 32px 48px;
  border-radius: 24px;
  text-align: center;
  font-size: 1.3em;
  box-shadow: 0 2px 24px #0006;
}
 .modal-img {
   width: 80px;
   height: 80px;
   object-fit: cover;
   border-radius: 50%;
   margin: 16px auto;
   display: block;
 }
/* Animaciones ejemplo */
.anim-facil {
  animation: bounce 1s;
}
.anim-intermedio {
  animation: rotate 1s linear;
}
.anim-dificil {
  animation: shake 0.7s;
}
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-30px); }
}
@keyframes rotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-10px); }
  40%, 80% { transform: translateX(10px); }
}
button {
  margin-top: 24px;
  padding: 10px 32px;
  font-size: 1.1em;
  border-radius: 20px;
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
</style>
