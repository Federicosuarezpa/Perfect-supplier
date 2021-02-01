import logo from './ubs-logo-svg.svg';
import './App.css';

function App() {
  return (
    <body class="topnav" id="myTopnav">
      <header>
        <nav>
          <a class="links logo" href="#">
            F2F Business
          </a>
          <div class="rightSection">
            <a class="links links-hidden" href="h">
              Inicio
            </a>
            <a class="links links-hidden" href="#">
              Contacto
            </a>
            <a class="links links-hidden" href="#">
              Información
            </a>
            <a class="links links-hidden" href="#">
              Registro
            </a>
            <a class="links links-hidden" href="#">
              Iniciar sesión
            </a>
          </div>
          <a class="hamburger">☰</a>
        </nav>
      </header>
      <div class="dino">
        <div class="info">
          <h1>F2F Business</h1>
          <h2>El portal web donde puedes encontrar lo que necesitas</h2>
        </div>
      </div>
      <div class="formulario">
        <h1>Envíanos un mensaje</h1>
        <h2>Nombre</h2>
      </div>
    </body>
  );
}

export default App;
