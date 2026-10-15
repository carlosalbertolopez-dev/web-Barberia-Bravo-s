import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ReservarView from '../views/ReservarView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/reservar',
      name: 'reservar',
      component: ReservarView
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    // 1. Si el usuario usa los botones de "atrás / adelante" del navegador
    if (savedPosition) {
      return savedPosition
    }
    
    // 2. Si la ruta incluye una ancla (ej: /#servicios o /#equipo)
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
        top: 130 // Ajusta este valor según la altura de tu menú fijo (110px o 130px)
      }
    }
    
    // 3. Por defecto, si va a otra página sin ancla, sube arriba
    return { top: 0 }
  }
})

export default router