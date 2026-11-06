import { useState } from 'react'
import { enviarMensajeContacto } from '../api/contacto'
import { formatApiError } from '../api/client'

const Contact = () => {
  const [nombre, setNombre] = useState<string>('')
  const [correo, setCorreo] = useState<string>('')
  const [mensaje, setMensaje] = useState<string>('')
  const [enviando, setEnviando] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState<boolean>(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setEnviando(true)

    try {
      await enviarMensajeContacto({
        nombre: nombre.trim(),
        correo: correo.trim(),
        mensaje: mensaje.trim(),
      })
      setSubmitted(true)
      setNombre('')
      setCorreo('')
      setMensaje('')
    } catch (err: unknown) {
      setError(formatApiError(err))
    } finally {
      setEnviando(false)
    }
  }

  return (
    <section id="contacto" className="contact-section" aria-label="Contacto">
      <div className="contact-container">
        {/* Información de contacto */}
        <div className="contact-info">
          <span className="section-tag">🌿 Escribinos</span>
          <h2 className="contact-info__title">Ponete en contacto</h2>
          <p className="contact-info__text">
            ¿Tenés alguna duda sobre nuestros aceites esenciales o difusores?
            Escribinos y te responderemos lo antes posible.
          </p>

          <div className="contact-details">
            <div className="contact-detail-item">
              <span className="contact-detail-icon" aria-hidden="true">📧</span>
              <div>
                <h4 className="contact-detail-label">Email</h4>
                <p className="contact-detail-value">aromaterapianatural@gmail.com</p>
              </div>
            </div>
            <div className="contact-detail-item">
              <span className="contact-detail-icon" aria-hidden="true">📞</span>
              <div>
                <h4 className="contact-detail-label">Teléfono</h4>
                <p className="contact-detail-value">+54 280 555-1234</p>
              </div>
            </div>
            <div className="contact-detail-item">
              <span className="contact-detail-icon" aria-hidden="true">🕒</span>
              <div>
                <h4 className="contact-detail-label">Horarios</h4>
                <p className="contact-detail-value">Lunes a Viernes: 9:00 - 18:00 hs</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tarjeta del Formulario */}
        <div className="contact-card">
          {submitted ? (
            <div className="contact-success" role="alert">
              <span className="contact-success__icon" aria-hidden="true">✨</span>
              <h3 className="contact-success__title">¡Mensaje enviado!</h3>
              <p className="contact-success__text">
                Gracias por comunicarte con nosotros. Nos pondremos en contacto a la brevedad.
              </p>
              <button
                type="button"
                className="contact-success__btn"
                onClick={() => setSubmitted(false)}
              >
                Enviar otro mensaje
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="contact-name" className="form-label">Nombre Completo</label>
                <input
                  type="text"
                  id="contact-name"
                  required
                  placeholder="Tu nombre y apellido"
                  className="form-input"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  disabled={enviando}
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-email" className="form-label">Correo Electrónico</label>
                <input
                  type="email"
                  id="contact-email"
                  required
                  placeholder="ejemplo@correo.com"
                  className="form-input"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  disabled={enviando}
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-message" className="form-label">Mensaje</label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  placeholder="Escribí tu consulta acá..."
                  className="form-textarea"
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
                  disabled={enviando}
                />
              </div>

              {error && (
                <p className="auth-error" role="alert" style={{ marginBottom: '1rem' }}>
                  {error}
                </p>
              )}

              <button type="submit" className="contact-submit-btn" disabled={enviando}>
                {enviando ? 'Enviando mensaje…' : 'Enviar mensaje'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

export default Contact
