<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref, onMounted } from 'vue'

const menuOpen = ref(false)

onMounted(() => {
  const updateActiveLink = () => {
    const hash = window.location.hash || '#inicio'
    document.querySelectorAll(".links a").forEach(link => {
      link.classList.remove("active")
      const href = link.getAttribute("href") || ""
      if (href.includes(hash)) {
        link.classList.add("active")
      }
    })
  }

  window.addEventListener("hashchange", updateActiveLink)
  updateActiveLink()
})
</script>

<template>
  <div id="app">
    <!-- Header -->
    <header class="header">
      <nav class="nav">
  <!-- Logo -->
  <RouterLink to="/" class="logo" @click="menuOpen = false">
    <img src="/images/barberia-bravos.jpg" alt="Logo Barbería" />
  </RouterLink>

  <!-- Texto centrado -->
  <h2 class="brand-text">Barbería Bravo's</h2>

        <!-- Botón hamburguesa -->
        <button class="menu-toggle" @click="menuOpen = !menuOpen">
          ☰
        </button>

        <!-- Menú de navegación -->
        <ul class="links" :class="{ active: menuOpen }">
          <li><a href="/#inicio" @click="menuOpen = false">Inicio</a></li>
          <li><a href="/#servicios" @click="menuOpen = false">Servicios</a></li>
          <li><a href="/#equipo" @click="menuOpen = false">Equipo</a></li>
          <li><a href="/#contacto" @click="menuOpen = false">Contacto</a></li>
        </ul>
      </nav>
    </header>

    <!-- Contenido dinámico -->
    <main>
      <RouterView />
    </main>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-container">
        <div class="footer-column">
          <h3>Contacto</h3>
          <p><strong>Barbería Bravo's</strong></p>
          <p>📍 Calle Principal #123</p>
          <p>📞 555-1234</p>
          <p>✉ contacto@barberiabravos.com</p>
        </div>

        <div class="footer-column">
          <h3>Horarios</h3>
          <p>Lunes - Sábado</p>
          <p>9:00 AM - 8:00 PM</p>
          <p>Domingo cerrado</p>
        </div>

        <div class="footer-column">
          <h3>Síguenos</h3>
          <!-- Botones de redes sociales con imágenes locales -->
          <div class="social-icons">
            <a href="#" target="_blank" rel="noopener noreferrer" class="social-btn" aria-label="Facebook">
              <img src="/images/facebook.svg" alt="Facebook" class="social-icon" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" class="social-btn" aria-label="Instagram">
              <img src="/images/instagram.svg" alt="Instagram" class="social-icon" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" class="social-btn" aria-label="TikTok">
              <img src="/images/tiktok.svg" alt="TikTok" class="social-icon" />
            </a>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; {{ new Date().getFullYear() }} Barbería Bravo's · Todos los derechos reservados.</p>
      </div>
    </footer>
  </div>
</template>

<style>
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
  background-color: #0b0b0b;
  color: #fff;
  font-family: sans-serif;
}

#app {
  width: 100%;
  max-width: none !important;
  margin: 0 !important;
  padding: 0 !important;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>

<style scoped>
/* Header */
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 110px;
  background: rgba(10, 10, 10, 0.9);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  z-index: 1000;
  box-sizing: border-box;
}

.nav {
  width: 100%;
  padding: 0 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  box-sizing: border-box;
}

/* Estado hover: sobresalir con resplandor dorado */
.logo img:hover {
  transform: scale(1.15);    /* agranda suavemente */
  box-shadow: 0 0 25px rgba(218, 165, 32, 0.8); /* halo dorado */
  filter: none !important;   /* elimina cualquier filtro heredado */
}


.logo img {
  height: 90px; /* logo más grande */
  width: auto;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.brand-text {
  flex: 1; /* ocupa el espacio entre logo y menú */
  text-align: center;
  font-family: 'Cinzel', serif;
  font-size: 2rem;
  font-weight: bold;
  color: goldenrod;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin: 0; /* elimina márgenes por defecto del h2 */
}


/* Links */
.links {
  display: flex;
  align-items: center;
  gap: 2.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.links a {
  text-decoration: none;
  color: #ddd;
  font-weight: 500;
  transition: all 0.3s ease;
}

.links a:hover,
.links a.active {
  color: #e8c878;
  background: none;
  text-shadow: 0px 2px 8px rgba(232, 200, 120, 0.7);
}

/* Botón hamburguesa */
.menu-toggle {
  display: none;
  font-size: 1.8rem;
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
}

@media (max-width: 768px) {
  .menu-toggle {
    display: block;
  }

  .nav {
    padding: 0 1.5rem;
  }

  .links {
    position: absolute;
    top: 110px;
    right: 0;
    background: rgba(10, 10, 10, 0.95);
    flex-direction: column;
    gap: 1rem;
    padding: 1.5rem;
    width: 220px;
    display: none;
  }

  .links.active {
    display: flex;
  }
}

/* Main */
main {
  flex: 1;
  padding-top: 110px;
  width: 100%;
  box-sizing: border-box;
}

/* Footer */
.footer {
  background: #0a0a0a;
  color: #ccc;
  padding: 4rem;
  width: 100%;
  box-sizing: border-box;
}

.footer-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  width: 100%;
}

.footer-column h3 {
  color: #e8c878;
  margin-bottom: 1rem;
}

.footer-column p {
  color: #aaa;
  margin: 0.3rem 0;
}

/* Estilos de los botones locales y control de color del icono SVG */
.social-icons {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.social-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border: 1.5px solid #e8c878;
  border-radius: 12px;
  background: #000;
  transition: all 0.3s ease;
}

.social-icon {
  width: 20px;
  height: 20px;
  filter: invert(1); /* Vuelve blancos los iconos oscuros por defecto */
  transition: filter 0.3s ease;
}

.social-btn:hover {
  background-color: #e8c878;
  transform: translateY(-3px);
  box-shadow: 0 6px 15px rgba(232, 200, 120, 0.35);
}

/* Al pasar el mouse, el icono dentro del botón dorado se vuelve negro para contraste */
.social-btn:hover .social-icon {
  filter: invert(0); 
}

.footer-bottom {
  text-align: center;
  margin-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding-top: 1rem;
  font-size: 0.9rem;
  color: #888;
}

@media (max-width: 768px) {
  .footer {
    padding: 3rem 1.5rem;
  }

  .footer-container {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .footer-column {
    margin-bottom: 2rem;
  }

  .social-icons {
    justify-content: center;
  }
}
</style>