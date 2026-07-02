import { useEffect, useState } from "react";

const Carousel = () => {
  const images = [
    "/imagenes/imagen-carrusel1.jpg",
    "/imagenes/imagen-carrusel2.jpg",
    "/imagenes/imagen-carrusel3.jpg",
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [current]);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section className="carousel">
      <div className="carousel__images-wrapper">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Imagen ${index + 1}`}
            className={`carousel__image ${
              index === current ? "carousel__image--active" : ""
            }`}
          />
        ))}
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
        className="carousel__arrow carousel__arrow--left"
        onClick={prevSlide}
      >
        ❮
      </button>

      {/* Flecha derecha */}
      <button
        className="carousel__arrow carousel__arrow--right"
        onClick={nextSlide}
      >
        ❯
      </button>

      {/* Puntitos */}
      <div className="carousel__dots">
        {images.map((_, index) => (
          <button
            key={index}
            className={`carousel__dot ${
              index === current ? "carousel__dot--active" : ""
            }`}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default Carousel;