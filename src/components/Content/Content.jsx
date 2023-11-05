// contenido de la pàgina
import React,{ useState, useEffect } from 'react';
import FormularioAltaHistoriaClinica from '../Formulario/Form_Alta_Historia_Clinica.jsx';
import FormBuscarIdPersona from '../Formulario/Form_Buscar_IDPersona.jsx';
import FormBuscarHistoriaClinica from '../Formulario/Form_Buscar_Historia_Clinica.jsx';
import FormAltaPersona from '../Formulario/Form_Alta_Persona.jsx';
function Content() {


  return (
        <div className="footerSiempreAbajo m-3">
        <FormularioAltaHistoriaClinica />
        <FormBuscarIdPersona />
        <FormBuscarHistoriaClinica />
        <FormAltaPersona />
        </div>
  );
}

export default Content;
