import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Recover from './pages/RecoverPass';
import Reset from './pages/ResetPass';
import Header from './components/commons/Header';
import Footer from './components/commons/Footer';
import Profile from './pages/Profile';
import AuthUser from './components/security/AuthUser';
import NewProduct from './components/components/AddProduct';
import { AuthProvider } from './shared/context/authContext';
import UserProfile from './components/security/UserProfile';
import AuthLogged from './components/security/AuthLogged';
import ProductPost from './pages/ProductsPost';
import ListProducts from './pages/ListProducts';
import ProductInfo from './pages/ProductInfo';
import Buys from './pages/Buys';
import EditProduct from './pages/EditProduct';
import Validate from './pages/Validateuser';
import NotFound from './pages/NotFound';
function App() {
  return (
    <Router>
      <AuthProvider>
        <Header></Header>
        <Switch>
          <Route exact path="/">
            <Home></Home>
            <Footer></Footer>
          </Route>
          <Route exact path="/login">
            <AuthLogged>
              <Login></Login>
              <Footer></Footer>
            </AuthLogged>
          </Route>
          <Route exact path="/register">
            <AuthLogged>
              <Register></Register>
              <Footer></Footer>
            </AuthLogged>
          </Route>
          <Route exact path="/recover">
            <AuthLogged>
              <Recover></Recover>
              <Footer></Footer>
            </AuthLogged>
          </Route>
          <Route exact path="/reset">
            <AuthLogged>
              <Reset></Reset>
              <Footer></Footer>
            </AuthLogged>
          </Route>
          <Route exact path="/profile/:id">
            <AuthUser>
              <UserProfile>
                <Profile></Profile>
                <Footer></Footer>
              </UserProfile>
            </AuthUser>
          </Route>
          <Route exact path="/profile/:id/newProduct">
            <AuthUser>
              <UserProfile>
                <NewProduct></NewProduct>
                <Footer></Footer>
              </UserProfile>
            </AuthUser>
          </Route>
          <Route exact path="/profile/:id/all">
            <AuthUser>
              <UserProfile>
                <ProductPost></ProductPost>
                <Footer></Footer>
              </UserProfile>
            </AuthUser>
          </Route>
          <Route exact path="/all">
            <ListProducts></ListProducts>
          </Route>
          <Route exact path="/all/:id">
            <ProductInfo></ProductInfo>
          </Route>
          <Route exact path="/profile/:id/buy">
            <AuthUser>
              <UserProfile>
                <Buys></Buys>
                <Footer></Footer>
              </UserProfile>
            </AuthUser>
          </Route>
          <Route exact path="/profile/:id/all/:product_id">
            <AuthUser>
              <UserProfile>
                <EditProduct></EditProduct>
                <Footer></Footer>
              </UserProfile>
            </AuthUser>
          </Route>
          <Route exact path="/user/validate/:id">
            <Validate></Validate>
          </Route>
          <Route component={NotFound}></Route>
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
