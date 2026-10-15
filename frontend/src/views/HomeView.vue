<script setup>
const servicios = [
  {
    titulo: 'Corte clásico',
    descripcion: 'Estilo tradicional o moderno, adaptado a tu rostro y personalidad.',
    precio: 'Desde $15.000',
    imagen: '/images/servicios/corte-clasico.jpg'  
  },
  {
    titulo: 'Corte + barba',
    descripcion: 'Look completo con perfilado de barba y acabado premium.',
    precio: 'Desde $25.000',
    imagen: '/images/servicios/corte-y-barba.jpg'
  },
  {
    titulo: 'Afeitado',
    descripcion: 'Afeitado clásico con toalla caliente y experiencia relajante.',
    precio: 'Desde $12.000',
    imagen: '/images/servicios/afeitada1.jpg'
  }
]

const equipo = [
  {
    nombre: 'Enrique',
    rol: 'Barbero senior',
    imagen: '/images/equipo/barbero-senior.jpg'
  },
  {
    nombre: 'Miguel',
    rol: 'Especialista en barba',
    imagen: '/images/equipo/miguel.jpg'
  },
  {
    nombre: 'Jake',
    rol: 'Estilista moderno',
    imagen: '/images/equipo/estilista-moderno.jpg'
  }
]
</script>

<template>
  <div class="home-container">
    <!-- Hero -->
    <section id="inicio" class="hero">
      <div class="hero-overlay"></div>
      <img
        class="hero-image"
        src="/images/barberia.jpg"
        alt="Interior de barbería"
      />

      <div class="hero-content">
        <span class="badge">Estilo · Confianza · Tradición</span>
        <h1>El corte perfecto te espera</h1>
        <p>
          Expertos en cortes modernos y clásicos, afeitado de barba y una
          experiencia pensada para que te veas y te sientas increíble.
        </p>

        <div class="hero-actions">
          <router-link to="/reservar" class="btn-principal">
            Reservar Ahora
          </router-link>      
        </div>

        <div class="hero-stats">
          <div class="stat">
            <strong>500+</strong>
            <span>Clientes felices</span>
          </div>
          <div class="stat">
            <strong>5★</strong>
            <span>Calificación</span>
          </div>
          <div class="stat">
            <strong>8+</strong>
            <span>Años de experiencia</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Servicios -->
    <section id="servicios" class="section">
      <h2 class="section-title">Nuestros servicios</h2>
      <p class="section-subtitle">
        Servicios premium diseñados para resaltar tu estilo con técnicas profesionales
        y atención personalizada.
      </p>

      <div class="servicios-grid">
        <article
          v-for="servicio in servicios"
          :key="servicio.titulo"
          class="servicio-card"
        >
          <div class="servicio-image-wrap">
            <img :src="servicio.imagen" :alt="servicio.titulo" class="card-img" />
          </div>
          <div class="servicio-body">
            <h3>{{ servicio.titulo }}</h3>
            <p>{{ servicio.descripcion }}</p>
            <span class="precio">{{ servicio.precio }}</span>
          </div>
        </article>
      </div>
    </section>

    <!-- Banner -->
    <section class="banner">
      <div class="banner-overlay"></div>
      <img 
        src="/images/banner.jpg" 
        alt="Barbero trabajando"
        class="banner-image"
      />
      <div class="banner-content">
        <h2>No es solo un corte, es una experiencia</h2>
        <p>Ambiente elegante, barberos expertos y resultados que hablan por sí solos.</p>
        <router-link to="/reservar" class="btn-principal">
          Agenda tu cita hoy
        </router-link>
      </div>
    </section>

    <!-- Equipo -->
    <section id="equipo" class="section">
      <h2 class="section-title">Nuestro equipo</h2>
      <p class="section-subtitle">
        Profesionales apasionados por el detalle, el estilo y la satisfacción de cada cliente.
      </p>

      <div class="equipo-grid">
        <article v-for="persona in equipo" :key="persona.nombre" class="equipo-card">
          <div class="equipo-image-wrap">
            <img :src="persona.imagen" :alt="persona.nombre" class="card-img" />
          </div>
          <div class="equipo-body">
            <h3>{{ persona.nombre }}</h3>
            <p>{{ persona.rol }}</p>
          </div>
        </article>
      </div>
    </section>

    <!-- Contacto -->
    <section id="contacto" class="section">
      <h2 class="section-title">Contáctanos</h2>
      <p class="section-subtitle">
        Reserva tu cita o visítanos en nuestro local. ¡Te esperamos para renovar tu estilo!
      </p>

      <div class="contacto-card">
        <div class="contacto-info">
          <h2>Visítanos</h2>
          <p><strong>Barbería Bravo's</strong></p>
          <p>📍 Calle Principal #123</p>
          <p>📞 555-1234</p>
          <p>🕘 Lun - Sáb, 9:00 AM - 8:00 PM</p>
        </div>

        <div class="contacto-cta">
          <div class="contacto-image-wrap">
            <img src="/images/contacto.jpg" alt="Barbería moderna" class="card-img" />
          </div>
          <router-link to="/reservar" class="btn-principal">
            Reservar cita
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
<style scoped>
/* menú fijo no tape los títulos al hacer clic */
#inicio,
#servicios,
#equipo,
#contacto {
  scroll-margin-top: 130px;
}

.home-container {
  width: 100%;
  display: flex;
  flex-direction: column;
}

/* --- HERO --- */
.hero {
  position: relative;
  width: 100%;
  min-height: 85vh;
  display: flex;
  align-items: center;
  overflow: hidden;

  /* Imagen como fondo */
  background-image: url("barberia.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover; /* llena todo el ancho y alto */
}

/* Overlay oscuro para contraste */
.hero::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.85) 0%,
    rgba(0, 0, 0, 0.6) 55%,
    rgba(0, 0, 0, 0.3) 100%
  );
  z-index: 1;
}

.hero-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center; /* Mantiene el centro de la foto de la barbería bien enfocado */
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.85) 0%,
    rgba(0, 0, 0, 0.6) 55%,
    rgba(0, 0, 0, 0.3) 100%
  );
}

/* Contenido encima */
.hero-content {
  position: relative;
  z-index: 2; /* asegura que esté sobre la imagen y el overlay */
  width: 100%;
  max-width: 800px;
  padding: 6rem 4rem;
  box-sizing: border-box;
  color: #fff; /* texto blanco para contraste */
}

.badge {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 999px;
  background: rgba(201, 162, 77, 0.15);
  color: #e8c878;
  border: 1px solid rgba(201, 162, 77, 0.35);
  margin-bottom: 1.2rem;
  font-size: 1.2rem;
}

.hero-content h1 {
  font-size: clamp(2.8rem, 5vw, 4.5rem);
  line-height: 1.05;
  margin-bottom: 1rem;
  color: #fff;
}

.hero-content p {
  color: #ddd;
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 2rem;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 3rem;
}

.btn-principal {
  display: inline-block;
  padding: 0.8rem 2rem;
  background-color: #e8c878;
  color: #000;
  text-decoration: none;
  font-weight: bold;
  border-radius: 8px;
  transition: background-color 0.3s;
  text-align: center;
}
.btn-principal:hover {
  background-color: #d4b360;
}

.hero-stats {
  display: flex;
  gap: 3rem;
  flex-wrap: wrap;
}

.stat {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.stat strong {
  font-size: 1.8rem;
  color: #e8c878;
}

.stat span {
  color: #bbb;
  font-size: 0.95rem;
}

/* Secciones generales */
.section {
  width: 100%;
  padding: 5rem 4rem;
  box-sizing: border-box;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  color: #e8c878;
  margin-bottom: 0.5rem;
}

.section-subtitle {
  text-align: center;
  margin-bottom: 3rem;
  color: #aaa;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

/* Grids servicios / equipo */
.servicios-grid,
.equipo-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  width: 100%;
}

.servicio-card,
.equipo-card {
  background: #181818;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0,0,0,0.3);
  display: flex;
  flex-direction: column;
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: contain; 
  object-position: center;
  display: block;
  background-color: #121212;
}

.servicio-image-wrap {
  width: 100%;
  height: 260px;
}

.servicio-body {
  padding: 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.servicio-body h3 {
  margin-bottom: 0.6rem;
  font-size: 1.5rem;
  color: #e8c878;
}

.servicio-body p {
  color: #aaa;
  line-height: 1.6;
  font-size: 0.95rem;
  margin-bottom: 1rem;
  flex-grow: 1;
}

.precio {
  display: inline-block;
  align-self: flex-start;
  padding: 0.45rem 1rem;
  border-radius: 999px;
  background: rgba(201, 162, 77, 0.15);
  color: #e8c878;
  font-weight: 700;
  font-size: 0.9rem;
}

/* --- BANNER AJUSTADO --- */
.banner {
  position: relative;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  width: 100%;
}

.banner-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.banner::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 1;
}

.banner-content {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 700px;
  text-align: center;
  padding: 4rem 2rem;
  box-sizing: border-box;
}

.banner-content h2 {
  font-size: clamp(2rem, 4vw, 3rem);
  margin-bottom: 1rem;
  color: #e8c878;
}

.banner-content p {
  color: #ddd;
  line-height: 1.7;
  margin-bottom: 1.5rem;
}

/* Equipo */
.equipo-card {
  text-align: center;
}

.equipo-image-wrap {
  width: 100%;
  height: 320px;
}

.equipo-body {
  padding: 1.5rem;
}

.equipo-body h3 {
  margin-bottom: 0.3rem;
  font-size: 1.4rem;
  color: #e8c878;
}

.equipo-body p {
  color: #aaa;
  font-size: 0.95rem;
}

/* Contacto */
.contacto {
  width: 100%;
  padding: 5rem 4rem;
  box-sizing: border-box;
}

.contacto-info {
  margin-left: 7rem; /* Ajusta este valor (ej. 5rem o 6rem) según qué tan a la derecha lo quieras */
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.contacto-card {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  padding: 3rem;
  background: #181818;
  border-radius: 20px;
  box-sizing: border-box;
  align-items: center;
}

.contacto-info h2 {
  font-size: 2.2rem;
  margin-bottom: 1rem;
  color: #e8c878;
}

.contacto-info p {
  color: #ccc;
  margin: 0.5rem 0;
  line-height: 1.7;
}

.contacto-cta {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.contacto-image-wrap {
  width: 100%;
  height: 240px;
  border-radius: 12px;
  overflow: hidden;
}

/* Responsivo */
@media (max-width: 1024px) {
  .servicios-grid,
  .equipo-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .hero-content, .section, .contacto {
    padding: 3rem 1.5rem;
  }

  .servicios-grid,
  .equipo-grid,
  .contacto-card {
    grid-template-columns: 1fr;
    padding: 1.5rem;
  }

  .equipo-image-wrap {
    height: 280px;
  }
}
</style>