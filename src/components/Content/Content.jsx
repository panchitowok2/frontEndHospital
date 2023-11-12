// contenido de la pàgina
import React,{ useState, useEffect } from 'react';
import Perfil from '../Perfil/Perfil.jsx'
import Formulario_Consulta_Medicamentos_Mas_Recetados from '../Formulario_Consulta_Medicamentos_Mas_Recetados/Formulario_Consulta_Medicamentos_Mas_Recetados.jsx';
import Formulario_Alta_Tratamiento_Farmacologico from "../Formulario_Alta_Tratamiento_Farmacologico/Formulario_Alta_Tratamiento_Farmacologico.jsx"

function Content() {


  return (
        <div className="footerSiempreAbajo m-3">
   
        <Formulario_Consulta_Medicamentos_Mas_Recetados />
        <Formulario_Alta_Tratamiento_Farmacologico/>

        </div>
  );
}

export default Content;
