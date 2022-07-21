import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useSelector } from 'react-redux';
// Local Imports
import Menu from './pages/Menu';
import Header from './components/Header';
import Checkout from './pages/Checkout';
import Login from './components/Login';
import './App.css';
import Register from './components/Register';

function App() {
  // const { isAuthenticated, user, loginWithRedirect } = useAuth0();
  const { isAuthenticated, token, user } = useSelector((state) => state.user);
  const [goToLogin, setGoToLogin] = useState(false);
  const [goToRegister, setGoToRegister] = useState(false);

  return (
    <Router>
      <div className="App">
        <Header
          handleLogin={() => setGoToLogin(true)}
          handleRegister={() => setGoToRegister(true)}
          isAuthenticated={isAuthenticated}
          user={user}
        />
        <Routes>
          <Route path="/" element={<Menu user={user?.name} />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        {goToLogin && (
          <Login
            openLogin={goToLogin}
            handleClose={() => setGoToLogin(false)}
          />
        )}
        {goToRegister && (
          <Register
            openRegister={goToRegister}
            handleClose={() => setGoToRegister(false)}
          />
        )}
      </div>
    </Router>
  );
}

export default App;
