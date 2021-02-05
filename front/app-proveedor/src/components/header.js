import { Link } from 'react-router-dom';
import useAuth from '../shared/hooks/useAuth';
import UserLogged from './logedUser';
import UserNotLogged from './notUserLogged';
import BotonRegistro from './registro';

export default function Header() {
  return (
    <nav>
      <Link to="/" className="links logo">
        F2F Business
      </Link>
      <div className="rightSection">
        <Link to="/" className="links">
          Inicio
        </Link>
        <Link to="/" className="links">
          Contacto
        </Link>
        <Link to="/all" className="links">
          Productos
        </Link>
        <UserLogged>
          <Link className="links">Perfil</Link>
          <Link className="links">Cerrar sesión</Link>
        </UserLogged>
        <UserNotLogged>
          <BotonRegistro></BotonRegistro>
          <Link className="links">Iniciar sesión</Link>
        </UserNotLogged>
      </div>
      <div class="dropdown alineado">
        <a class=" op">☰</a>
        <div class="dropdown-content">
          <Link to="/">Inicio</Link>
          <UserLogged>
            <Link to="/profile">Perfil</Link>
            <Link>Cerrar sesión</Link>
          </UserLogged>
          <UserNotLogged>
            <Link>Registrarse</Link>
            <Link>Iniciar sesión</Link>
          </UserNotLogged>
        </div>
      </div>
    </nav>
  );
}
