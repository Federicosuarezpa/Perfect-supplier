import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { useState } from 'react';
import { AuthProvider } from './shared/context/authContext';
function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route exact path="/">
            <Home></Home>
          </Route>
          <Route exact path="/login">
            <Login></Login>
          </Route>
          <Route exact path="/register">
            <Register></Register>
          </Route>
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
