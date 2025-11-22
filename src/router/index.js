import { createRouter, createWebHistory } from 'vue-router';
import StartView from '../views/StartView.vue';
import EasyLevelView from '../views/EasyLevelView.vue';
import MediumLevelView from '../views/MediumLevelView.vue';
import HardLevelView from '../views/HardLevelView.vue';
import GameOverView from '../views/GameOverView.vue';
import WinView from '../views/WinView.vue';
import TutorialView from '../views/TutorialView.vue';

const routes = [
  { path: '/', component: StartView },
  { path: '/tutorial', component: TutorialView },
  { path: '/facil', component: EasyLevelView },
  { path: '/intermedio', component: MediumLevelView },
  { path: '/dificil', component: HardLevelView },
  { path: '/gameover', component: GameOverView },
  { path: '/win', component: WinView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
