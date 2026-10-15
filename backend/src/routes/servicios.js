const express = require('express');
const supabase = require('../supabase');
const router = express.Router();

router.get('/', async (req, res) => {
  const { data, error } = await supabase
    .from('servicios')
    .select('*')
    .eq('activo', true)
    .order('nombre');

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

module.exports = router;