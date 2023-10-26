import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));

const onRedirectCallback = (appState) => {
  // Aquí puedes realizar acciones después de la redirección, como actualizar el estado de autenticación o redirigir a una página específica.
  console.log("Redirección completada");
  console.log(appState);
};
root.render(    
<Auth0Provider
    domain="dev-cqsr2j8hnf0nlf0n.us.auth0.com"
    clientId="psvZm9Zg56tguSMq7P65SNkjOgP7abwu"
    onRedirectCallback={onRedirectCallback}
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <App />
  </Auth0Provider>,
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
