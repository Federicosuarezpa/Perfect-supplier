import './App.css';
function App() {
  return (
    <div className="topnav" id="myTopnav">
      <header>
        <nav>
          <a className="links logo" href="#">
            F2F Business
          </a>
          <div className="rightSection">
            <a className="links" href="/">
              Inicio
            </a>
            <a className="links" href="#">
              Contacto
            </a>
            <a className="links" href="#">
              Productos
            </a>
            <a className="links" href="#">
              Perfil
            </a>
            <a className="links" href="#">
              Cerrar sesión
            </a>
          </div>
          <div class="dropdown alineado">
            <a class=" op">☰</a>
            <div class="dropdown-content">
              <a href="#">Perfil</a>
              <a href="#">Cerrar sesión</a>
              <a href="#">Productos</a>
            </div>
          </div>
        </nav>
      </header>
      <div className="back">
        <div className="info">
          <h1>F2F Business</h1>
          <h2>El portal web donde puedes encontrar lo que necesitas</h2>
        </div>
      </div>
      <div className="formulario">
        <div class="contact-form"></div>
        <h1>Envíanos un mensaje</h1>
        <h2>Nombre</h2>
      </div>
    </div>
  );
}

export default App;
