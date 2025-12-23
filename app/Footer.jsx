"use client";

import { useEffect, useRef, useState } from 'react';
export default function Footer() {
  const footerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // solo una vez
        }
      },
      { threshold: 0.2 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <footer ref={footerRef} className="footer bg-footer text-white py-5">
      <div className="container">
        <div className="row row-cols-1 row-cols-md-5 g-4">


          <div className="col border-end border-white pe-md-4 mb-4">
            <img
              src="/img/Logo_DANYRIS-Blanco-Horizontal.png"
              alt="Danyris_SAC"
              className="mb-3"
              style={{ maxWidth: '240px' }}
            />

            <p className={`font-tittle fade-up ${isVisible ? 'visible' : ''}`}>
              En DANYRIS entendemos lo importante que es la entrega de un buen servicio
              hacia nuestros clientes, somos apasionados por la calidad y excelencia del
              servicio, estamos totalmente comprometidos con nuestros clientes.
            </p>

            <img
              src="/img/LOGO ASOCIADOS.jpg"
              alt="CCL"
              style={{ maxWidth: '150px' }}
            />

            <div className="d-flex gap-2 mt-3">
              <img src="/img/osce.webp" alt="OSCE" style={{ maxWidth: '150px' }} />
            </div>
          </div>

          {/* Columna 2 */}
          <div className="col">
            <h5 className={`mb-3 font-tittle fade-up ${isVisible ? 'visible' : ''}`}>ACERCA DE DANYRIS SAC</h5>
            <ul className="list-unstyled">
              <li className={`punto fade-up ${isVisible ? 'visible' : ''}`}><p className='politica'>Políticas ISO</p></li>
              <li className={`punto fade-up ${isVisible ? 'visible' : ''}`}><p className='politica'>Política antisoborno</p></li>
            </ul>
            <h6 className={`mt-4 font-tittle fade-up ${isVisible ? 'visible' : ''}`}>Libro de reclamaciones</h6>
            <a href="/libro_reclamaciones" className="text-decoration-none">
              <img src="/img/libro_reclamaciones.png" alt="Libro" style={{ maxWidth: "150px" }} />
            </a>
            <h6 className={`mt-4 font-tittle fade-up ${isVisible ? 'visible' : ''}`}>SÍGUENOS EN:</h6>
            <div className="d-flex gap-3">
              <a href="https://www.facebook.com/stdanyris" target="_blank"><i className="fab fa-facebook fa-lg"></i></a>
              <a href="https://www.instagram.com/stdanyris/" target="_blank"><i className="fab fa-instagram fa-lg"></i></a>
              <a href="https://www.linkedin.com/company/soluciones-tecnologicas-danyris/" target="_blank"><i className="fab fa-linkedin fa-lg"></i></a>
            </div>
          </div>

          {/* Columna 3 */}
          <div className="col">
            <h5 className={`mb-3 font-tittle fade-up ${isVisible ? 'visible' : ''}`}>Menú</h5>
            <ul className="list-unstyled">
              {["Inicio", "Nosotros", "Nuesras Soluciones", "Contactenos", "Novedades"].map((text, i) => (
                <li key={i} className={`punto fade-up ${isVisible ? 'visible' : ''}`}>
                  <a className="font-li" href={`/${text.toLowerCase() === 'inicio' ? '' : text.toLowerCase()}`}>{text}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="col">
            <h5 className={`mb-3 font-tittle fade-up ${isVisible ? 'visible' : ''}`}>Marcas</h5>
            <ul className="list-unstyled">
              {["Lenovo", "HP", "ASUS", "Epson", "Ubiquiti", "Logitech", "Microsoft"].map((brand, i) => (
                <li key={i} className={`punto fade-up ${isVisible ? 'visible' : ''}`}>
                  <span className="font-li">{brand}</span>
                </li>
              ))}
            </ul>
          </div>


          {/* Columna 4: Información de contacto */}
          <div className="col">
            <h5 className={`mb-3 font-tittle fade-up ${isVisible ? 'visible' : ''}`}>Contacto</h5>

            <div className={`info-item d-flex mb-2 fade-up ${isVisible ? 'visible' : ''}`}>
              <i className="bi bi-telephone me-2 text-white"></i>
              <div>
                <span className="text-gray-300">Teléfonos</span><br />
                <strong className="text-white">(+51) 913 589 865 / 01 741-0619</strong>
              </div>
            </div>

            <div className={`info-item d-flex mb-2 fade-up ${isVisible ? 'visible' : ''}`}>
              <i className="bi bi-whatsapp me-2 text-white"></i>
              <div>
                <span className="text-gray-300">WhatsApp</span><br />
                <strong className="text-white">913 589 865</strong>
              </div>
            </div>

            <div className={`info-item d-flex mb-2 fade-up ${isVisible ? 'visible' : ''}`}>
              <i className="bi bi-envelope me-2 text-white"></i>
              <div>
                <span className="text-gray-300">Email</span><br />
                <strong className="text-white">informes@danyris.com</strong>
              </div>
            </div>

          </div>



        </div>
      </div>

    </footer>
  );
}
