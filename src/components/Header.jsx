// Header.js
import React from 'react';
import logoHospital from '../logo.png'
import BotonLogIn from './BotonLogIn';
function Header() {
  return (
    <div className='bg-primary w-100 p-1 flex-container'>
      <div className='flex-container w-100'>
      <img src={logoHospital} alt='' width="15%"></img>
      <h2 className='centrar-vertical mt-4 text-white'>Hospital Conrado Villalba</h2>
      </div>
      <div className='d-flex justify-content-end w-100'>
        <BotonLogIn />
      </div>
    </div>
  );
}

export default Header;
