import { Link } from 'react-router-dom';
import useAuth from '../shared/hooks/useAuth';
import UserLogged from './LogedUser';
import UserNotLogged from './NotUserLogged';

export default function Header() {
  const { signOut } = useAuth();
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
          <Link to="/Profile" className="links">
            Perfil
          </Link>
          <Link className="links" to="/" onClick={signOut}>
            Cerrar Sesión
          </Link>
        </UserLogged>
        <UserNotLogged>
          <Link to="/register" className="links">
            Registrarse
          </Link>
          <Link to="/login" className="links">
            Iniciar sesión
          </Link>
        </UserNotLogged>
      </div>
      <div className="dropdown alineado">
        <a className=" op">☰</a>
        <div className="dropdown-content">
          <Link to="/">Inicio</Link>
          <UserLogged>
            <Link to="/profile">Perfil</Link>
            <Link className="links" to="/" onClick={signOut}>
              Cerrar Sesión
            </Link>
          </UserLogged>
          <UserNotLogged>
            <Link to="/register">Registrarse</Link>
            <Link to="/login">Iniciar sesión</Link>
          </UserNotLogged>
        </div>
      </div>
    </nav>
  );
}
