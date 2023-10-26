// Boton Log In
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function BotonLogIn() {
    const {
        isAuthenticated,
        loginWithRedirect,
    } = useAuth0();
  return !isAuthenticated && (
        <button type="button" className='btn btn-lg btn-success mt-4 mb-4 me-4' onClick={() => loginWithRedirect()}>LogIn</button>
  );
}

export default BotonLogIn;