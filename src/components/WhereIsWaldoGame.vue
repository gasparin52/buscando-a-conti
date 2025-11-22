<template>
  <div class="waldo-game">
    <div class="scene-container">
      <img
        :src="currentScene.image"
        alt="Escena"
        class="scene-image"
        @click="handleSceneClick"
        ref="sceneImg"
      />
      <!-- Hotspot invisible (solo visible en desarrollo) -->
      <div
        v-if="showHotspot"
        class="hotspot"
        :style="hotspotStyle"
      ></div>
      <!-- Highlight animado al encontrar -->
      <div
        v-if="found"
        class="highlight"
        :style="highlightStyle"
      ></div>
      <!-- Mensaje flotante -->
      <transition name="fade">
        <div v-if="message" class="message" :class="{ success: found }">
          {{ message }}
        </div>
      </transition>
    </div>
    <button v-if="found && level < scenes.length - 1" @click="nextLevel" class="next-btn">
      Siguiente nivel
    </button>
    <button v-if="found && level === scenes.length - 1" @click="restartGame" class="next-btn">
      Reiniciar
    </button>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps({
  scenes: {
    type: Array,
    required: true,
  },
  showHotspot: {
    type: Boolean,
    default: true, // Mostrar hotspot durante desarrollo
  },
});

const level = ref(0);
const found = ref(false);
const message = ref('');
const sceneImg = ref(null);

const currentScene = computed(() => props.scenes[level.value]);
const hotspot = computed(() => currentScene.value.target);

const hotspotStyle = computed(() => ({
  position: 'absolute',
  left: hotspot.value.left + '%',
  top: hotspot.value.top + '%',
  width: hotspot.value.width + '%',
  height: hotspot.value.height + '%',
  background: 'rgba(0,255,0,0.2)',
  border: '2px dashed #0f0',
  pointerEvents: 'none',
  zIndex: 2,
}));

const highlightStyle = computed(() => ({
  position: 'absolute',
  left: hotspot.value.left + '%',
  top: hotspot.value.top + '%',
  width: hotspot.value.width + '%',
  height: hotspot.value.height + '%',
  borderRadius: '50%',
  border: '4px solid #ff0',
  boxShadow: '0 0 30px 10px #ff0',
  animation: 'zoom-highlight 0.7s',
  zIndex: 3,
  pointerEvents: 'none',
}));

function handleSceneClick(e) {
  if (found.value) return;
  const img = sceneImg.value;
  const rect = img.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width) * 100;
  const y = ((e.clientY - rect.top) / rect.height) * 100;

  // Verifica si el click está dentro del hotspot
  if (
    x >= hotspot.value.left &&
    x <= hotspot.value.left + hotspot.value.width &&
    y >= hotspot.value.top &&
    y <= hotspot.value.top + hotspot.value.height
  ) {
    found.value = true;
    message.value = '¡Lo encontraste!';
  } else {
    message.value = 'Seguí buscando…';
    setTimeout(() => {
      message.value = '';
    }, 1200);
  }
}

function nextLevel() {
  level.value++;
  found.value = false;
  message.value = '';
}

function restartGame() {
  level.value = 0;
  found.value = false;
  message.value = '';
}

// Limpia mensaje al cambiar de nivel
watch(level, () => {
  message.value = '';
});
</script>

<style scoped>
.waldo-game {
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
}
.scene-container {
  position: relative;
  display: inline-block;
}
.scene-image {
  max-width: 100%;
  display: block;
  border-radius: 12px;
  box-shadow: 0 2px 16px #0002;
}
.hotspot {
  /* Solo visible en desarrollo */
  transition: opacity 0.3s;
}
.highlight {
  pointer-events: none;
  transition: box-shadow 0.3s;
  border-radius: 50%;
  animation: zoom-highlight 0.7s;
}
@keyframes zoom-highlight {
  0% {
    transform: scale(0.5);
    opacity: 0.2;
  }
  60% {
    transform: scale(1.2);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
.message {
  position: absolute;
  left: 50%;
  top: 10%;
  transform: translate(-50%, 0);
  background: #fff;
  color: #333;
  padding: 12px 28px;
  border-radius: 24px;
  font-size: 1.3em;
  font-weight: bold;
  box-shadow: 0 2px 12px #0002;
  z-index: 10;
  pointer-events: none;
  opacity: 0.95;
  transition: background 0.3s;
}
.message.success {
  background: #ffe600;
  color: #222;
  animation: found-msg 0.7s;
}
@keyframes found-msg {
  0% {
    transform: translate(-50%, -30px) scale(0.7);
    opacity: 0;
  }
  60% {
    transform: translate(-50%, 10px) scale(1.1);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, 0) scale(1);
    opacity: 1;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.next-btn {
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
.next-btn:hover {
  background: #0055bb;
}
</style>
