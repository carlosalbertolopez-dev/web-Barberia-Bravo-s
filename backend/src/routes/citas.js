const express = require('express');
const supabase = require('../supabase');
const { enviarConfirmacionCliente, enviarAvisoBarbero } = require('../services/email');
const router = express.Router();

const HORA_APERTURA = 9;
const HORA_CIERRE = 20;

router.get('/disponibles', async (req, res) => {
  const { fecha, barbero_id } = req.query;

  if (!fecha || !barbero_id) {
    return res.status(400).json({ error: 'fecha y barbero_id son obligatorios' });
  }

  const { data: ocupadas, error } = await supabase
    .from('citas')
    .select('hora')
    .eq('fecha', fecha)
    .eq('barbero_id', barbero_id)
    .neq('estado', 'cancelada');

  if (error) return res.status(500).json({ error: error.message });

  const ocupadasSet = new Set(
    (ocupadas || []).map(c => String(c.hora).slice(0, 5))
  );

  const slots = [];
  for (let h = HORA_APERTURA; h < HORA_CIERRE; h++) {
    for (const m of [0, 30]) {
      const hora = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
      if (!ocupadasSet.has(hora)) slots.push(hora);
    }
  }

  res.json(slots);
});

router.post('/', async (req, res) => {
  const {
    cliente_nombre,
    cliente_telefono,
    cliente_email,
    servicio_id,
    barbero_id,
    fecha,
    hora
  } = req.body;

  if (!cliente_nombre || !cliente_telefono || !cliente_email || !servicio_id || !barbero_id || !fecha || !hora) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  const horaFinal = hora.length === 5 ? `${hora}:00` : hora;

  const { data: cita, error } = await supabase
    .from('citas')
    .insert({
      cliente_nombre,
      cliente_telefono,
      cliente_email,
      servicio_id,
      barbero_id,
      fecha,
      hora: horaFinal,
      estado: 'pendiente'
    })
    .select()
    .single();

  if (error) {
    if (error.code === '23505') {
      return res.status(409).json({ error: 'Ese horario ya está reservado' });
    }
    return res.status(500).json({ error: error.message });
  }

  const { data: servicio } = await supabase
    .from('servicios')
    .select('nombre, precio')
    .eq('id', servicio_id)
    .single();

  const { data: barbero } = await supabase
    .from('barberos')
    .select('nombre, email')
    .eq('id', barbero_id)
    .single();

  try {
    await Promise.all([
      enviarConfirmacionCliente(cita, servicio, barbero),
      enviarAvisoBarbero(cita, servicio, barbero)
    ]);
  } catch (emailError) {
    console.error('Cita creada, pero falló el email:', emailError);
  }

  res.status(201).json({
    ...cita,
    mensaje: 'Cita reservada. Revisa tu correo para la confirmación.'
  });
});

module.exports = router;