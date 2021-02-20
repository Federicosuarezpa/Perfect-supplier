import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Recover from './pages/RecoverPass';
import Reset from './pages/ResetPass';
import Header from './components/Header';
import Footer from './components/Footer';
import Profile from './pages/Profile';
import AuthUser from './components/AuthUser';
import NewProduct from './components/AddProduct';
import { AuthProvider } from './shared/context/authContext';
import UserProfile from './components/UserProfile';
import AuthLogged from './components/AuthLogged';
function App() {
  return (
    <Router>
      <AuthProvider>
        <Header></Header>
        <Switch>
          <Route exact path="/">
            <Home></Home>
          </Route>
          <Route exact path="/login">
            <AuthLogged>
              <Login></Login>
            </AuthLogged>
          </Route>
          <Route exact path="/register">
            <AuthLogged>
              <Register></Register>
            </AuthLogged>
          </Route>
          <Route exact path="/recover">
            <AuthLogged>
              <Recover></Recover>
            </AuthLogged>
          </Route>
          <Route exact path="/reset">
            <AuthLogged>
              <Reset></Reset>
            </AuthLogged>
          </Route>
          <Route exact path="/profile/:id">
            <AuthUser>
              <UserProfile>
                <Profile></Profile>
              </UserProfile>
            </AuthUser>
          </Route>
          <Route exact path="/profile/:id/newProduct">
            <AuthUser>
              <UserProfile>
                <NewProduct></NewProduct>
              </UserProfile>
            </AuthUser>
          </Route>
        </Switch>
        <Footer></Footer>
      </AuthProvider>
    </Router>
  );
}

export default App;
