import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Local Imports
import Home from './pages/Home';
import RQDishes from './pages/RQDishes';
import Header from './components/Header';
import Cart from './pages/Cart';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/rq-dishes" element={<RQDishes />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
