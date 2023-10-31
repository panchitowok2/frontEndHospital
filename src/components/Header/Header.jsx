// Header.js
import React from 'react';
import logoHospital from '../../logo.png'
import BotonLogIn from './BotonLogIn';
import BotonLogOut from '../Perfil/BotonLogOut.jsx'
import { useAuth0 } from '@auth0/auth0-react';
//import Menu from '../Menu/Menu.jsx'
//import BotonRol from '../BotonRol/BotonRol.jsx'
function Header() {
  const {
    isAuthenticated,
    loginWithRedirect,
    logout
  } = useAuth0();

  return (
    <nav class="navbar navbar-expand-md bg-primary shadow">
      <div class="container-fluid">
      <a class="navbar-brand" href="#"> <img src={logoHospital} width="100" class="d-inline-block"/>
        Hospital C. Villalba
      </a>
        {/*  boton hamburguesa */}
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse ms-5" id="navbarSupportedContent">
          <ul class="navbar-nav">
            {isAuthenticated ? (
              <React.Fragment>
                <li className="nav-item">
                  <a className="nav-link text-white" href="">Pacientes</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white" href="">Médicos</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white" href="">Historias Clínicas</a>
                </li>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <li className="nav-item">
                  <a className="nav-link text-white" href="">Inicio</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white" href="">Sobre Nosotros</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white" href="">Contacto</a>
                </li>
              </React.Fragment>
            )}
          </ul>

          <div className="d-none d-md-block ms-auto">
            {isAuthenticated ? (
              <BotonLogOut />  
            ) : (
              <BotonLogIn /> 
            )}
          </div>

          {/* menu para pantallas chicas */}
          <div class="d-md-none">
            <ul class="navbar-nav">
            {isAuthenticated ? (
              <li className="nav-item">
                <a className="nav-link text-white" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}> Cerrar sesión </a>
              </li>
            ) : (
              <li className="nav-item">
                <a className="nav-link text-white" onClick={() => loginWithRedirect()}>Iniciar sesión</a>
              </li>
            )}
            
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
