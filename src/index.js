import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
// Local Imports
import './index.css';
import App from './App';
import { store } from './app/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);