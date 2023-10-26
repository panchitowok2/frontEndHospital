// Menu
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import jwt_decode from 'jwt-decode';

function Menu() {
    const { user, isAuthenticated, isLoading } = useAuth0();
    //const decodedToken = jwt_decode({user});
    if (isLoading) {
        return <div>Loading ...</div>;
    }
    const roles = user['https://backendhospital.com/roles'];
    console.log(roles);
    return isAuthenticated;
}

export default Menu;