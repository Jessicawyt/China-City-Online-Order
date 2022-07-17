import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
// Local Imports
import Menu from './pages/Menu';
import Header from './components/Header';
import Cart from './pages/Cart';
import Login from './components/Login';
import './App.css';
import Register from './components/Register';

function App() {
  // TODO: useAuth0 and update state in Redux store
  //       update isAuthenticated for <Login />
  const { isAuthenticated, user } = useAuth0();
  const [goToLogin, setGoToLogin] = useState(false);
  const [goToRegister, setGoToRegister] = useState(false);

  return (
    <Router>
      <div className="App">
        <Header
          handleLogin={() => setGoToLogin(true)}
          handleRegister={() => setGoToRegister(true)}
        />
        <Routes>
          <Route path="/" element={<Menu user={user?.name} />} />
          {/* <Route path="/cart" element={<Cart />} /> */}
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
