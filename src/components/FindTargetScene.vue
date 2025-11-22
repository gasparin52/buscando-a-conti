<template>
  <div class="scene-container">
    <img
      :src="scene.image"
      alt="Escena"
      class="scene-image"
      @click="handleClick"
      ref="imgRef"
    />
    <div
      v-if="showHotspot"
      class="hotspot"
      :style="hotspotStyle"
    ></div>
    <div v-if="found" class="highlight" :style="hotspotStyle"></div>
    <div class="timer">{{ timer }}s</div>
    <transition name="fade">
      <div v-if="message" class="message" :class="{ success: found }">
        {{ message }}
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';

const props = defineProps({
  scene: Object,
  timeLimit: { type: Number, default: 10 },
  showHotspot: { type: Boolean, default: true },
});

const emits = defineEmits(['success', 'fail', 'timeout']);

const timer = ref(props.timeLimit);
const found = ref(false);
const message = ref('');
const imgRef = ref(null);
let intervalId = null;

const hotspotStyle = computed(() => ({
  position: 'absolute',
  left: props.scene.target.left + '%',
  top: props.scene.target.top + '%',
  width: props.scene.target.width + '%',
  height: props.scene.target.height + '%',
  border: 'none',
  background: 'none',
  pointerEvents: 'none',
  zIndex: 2,
}));

function handleClick(e) {
  if (found.value) return;
  const img = imgRef.value;
  const rect = img.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width) * 100;
  const y = ((e.clientY - rect.top) / rect.height) * 100;

  if (
    x >= props.scene.target.left &&
    x <= props.scene.target.left + props.scene.target.width &&
    y >= props.scene.target.top &&
    y <= props.scene.target.top + props.scene.target.height
  ) {
    found.value = true;
    message.value = '¡Bien hecho!';
    emits('success');
  } else {
    message.value = 'Fallaste, te quedan vidas';
    emits('fail');
    setTimeout(() => { message.value = ''; }, 1200);
  }
}

onMounted(() => {
  intervalId = setInterval(() => {
    if (timer.value > 0 && !found.value) {
      timer.value--;
      if (timer.value === 0) {
        message.value = '¡Tiempo agotado!';
        emits('timeout');
      }
    }
  }, 1000);
});

onUnmounted(() => {
  clearInterval(intervalId);
});

watch(() => props.scene, () => {
  timer.value = props.timeLimit;
  found.value = false;
  message.value = '';
});
</script>

<style scoped>
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
  transition: opacity 0.3s;
}
.highlight {
  position: absolute;
  border: 3px solid gold;
  box-shadow: 0 0 20px 5px gold;
  pointer-events: none;
  z-index: 3;
  border-radius: 50%;
  animation: zoom-highlight 0.7s;
}
.timer {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 8px;
  right: 16px;
  background: #fff;
  width: 55px;
  height: 55px;
  border-radius: 50%;
  font-weight: bold;
  font-size: 1.1em;
  box-shadow: 0 2px 8px #0002;
  z-index: 10;
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
@keyframes zoom-highlight {
  0% { transform: scale(0.5); opacity: 0.2; }
  60% { transform: scale(1.2); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
}
@keyframes found-msg {
  0% { transform: translate(-50%, -30px) scale(0.7); opacity: 0; }
  60% { transform: translate(-50%, 10px) scale(1.1); opacity: 1; }
  100% { transform: translate(-50%, 0) scale(1); opacity: 1; }
}
.fade-enter-active, .fade-leave-active { transition: opacity 0.4s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
