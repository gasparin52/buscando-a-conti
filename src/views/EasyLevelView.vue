<template>
  <div class="container">
      <div class="start-content">
      <h2>Nivel Fácil</h2>
      <div class="lives">Vidas: <span v-for="n in game.lives" :key="n">❤️</span></div>
      <!-- Imagen y botón de comenzar eliminados, el nivel inicia automáticamente -->
      <FindTargetScene
        v-if="started && currentScene && !showModal"
        :scene="currentScene"
        :timeLimit="sceneTime"
        :showHotspot="true"
        @success="onSuccess"
        @fail="onFail"
        @timeout="onTimeout"
      />
      <ModalContinuar
      v-if="showModal"
      mensaje="¡Nivel Completado!"
      descripcion="Dificultad: Fácil"
      animClass="anim-facil"
      @continuar="continuarNivel"
      />
      <div v-if="showOverlay" class="overlay">
        <div class="overlay-content">
          <h3>Nivel completado. Próxima dificultad: Intermedio</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useGameState } from '../composables/useGameState.js';
import FindTargetScene from '../components/FindTargetScene.vue';
import ModalContinuar from '../components/ModalContinuar.vue';
import { easyScenes } from '../data/scenes.js';
import { useRouter } from 'vue-router';

const game = useGameState();
const router = useRouter();


const started = ref(true);
const sceneIndex = ref(0);
const showModal = ref(false);
const sceneTime = 10; // Cambia aquí la duración del timer por escena

const currentScene = computed(() => easyScenes[sceneIndex.value]);

function onSuccess() {
  if (sceneIndex.value < easyScenes.length - 1) {
    sceneIndex.value++;
  } else {
    showModal.value = true;
  }
}

function continuarNivel() {
  showModal.value = false;
  router.push('/intermedio');
}

function onFail() {
  game.loseLife();
  if (game.lives <= 0) {
    router.push('/gameover');
  }
  // No avanzar de imagen, solo perder vida
}

function onTimeout() {
  router.push('/gameover');
}

function restartGame() {
  game.reset();
  router.push('/');
}
</script>

<style scoped>
.lives { font-size: 1.5em; margin-bottom: 12px; }
.overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.7);
  display: flex; align-items: center; justify-content: center;
  z-index: 100;
}
.overlay-content {
  background: #fff;
  padding: 32px 48px;
  border-radius: 24px;
  text-align: center;
  font-size: 1.5em;
}
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
