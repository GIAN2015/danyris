'use client';
import 'bootstrap/dist/css/bootstrap.min.css';
export const dynamic = 'force-dynamic';
import dynamicImport from 'next/dynamic';

import emailjs from '@emailjs/browser';
import { useEffect, useRef, useState } from 'react';
import BootstrapClient from './BootstrapClient';

function Counter({ end, label }) {
  const [count, setCount] = useState(0);
  const ref = useRef();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.6 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible && count < end) {
      const interval = setInterval(() => {
        setCount((prev) => {
          if (prev >= end) {
            clearInterval(interval);
            return end;
          }
          return prev + 1;
        });
      }, 30);
      return () => clearInterval(interval);
    }
  }, [isVisible, count, end]);

  return (
    <div className="col" ref={ref}>
      <h2>{count}+</h2>
      <p>{label}</p>
    </div>
  );
}

const ReCAPTCHA = dynamicImport(() => import('react-google-recaptcha'), { ssr: false });
const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '';

const BRANDS = [
  { name: 'ACER', src: '/img/logos/logo-ACER.png' },
  { name: 'Adobe', src: '/img/logos/logo-adobe.png' },
  { name: 'AMD', src: '/img/logos/logo-AMD.png' },
  { name: 'ANTRYX', src: '/img/logos/logo-ANTRYX.png' },
  { name: 'APC', src: '/img/logos/logo-APC.png' },
  { name: 'Apple', src: '/img/logos/logo-APPLE.png' },
  { name: 'AWS', src: '/img/logos/logo-AWS.png' },
  { name: 'BenQ', src: '/img/logos/logo-BenQ.png' },
  { name: 'Brother', src: '/img/logos/logo-Brother.png' },
  { name: 'CDP', src: '/img/logos/logo-CDP.png' },
  { name: 'Cisco', src: '/img/logos/logo-cisco.png' },
  { name: 'Cooler Master', src: '/img/logos/logo-COOLER-MASTER.png' },
  { name: 'Corsair', src: '/img/logos/logo-CORSAIR.png' },
  { name: 'D-Link', src: '/img/logos/logo-D-LINK.png' },
  { name: 'Dell', src: '/img/logos/logo-dell.png' },
  { name: 'Epson', src: '/img/logos/Logo-Epson.png' },
  { name: 'Genius', src: '/img/logos/logo-GENIUS.png' },
  { name: 'Gigabyte', src: '/img/logos/logo-GIGABYTE.png' },
  { name: 'Hikvision', src: '/img/logos/logo-HIKVISION.png' },
  { name: 'HP', src: '/img/logos/logo-hp.png' },
  { name: 'Huawei', src: '/img/logos/logo-Huawei.png' },
  { name: 'Intel', src: '/img/logos/logo-INTEL.png' },
  { name: 'Kaspersky', src: '/img/logos/logo-kaspersky.png' },
  { name: 'Kingston', src: '/img/logos/logo-KINGSTON.png' },
  { name: 'KlipXtreme', src: '/img/logos/logo-KlipXtreme.png' },
  { name: 'Lenovo', src: '/img/logos/Logo-Lenovo.png' },
  { name: 'LG', src: '/img/logos/logo-LG.png' },
  { name: 'Logitech', src: '/img/logos/logo-Logitech.png' },
  { name: 'Microsoft', src: '/img/logos/logo-MICROSOFT.png' },
  { name: 'Motorola', src: '/img/logos/logo-MOTOROLA.png' },
  { name: 'MSI', src: '/img/logos/logo-MSI.png' },
  { name: 'Patriot', src: '/img/logos/logo-Patriot.png' },
  { name: 'PNY', src: '/img/logos/logo-PNY.png' },
  { name: 'Razer', src: '/img/logos/logo-RAZER.png' },
  { name: 'Red Hat', src: '/img/logos/logo-REDHAT.png' },
  { name: 'Redragon', src: '/img/logos/Logo-Redragon.png' },
  { name: 'Seagate', src: '/img/logos/logo-Seagate.png' },
  { name: 'TeamGroup', src: '/img/logos/logo-TeamGroup.png' },
  { name: 'TEROS', src: '/img/logos/logo-TEROS.png' },
  { name: 'Thermaltake', src: '/img/logos/logo-THERMALTAKE.png' },
  { name: 'Toshiba', src: '/img/logos/logo-TOSHIBA.png' },
  { name: 'TP-Link', src: '/img/logos/logo-tp-link.png' },
  { name: 'TRENDnet', src: '/img/logos/logo-TRENDNET.png' },
  { name: 'Ubiquiti', src: '/img/logos/logo-ubiquiti.png' },
  { name: 'UGREEN', src: '/img/logos/logo-UGREEN.png' },
  { name: 'Western Digital', src: '/img/logos/logo-WesternDigital.png' },
  { name: 'XTECH', src: '/img/logos/logo-XTECH.png' },
];

export default function Home() {
  const form = useRef(null);

  const [captchaToken, setCaptchaToken] = useState(null);
  const [servicio, setServicio] = useState('Elige un servicio');
  const [mensaje, setMensaje] = useState('');
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState('');
  const recaptchaRef = useRef(null);

  const sendEmail = async (e) => {
    e.preventDefault();

    if (!captchaToken) {
      alert('Por favor completa el reCAPTCHA.');
      return;
    }

    try {
      const result = await emailjs.sendForm(
        'service_f8xf7xk',
        'template_jviil2p',
        form.current,
        'XyvI8lbXzQRrGzJWs'
      );

      console.log('Éxito:', result.text);
      setEnviado(true);
      setMensaje('✅ Mensaje enviado con éxito.');
      setError('');
      setCaptchaToken(null);
      form.current.reset();

      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
      }
    } catch (error) {
      console.error('Error en envío:', error);
      setError('Error al enviar. Intenta nuevamente.');
      setEnviado(false);
      setMensaje('❌ Error al enviar. Intenta nuevamente.');
    }
  };

  const handleServicioChange = (e) => {
    setServicio(e.target.innerText);
  };

  if (!siteKey) return <p>Error: Falta la clave del reCAPTCHA</p>;

  return (
    <>
      <BootstrapClient />

      <div className="background">
        <div className="overlay"></div>
        <div className="first-section">
          <h1 className="primary-tittle">Somos la empresa Soluciones Tecnológicas Danyris</h1>
        </div>

        <div className="second-section">
          <a href="/nosotros" className="text-decoration-none">
            <button className="btn btn-primary">
              <span className="font-button">
                Ver más <i className="fas fa-arrow-right"></i>
              </span>
            </button>
          </a>
        </div>
      </div>

      <div className="container text-center">
        <div className="row">
          <Counter end={80} label="Soluciones" />
          <Counter end={98} label="Proyectos" />
          <Counter end={90} label="Clientes satisfechos" />
        </div>
      </div>

      <div className="container text-center my-5 px-3">
        <h1 className="section-title mb-4 text-2xl md:text-3xl font-bold">LO QUE OFRECEMOS</h1>

        <div className="row g-4">
          {[
            {
              img: './img/services01.webp',
              title: 'Outsourcing TI',
              desc: 'Nos encargamos de brindar Outsourcing a todo nivel...',
            },
            {
              img: './img/services02-1.webp',
              title: 'Soporte Técnico',
              desc: 'Mantenimiento correctivo y preventivo...',
            },
            {
              img: './img/services03.webp',
              title: 'Licenciamiento de Software',
              desc: 'Tenemos las mejores soluciones de antivirus...',
            },
            {
              img: './img/services05.webp',
              title: 'Desarrollo de páginas web',
              desc: 'Desarrollamos tu Página web para presentar tus productos...',
            },
          ].map((s, i) => (
            <div key={i} className="col-12 col-md-6 col-lg-3">
              <div className="flip-card mx-auto">
                <div className="flip-card-inner">
                  <div className="flip-card-front bg-white rounded shadow overflow-hidden h-100">
                    <img
                      src={s.img}
                      alt={s.title}
                      className="w-100"
                      style={{ height: '180px', objectFit: 'cover' }}
                    />
                    <div className="p-3 text-start">
                      <h5 className="fw-bold">{s.title}</h5>
                      <p className="text-muted small">{s.desc}</p>
                    </div>
                  </div>

                  <div className="flip-card-back cardback text-white rounded shadow d-flex flex-column align-items-center justify-content-center p-4 h-100">
                    <h5 className="mb-3">{s.title}</h5>
                    <a href="/servicios" className="btn btn-light textcard fw-bold">
                      Saber más
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ MARCAS EN GRID (SIN CARRUSEL) */}
      <h1 className="tittle-marcas">Trabajamos con las mejores marcas</h1>
      <div className="container my-4">
        <div className="brand-grid">
          {BRANDS.map((b) => (
            <div className="brand-card" key={b.name} title={b.name} aria-label={b.name}>
              <img src={b.src} alt={b.name} loading="lazy" />
              <span className="brand-tooltip">{b.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="container px-4 text-center contactenos-container2">
        <div className="row gx-5">
          <div className="col contactenos-container">
            <div className="p-3">
              <h1 className="tittle-contactenos">Destaca tu proyecto con nosotros</h1>
              <form ref={form} onSubmit={sendEmail} className="form-contactenos">
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="bi bi-person-fill"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    name="nombre"
                    placeholder="Nombre de Contacto"
                    required
                  />
                </div>

                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="bi bi-building"></i>
                  </span>
                  <input type="text" className="form-control" name="empresa" placeholder="Empresa" required />
                </div>

                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="bi bi-envelope-fill"></i>
                  </span>
                  <input type="email" className="form-control" name="correo" placeholder="Correo" required />
                </div>

                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="bi bi-phone-fill"></i>
                  </span>
                  <input type="text" className="form-control" name="celular" placeholder="Celular" required />
                </div>

                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="bi bi-chat-left-dots-fill"></i>
                  </span>
                  <input type="text" className="form-control" name="mensaje" placeholder="Mensaje" required />
                </div>

                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Elige un servicio"
                    name="servicio"
                    value={servicio}
                    readOnly
                  />
                  <button
                    className="btn btn-outline-secondary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Servicios
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <button type="button" className="dropdown-item" onClick={handleServicioChange}>
                        Cloud Computing
                      </button>
                    </li>
                    <li>
                      <button type="button" className="dropdown-item" onClick={handleServicioChange}>
                        Help Desk
                      </button>
                    </li>
                    <li>
                      <button type="button" className="dropdown-item" onClick={handleServicioChange}>
                        Consultoría
                      </button>
                    </li>
                    <li>
                      <button type="button" className="dropdown-item" onClick={handleServicioChange}>
                        Desarrollo de páginas web
                      </button>
                    </li>
                    <li>
                      <button type="button" className="dropdown-item" onClick={handleServicioChange}>
                        Networking y Cableado Estructurado
                      </button>
                    </li>
                    <li>
                      <button type="button" className="dropdown-item" onClick={handleServicioChange}>
                        Equipamiento
                      </button>
                    </li>
                    <li>
                      <button type="button" className="dropdown-item" onClick={handleServicioChange}>
                        Licenciamiento y Servicios
                      </button>
                    </li>
                    <li>
                      <button type="button" className="dropdown-item" onClick={handleServicioChange}>
                        Otro
                      </button>
                    </li>
                  </ul>
                </div>

                <div className="mb-3">
                  <ReCAPTCHA
                    sitekey={siteKey}
                    onChange={(token) => setCaptchaToken(token)}
                    onExpired={() => setCaptchaToken(null)}
                    hl="es"
                  />
                </div>

                <button type="submit" className="button-line">
                  Enviar
                </button>

                {mensaje && (
                  <p style={{ marginTop: '10px', color: mensaje.includes('✅') ? 'green' : 'red' }}>
                    {mensaje}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ CSS (pegado aquí para que funcione al toque) */}
      <style jsx global>{`
        .brand-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 16px;
          align-items: stretch;
        }

        .brand-card {
          position: relative;
          background: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 14px;
          padding: 14px 16px;
          height: 110px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          transition: transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease, filter 220ms ease;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
          filter: grayscale(1) opacity(0.9);
          cursor: default;
        }

        .brand-card img {
          max-width: 100%;
          max-height: 70px;
          object-fit: contain;
          transform: translateZ(0);
          transition: transform 220ms ease;
          user-select: none;
          pointer-events: none;
        }

        .brand-card:hover {
          transform: translateY(-6px) scale(1.02);
          border-color: rgba(0, 0, 0, 0.14);
          box-shadow: 0 16px 34px rgba(0, 0, 0, 0.14);
          filter: grayscale(0) opacity(1);
        }

        .brand-card:hover img {
          transform: scale(1.04);
        }

        .brand-tooltip {
          position: absolute;
          bottom: 10px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 12px;
          padding: 6px 10px;
          border-radius: 999px;
          background: rgba(0, 0, 0, 0.72);
          color: white;
          opacity: 0;
          transition: opacity 160ms ease, transform 160ms ease;
          pointer-events: none;
          white-space: nowrap;
        }

        .brand-card:hover .brand-tooltip {
          opacity: 1;
          transform: translateX(-50%) translateY(-2px);
        }
      `}</style>
    </>
  );
}
