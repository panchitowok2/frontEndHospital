// contenido de la pàgina
import React,{ useState, useEffect } from 'react';
import Perfil from '../Perfil/Perfil.jsx'
import Formulario_Consulta_Medicamentos_Mas_Recetados from '../Formulario_Consulta_Medicamentos_Mas_Recetados/Formulario_Consulta_Medicamentos_Mas_Recetados.jsx';

function Content() {


  return (
        <div className="footerSiempreAbajo m-3">
   
        <Formulario_Consulta_Medicamentos_Mas_Recetados />

        </div>
  );
}

export default Content;
