// Boton Log In
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function BotonLogIn() {
    const {
        isAuthenticated,
        loginWithRedirect,
    } = useAuth0();
  return !isAuthenticated && (
        <button type="button" className='btn btn-success m-3' onClick={() => loginWithRedirect()}>Iniciar sesión</button>
  );
}

export default BotonLogIn;