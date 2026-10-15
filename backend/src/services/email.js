const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

function formatearHora(hora) {
  return String(hora).slice(0, 5);
}

function formatearPrecio(precio) {
  return '$' + Number(precio).toLocaleString('es-CO');
}

function formatearFecha(fecha) {
  const [anio, mes, dia] = String(fecha).split('-');
  return `${dia}/${mes}/${anio}`;
}

async function enviarConfirmacionCliente(cita, servicio, barbero) {
  if (!cita.cliente_email) return;

  await resend.emails.send({
    from: process.env.EMAIL_FROM,
    to: cita.cliente_email,
    subject: 'Tu cita en Barbería Bravo\'s está confirmada',
    html: `
      <!DOCTYPE html>
      <html lang="es">
        <head>
          <meta charset="UTF-8" />
          <title>Confirmación de cita</title>
        </head>
        <body style="font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
            <div style="background: #111111; color: #ffffff; padding: 24px; text-align: center;">
              <h1 style="margin: 0; font-size: 24px;">Barbería Bravo's</h1>
              <p style="margin: 8px 0 0; color: #d4a762;">Confirmación de cita</p>
            </div>

            <div style="padding: 24px;">
              <h2 style="margin-top: 0; color: #333;">Hola ${cita.cliente_nombre},</h2>
              <p style="color: #555; line-height: 1.6;">
                Tu cita ha sido agendada correctamente. Aquí están los detalles:
              </p>

              <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                <tr>
                  <td style="padding: 10px 0; color: #777; border-bottom: 1px solid #eee;">Servicio</td>
                  <td style="padding: 10px 0; font-weight: bold; text-align: right; border-bottom: 1px solid #eee;">${servicio.nombre}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #777; border-bottom: 1px solid #eee;">Precio</td>
                  <td style="padding: 10px 0; font-weight: bold; text-align: right; border-bottom: 1px solid #eee;">${formatearPrecio(servicio.precio)}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #777; border-bottom: 1px solid #eee;">Barbero</td>
                  <td style="padding: 10px 0; font-weight: bold; text-align: right; border-bottom: 1px solid #eee;">${barbero.nombre}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #777; border-bottom: 1px solid #eee;">Fecha</td>
                  <td style="padding: 10px 0; font-weight: bold; text-align: right; border-bottom: 1px solid #eee;">${formatearFecha(cita.fecha)}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #777;">Hora</td>
                  <td style="padding: 10px 0; font-weight: bold; text-align: right;">${formatearHora(cita.hora)}</td>
                </tr>
              </table>

              <p style="color: #555; line-height: 1.6;">
                Te esperamos en Barbería Bravo's. Te recomendamos llegar 5 minutos antes de tu cita.
              </p>

              <p style="color: #555; line-height: 1.6;">
                Si necesitas cancelar o reprogramar, contáctanos al <strong>555-1234</strong>.
              </p>

              <p style="color: #999; font-size: 14px; margin-bottom: 0;">
                Gracias por confiar en nosotros.
              </p>
            </div>
          </div>
        </body>
      </html>
    `
  });
}

async function enviarAvisoBarbero(cita, servicio, barbero) {
  if (!barbero.email) return;

  await resend.emails.send({
    from: process.env.EMAIL_FROM,
    to: barbero.email,
    subject: `Nueva cita: ${cita.cliente_nombre} - ${formatearFecha(cita.fecha)}`,
    html: `
      <!DOCTYPE html>
      <html lang="es">
        <head>
          <meta charset="UTF-8" />
          <title>Nueva cita agendada</title>
        </head>
        <body style="font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
            <div style="background: #111111; color: #ffffff; padding: 24px; text-align: center;">
              <h1 style="margin: 0; font-size: 24px;">Barbería Bravo's</h1>
              <p style="margin: 8px 0 0; color: #d4a762;">Nueva reserva</p>
            </div>

            <div style="padding: 24px;">
              <h2 style="margin-top: 0; color: #333;">Hola ${barbero.nombre},</h2>
              <p style="color: #555; line-height: 1.6;">
                Tienes una nueva cita agendada con los siguientes datos:
              </p>

              <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                <tr>
                  <td style="padding: 10px 0; color: #777; border-bottom: 1px solid #eee;">Cliente</td>
                  <td style="padding: 10px 0; font-weight: bold; text-align: right; border-bottom: 1px solid #eee;">${cita.cliente_nombre}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #777; border-bottom: 1px solid #eee;">Teléfono</td>
                  <td style="padding: 10px 0; font-weight: bold; text-align: right; border-bottom: 1px solid #eee;">${cita.cliente_telefono}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #777; border-bottom: 1px solid #eee;">Email</td>
                  <td style="padding: 10px 0; font-weight: bold; text-align: right; border-bottom: 1px solid #eee;">${cita.cliente_email}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #777; border-bottom: 1px solid #eee;">Servicio</td>
                  <td style="padding: 10px 0; font-weight: bold; text-align: right; border-bottom: 1px solid #eee;">${servicio.nombre}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #777; border-bottom: 1px solid #eee;">Precio</td>
                  <td style="padding: 10px 0; font-weight: bold; text-align: right; border-bottom: 1px solid #eee;">${formatearPrecio(servicio.precio)}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #777; border-bottom: 1px solid #eee;">Fecha</td>
                  <td style="padding: 10px 0; font-weight: bold; text-align: right; border-bottom: 1px solid #eee;">${formatearFecha(cita.fecha)}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #777;">Hora</td>
                  <td style="padding: 10px 0; font-weight: bold; text-align: right;">${formatearHora(cita.hora)}</td>
                </tr>
              </table>

              <p style="color: #555; line-height: 1.6; margin-bottom: 0;">
                Estado de la cita: <strong>${cita.estado || 'pendiente'}</strong>
              </p>
            </div>
          </div>
        </body>
      </html>
    `
  });
}

module.exports = {
  enviarConfirmacionCliente,
  enviarAvisoBarbero
};