// Header.js
import React from 'react';
import logoHospital from '../../logo.png'
import BotonLogIn from './BotonLogIn';
import BotonLogOut from '../Perfil/BotonLogOut.jsx'
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
function Header() {
  const {
    isAuthenticated,
    loginWithRedirect,
    logout
  } = useAuth0();

  return (
    <nav className="navbar navbar-expand-md bg-primary shadow">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand text-white">
          <img src={logoHospital} alt="Logo" width="100" className="d-inline-block" />
          Hospital C. Villalba
        </Link>

        {/*  boton hamburguesa */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse ms-5" id="navbarSupportedContent">
          <ul className="navbar-nav">
            {isAuthenticated ? (
              <React.Fragment>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Paciente
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><Link to="/paciente/informe_paciente" className='dropdown-item'>Informe de paciente</Link></li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Historia Clinica
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><Link to="/historia-clinica/alta_historia_clinica" className='dropdown-item'>Alta Historia Clinica</Link></li>
                  </ul>
                </li>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <li className="nav-item">
                  <Link to="/" className='nav-link text-white'>Inicio</Link>
                </li>
                <li className="nav-item">
                  <Link to="/nosotros" className='nav-link text-white'>Sobre Nosotros</Link>
                </li>
                <li className="nav-item">

                  <Link to="/contacto" className='nav-link text-white'>Contacto</Link>
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
          <div className="d-md-none">
            <ul className="navbar-nav">
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
