import { useCallback, useEffect, useState } from "react";

const IMAGES = [
  "/imagenes/imagen-carrusel1.jpg",
  "/imagenes/imagen-carrusel2.jpg",
  "/imagenes/imagen-carrusel3.jpg",
];

const Carousel = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % IMAGES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + IMAGES.length) % IMAGES.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
}, [nextSlide]);

return (
    <section className="carousel" aria-label="Carrusel principal">
      <div className="carousel__images-wrapper">
          {
            IMAGES.map((image, index) => (
              <img
                key={image}
                src={image}
                alt={`Imagen destacada ${index + 1}`}
                className={`carousel__image ${index === current ? "carousel__image--active" : ""
                  }`}
              />
            ))
          }
      </div>

      <div className="carousel__overlay">
        <span className="carousel__badge">
          ✨ Bienestar Natural
        </span>

        <h1 className="carousel__title">
          El poder de la naturaleza en tu hogar
        </h1>

        <p className="carousel__subtitle">
          Descubre aceites esenciales, difusores y productos naturales.
        </p>

        <a href="#productos" className="carousel__btn">
          Ver productos →
        </a>
      </div>

      {/* Flecha izquierda */}
      <button
        type="button"
        className="carousel__arrow carousel__arrow--left"
        onClick={prevSlide}
        aria-label="Imagen anterior"
      >
        ❮
      </button>

      {/* Flecha derecha */}
      <button
        type="button"
        className="carousel__arrow carousel__arrow--right"
        onClick={nextSlide}
        aria-label="Siguiente imagen"
      >
        ❯
      </button>

      {/* Puntitos */}
      <div className="carousel__dots">
          {
            IMAGES.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`carousel__dot ${index === current ? "carousel__dot--active" : ""
                  }`}
                onClick={() => setCurrent(index)}
                aria-label={`Ir a la imagen ${index + 1}`}
              />
            ))
          }
      </div>
    </section>
    );
};

    export default Carousel;
