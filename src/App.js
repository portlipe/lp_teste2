import React, { useState, useEffect, useRef } from 'react';
import logo from './media/logo.svg';
import terraplanagem from './media/terraplanagem.png';
import locacao from './media/locacao.png';
import pavment from './media/pavment.png';
import transport from './media/transport.png';
import whatsappIcon from './media/whatsapp-icon.svg';
import video_desktop from './media/video_desktop.mp4';
import './App.css';

function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const homeRef = useRef(null); // Ref para a seção "Home"
  const servicosRef = useRef(null);
  const sobreNosRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const aceitarCookies = () => {
    setShowPopup(false);
  };

  const scrollToSection = (sectionRef) => {
    if (sectionRef.current) {
      const targetPosition = sectionRef.current.getBoundingClientRect().top + window.scrollY;
      const startPosition = window.scrollY;
      const distance = targetPosition - startPosition;
      const duration = 1000;
      let startTime = null;

      const animation = (currentTime) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = easeInOutQuad(progress);
        window.scrollTo(0, startPosition + distance * ease);

        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        }
      };

      requestAnimationFrame(animation);
    }
  };

  const [menuOpen, setMenuOpen] = useState(false); 


  const easeInOutQuad = (t) => {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  };

  return (
    <div className="App">
      <section className="home" ref={homeRef}>
        <video autoPlay loop muted className="background-video">
          <source src={video_desktop} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <header className={isScrolled ? 'scrolled' : ''}>
          <div className="logo">
            <img src={logo} alt="logo" loading="lazy" width="336" height="48.64" />
          </div>
          {/* Burger Button */}
            <button
              className={`burger-button ${menuOpen ? 'open' : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span className="line"></span>
              <span className="line"></span>
              <span className="line"></span>
            </button>

            {/* Menu */}
            <nav className={`menu ${menuOpen ? 'open' : ''}`}>
              <button className="form-button" onClick={() => scrollToSection(homeRef)}>HOME</button>
              <button className="form-button" onClick={() => scrollToSection(servicosRef)}>SERVIÇOS</button>
              <button className="form-button" onClick={() => scrollToSection(sobreNosRef)}>SOBRE NÓS</button>
              <button className="form-button">DIFERENCIAIS</button>
              <button className="form-button">PROJETOS</button>
              <button className="form-button">INSTITUCIONAL</button>
              <button className="form-button">CLIENTES</button>
              <button className="form-button">CONTATO</button>
           </nav>
        </header>

        <p>
          Preparando <strong>o terreno</strong> para obras <br />
          de grande porte com quase <br />
          <strong>200 projetos entregues</strong>
        </p>
      </section>

      <section className="servicos" ref={servicosRef}>
        <h2>SERVIÇOS</h2>
        <div className="servicos-container">
          <div className="servico-item">
            <img src={terraplanagem} alt="Terraplenagem" />
            <p>Terraplenagem</p>
          </div>
          <div className="servico-item">
            <img src={locacao} alt="Locação de Equipamentos" />
            <p>Locação de Equipamentos</p>
          </div>
          <div className="servico-item">
            <img src={pavment} alt="Pavimentação" />
            <p>Pavimentação</p>
          </div>
          <div className="servico-item">
            <img src={transport} alt="Transporte" />
            <p>Transporte</p>
          </div>
        </div>
      </section>

      <section className="sobre" ref={sobreNosRef}>
        <div className="sobre-coluna">
          <p>
            <strong>Fundada em 2015,</strong> nossa empresa é especializada em <strong>serviços de terraplenagem</strong> para obras de grande porte.
          </p>
        </div>
        <div className="sobre-coluna">
          <p>
            Atuamos com escavação, nivelamento e compactação de solo, sempre utilizando equipamentos modernos e tecnologia de ponta. Nosso diferencial é o alto nível de qualidade no trabalho e a responsabilidade da equipe, que se dedica a garantir eficiência e precisão em cada projeto.
          </p>
          <p>
            Com um compromisso rigoroso com o cumprimento de prazos, atendemos grandes construtoras, assegurando resultados excepcionais em todas as etapas.
          </p>
        </div>
      </section>

      <a 
        href="https://wa.me/5511999999999" 
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-button"
      >
        <img src={whatsappIcon} alt="WhatsApp" />
      </a>

      {showPopup && (
        <div className="popup-cookies">
          <div className="popup-content">
            Utilizamos cookies para otimizar o site, personalizar conteúdo com base na sua interação, e ao usá-lo você
            aceita o uso de cookies e concorda com a política de privacidade ao enviar informações pessoais.
            <button className="box-button" onClick={aceitarCookies}>
              Ok, Entendi
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
