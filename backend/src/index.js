require('dotenv').config();
const express = require('express');
const cors = require('cors');

const serviciosRouter = require('./routes/servicios');
const barberosRouter = require('./routes/barberos');
const citasRouter = require('./routes/citas');

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ ok: true }));

app.use('/api/servicios', serviciosRouter);
app.use('/api/barberos', barberosRouter);
app.use('/api/citas', citasRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API en http://localhost:${PORT}`));