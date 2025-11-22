<template>
  <div class="container">
    <div class="start-content">
        <h2>Nivel Intermedio</h2>
        <div class="lives">Vidas: <span v-for="n in game.lives" :key="n">❤️</span></div>
        <FindTargetScene
        v-if="currentScene && !showModal"
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
        descripcion="Dificultad: Intermedio"
        animClass="anim-intermedio"
        @continuar="continuarNivel"
        />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useGameState } from '../composables/useGameState.js';
import FindTargetScene from '../components/FindTargetScene.vue';
import ModalContinuar from '../components/ModalContinuar.vue';
import { mediumScenes } from '../data/scenes.js';
import { useRouter } from 'vue-router';

const game = useGameState();
const router = useRouter();

const started = ref(false);
const sceneIndex = ref(0);
const showModal = ref(false);
const sceneTime = 5;

const currentScene = computed(() => mediumScenes[sceneIndex.value]);

function startLevel() {
  started.value = true;
  sceneIndex.value = 0;
}

function onSuccess() {
  if (sceneIndex.value < mediumScenes.length - 1) {
    sceneIndex.value++;
  } else {
    showModal.value = true;
  }
}

function continuarNivel() {
  showModal.value = false;
  router.push('/dificil');
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
