import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/material';
import { Auth0Provider } from '@auth0/auth0-react';
// Local Imports
import './index.css';
import App from './App';
import { store } from './app/store';
import { theme } from './constants';
import 'bootstrap/dist/css/bootstrap.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
    domain="chinacity.us.auth0.com"
    clientId="CFbAB9nsZsUsPjgcF4mSLNpmEqHicb0t"
    redirectUri={window.location.origin}
  >
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </Auth0Provider>
);
