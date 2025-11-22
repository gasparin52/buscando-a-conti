<template>
  <router-view />
</template>

<script setup>
import { provideGameState } from './composables/useGameState.js';
provideGameState();
</script>
