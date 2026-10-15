<script setup>
import { ref, reactive, watch, onMounted } from 'vue'
import { getServicios, getBarberos, getHorariosDisponibles, crearCita } from '../services/api'

const servicios = ref([])
const barberos = ref([])
const horarios = ref([])
const cargando = ref(false)
const cargandoHorarios = ref(false)
const mensaje = ref('')
const error = ref('')

const form = reactive({
  cliente_nombre: '',
  cliente_telefono: '',
  cliente_email: '',
  servicio_id: '',
  barbero_id: '',
  fecha: '',
  hora: ''
})

const hoy = new Date().toISOString().split('T')[0]

function formatearPrecio(precio) {
  return '$' + Number(precio).toLocaleString('es-CO')
}

onMounted(async () => {
  try {
    const [resServicios, resBarberos] = await Promise.all([
      getServicios(),
      getBarberos()
    ])
    servicios.value = resServicios.data
    barberos.value = resBarberos.data
  } catch (e) {
    error.value = 'No se pudieron cargar servicios o barberos. ¿Está el backend encendido?'
  }
})

watch(
  () => [form.fecha, form.barbero_id],
  async ([fecha, barbero_id]) => {
    form.hora = ''
    horarios.value = []

    if (!fecha || !barbero_id) return

    cargandoHorarios.value = true
    error.value = ''

    try {
      const res = await getHorariosDisponibles(fecha, barbero_id)
      horarios.value = res.data

      if (res.data.length === 0) {
        error.value = 'No hay horarios disponibles para esa fecha'
      }
    } catch (e) {
      error.value = 'No se pudieron cargar los horarios disponibles'
    } finally {
      cargandoHorarios.value = false
    }
  }
)

async function reservar() {
  mensaje.value = ''
  error.value = ''
  cargando.value = true

  try {
    const res = await crearCita({
      cliente_nombre: form.cliente_nombre,
      cliente_telefono: form.cliente_telefono,
      cliente_email: form.cliente_email,
      servicio_id: Number(form.servicio_id),
      barbero_id: Number(form.barbero_id),
      fecha: form.fecha,
      hora: form.hora
    })

    mensaje.value = res.data.mensaje || 'Cita reservada correctamente. Revisa tu correo.'

    form.cliente_nombre = ''
    form.cliente_telefono = ''
    form.cliente_email = ''
    form.servicio_id = ''
    form.barbero_id = ''
    form.fecha = ''
    form.hora = ''
    horarios.value = []
  } catch (e) {
    error.value = e.response?.data?.error || 'No se pudo reservar la cita'
  } finally {
    cargando.value = false
  }
}
</script>

<template>
  <section class="reservar-page">
    <!-- IMAGEN DE FONDO QUE OCUPA TODA LA PÁGINA -->
    <img
  src="/images/reservar-page.jpg"
  alt="Reservar cita barbería"
  class="reservar-bg-image"
/>

    
    <!-- CAPA OSCURA PARA QUE RESALTE EL CONTENIDO -->
    <div class="reservar-overlay"></div>

    <!-- CONTENIDO GENERAL CENTRADO (Título + Formulario) -->
    <div class="reservar-content-wrapper">
      <div class="reservar-header-text">
        <h1>Reserva tu cita</h1>
        <p>Elige servicio, barbero y horario. Te confirmamos por correo.</p>
      </div>

      <div class="reservar-container">
        <form @submit.prevent="reservar" class="formulario">
          <div class="form-grid">
            <div class="campo">
              <label for="nombre">Nombre *</label>
              <input
                id="nombre"
                v-model="form.cliente_nombre"
                type="text"
                placeholder="Tu nombre"
                required
              />
            </div>

            <div class="campo">
              <label for="telefono">Teléfono *</label>
              <input
                id="telefono"
                v-model="form.cliente_telefono"
                type="tel"
                placeholder="Tu teléfono"
                required
              />
            </div>

            <div class="campo full">
              <label for="email">Correo electrónico *</label>
              <input
                id="email"
                v-model="form.cliente_email"
                type="email"
                placeholder="tu@email.com"
                required
              />
            </div>

            <div class="campo">
              <label for="servicio">Servicio *</label>
              <select id="servicio" v-model="form.servicio_id" required>
                <option value="">Selecciona un servicio</option>
                <option v-for="s in servicios" :key="s.id" :value="s.id">
                  {{ s.nombre }} - {{ formatearPrecio(s.precio) }}
                </option>
              </select>
            </div>

            <div class="campo">
              <label for="barbero">Barbero *</label>
              <select id="barbero" v-model="form.barbero_id" required>
                <option value="">Selecciona un barbero</option>
                <option v-for="b in barberos" :key="b.id" :value="b.id">
                  {{ b.nombre }}
                </option>
              </select>
            </div>

            <div class="campo">
              <label for="fecha">Fecha *</label>
              <input
                id="fecha"
                v-model="form.fecha"
                type="date"
                :min="hoy"
                required
              />
            </div>

            <div class="campo">
              <label for="hora">Hora *</label>
              <select
                id="hora"
                v-model="form.hora"
                required
                :disabled="!horarios.length || cargandoHorarios"
              >
                <option value="">
                  {{
                    cargandoHorarios
                      ? 'Cargando horarios...'
                      : horarios.length
                        ? 'Selecciona una hora'
                        : 'Elige barbero y fecha primero'
                  }}
                </option>
                <option v-for="h in horarios" :key="h" :value="h">
                  {{ h }}
                </option>
              </select>
            </div>
          </div>

          <button type="submit" class="btn-principal btn-enviar" :disabled="cargando">
            {{ cargando ? 'Reservando...' : 'Confirmar cita' }}
          </button>
        </form>

        <p v-if="mensaje" class="mensaje ok">{{ mensaje }}</p>
        <p v-if="error" class="mensaje error">{{ error }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.reservar-page {
  position: relative;
  width: 100%;
  min-height: calc(100vh - 110px);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: #0b0b0b;
  padding: 4rem 1.5rem;
  box-sizing: border-box;
}

/* IMAGEN DE FONDO OCUPANDO TODA LA PÁGINA */
.reservar-bg-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  z-index: 1;
}

/* CAPA DE OSCURECIMIENTO */
.reservar-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  z-index: 2;
}

/* CONTENEDOR GENERAL AL CENTRO */
.reservar-content-wrapper {
  position: relative;
  z-index: 3;
  width: 100%;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.reservar-header-text {
  text-align: center;
  margin-bottom: 2rem;
}

.reservar-header-text h1 {
  font-size: clamp(2.2rem, 4vw, 3.2rem);
  margin-bottom: 0.5rem;
  color: #e8c878;
}

.reservar-header-text p {
  color: #ddd;
  font-size: 1.05rem;
  line-height: 1.6;
}

/* FORMULARIO CENTRADO Y ELEGANTE */
.reservar-container {
  width: 100%;
}

.formulario {
  background: rgba(24, 24, 24, 0.92);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 2.5rem;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
  box-sizing: border-box;
  width: 100%;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.campo {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.campo.full {
  grid-column: 1 / -1;
}

.campo label {
  color: #ddd;
  font-weight: 600;
  font-size: 0.95rem;
}

.campo input,
.campo select {
  width: 100%;
  padding: 0.9rem 1rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: #101010;
  color: white;
  font-size: 1rem;
  box-sizing: border-box;
  transition: border-color 0.2s ease;
}

.campo input::placeholder {
  color: #777;
}

.campo input:focus,
.campo select:focus {
  outline: none;
  border-color: #c9a24d;
}

.campo select:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.campo select option {
  background: #101010;
  color: white;
}

.btn-enviar {
  width: 100%;
  margin-top: 2rem;
  padding: 1rem;
  font-size: 1rem;
  background-color: #e8c878;
  color: #000;
  font-weight: bold;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.3s;
  text-align: center;
}

.btn-enviar:hover {
  background-color: #d4b360;
}

.btn-enviar:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.mensaje {
  margin-top: 1.2rem;
  padding: 1rem;
  border-radius: 12px;
  text-align: center;
  font-weight: 500;
}

.mensaje.ok {
  background: rgba(40, 167, 69, 0.15);
  color: #8de99a;
  border: 1px solid rgba(40, 167, 69, 0.35);
}

.mensaje.error {
  background: rgba(220, 53, 69, 0.15);
  color: #ff98a4;
  border: 1px solid rgba(220, 53, 69, 0.35);
}

/* RESPONSIVO PARA MÓVILES */
@media (max-width: 768px) {
  .reservar-page {
    padding: 2rem 1rem;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .campo.full {
    grid-column: auto;
  }

  .formulario {
    padding: 1.5rem;
  }
}
</style>