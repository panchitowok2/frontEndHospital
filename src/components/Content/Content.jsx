// contenido de la pàgina
import React,{ useState, useEffect } from 'react';
import Perfil from '../Perfil/Perfil.jsx'

import Formulario_Consultas_ordenadas_por_enfermedad from '../Formularios_alta_consulta_dianostico/Formulario_Consultas_ordenadas_por_enfermedad.jsx';
import Formulario_alta_consulta_diagnostico from '../Formularios_alta_consulta_dianostico/Formulario_alta_consulta_diagnostico.jsx';

function Content() {


  return (
        <div className="footerSiempreAbajo m-3">
   
  {/* <Formulario_Consulta_Medicamentos_Mas_Recetados />
        <Formulario_Alta_Tratamiento_Farmacologico/>
        <Formulario_Consultas_ordenadas_por_enfermedad/>*/}
        <Formulario_alta_consulta_diagnostico/>

        </div>
  );
}

export default Content;
