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
    <nav className="navbar navbar-expand-md bg-primary">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand text-white">
          <img src={logoHospital} alt="Logo" title="Hospital Conrado Villalba" width="100" className="d-inline-block" />
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-md-0">

            {isAuthenticated ? (
              <React.Fragment>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Pacientes
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><Link to="/paciente/informe_paciente" className='dropdown-item'>Generar informe de paciente</Link></li>
                  </ul>
                </li>

                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Historias Clínicas
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><Link to="/historia-clinica/alta_historia_clinica" className='dropdown-item'>Alta de historia clínica</Link></li>
                  </ul>
                </li>

                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Consultas
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><Link to="/consulta/alta_consulta" className='dropdown-item'>Nueva consulta</Link></li>
                    <li><Link to="/consulta/consultas_por_enfermedad" className='dropdown-item'>Buscar consultas por enfermedad</Link></li>
                  </ul>
                </li>

                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Tratamientos Farmacológicos
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><Link to="/tratamientoFarmacologico/alta_tratamiento" className='dropdown-item'>Nuevo tratamiento</Link></li>
                    <li><Link to="/medicamento/medicamentos_mas_recetados" className='dropdown-item'>Buscar medicamentos más recetados</Link></li>
                  </ul>
                </li>

              </React.Fragment>
            ) : (
              <React.Fragment>
                <li className="nav-item">
                  <Link to="/" className='nav-link text-white'>Inicio</Link>
                </li>
                <li className="nav-item">
                  <Link to="/nosotros" className='nav-link text-white'>Sobre nosotros</Link>
                </li>
                <li className="nav-item">

                  <Link to="/contacto" className='nav-link text-white'>Contactános</Link>
                </li>
              </React.Fragment>
            )}

          </ul>
        </div>

        <div className="d-none d-md-block ms-auto">
          {isAuthenticated ? (
            <BotonLogOut />
          ) : (
            <BotonLogIn />
          )}
        </div>

      </div>
    </nav>
  );
}

export default Header;
