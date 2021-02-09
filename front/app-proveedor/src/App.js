import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import logoTwitter from './twitter.svg';
import logoFacebook from './facebook.svg';
import logoInstagram from './instagram.svg';
import logoGithub from './github.svg';
import { login } from './http/api';
import Home from './pages/Home';
import Formulario from '.pages/Formulario';
/*import Home from './pages/Home';
import Title from './components/Title';
import Login from './pages/Login';
import register from './pages/Register';
import all from './pages/all';
import profile from './pages/profile';
import { AuthProvider } from './shared/context/authContext';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';*/

function App() {
  return (
    <Router>
      <switch>
        <Route path="/">
          <Home></Home>
        </Route>
        <Router>
      <switch>

      <Router>
      <switch>
        <Route path="/">
          <Formulario>
            <nav>
              <ul>
                <li> <Link to="/app-proveedor/src/components/registro.js"></Link></li>
              </ul>
            </nav>
          </Formulario>
        </Route>
        <Router>
      <switch>
      
     
  );
}

export default App;
