import { useState } from 'react'

const Contact = () => {
  const [submitted, setSubmitted] = useState<boolean>(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitted(true)
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
                <p className="contact-detail-value">hola@aromaterapianatural.com</p>
              </div>
            </div>
            <div className="contact-detail-item">
              <span className="contact-detail-icon" aria-hidden="true">📞</span>
              <div>
                <h4 className="contact-detail-label">Teléfono</h4>
                <p className="contact-detail-value">+54 11 1234-5678</p>
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
                />
              </div>

              <button type="submit" className="contact-submit-btn">
                Enviar mensaje
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

export default Contact
