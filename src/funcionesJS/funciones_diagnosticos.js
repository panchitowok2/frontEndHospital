const obtenerDatosDiagnostico = async (id) => {
  try {
    const url = `http://localhost:4000/api/diagnosticos/${id}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'No se pudo obtener los datos del diagnóstico');
    }
    
    return data;
  } catch (error) {
    console.error('Error al obtener los datos del diagnóstico:', error.message);
    throw error;
  }
};
//polo
const alta_consulta_y_diagnostico= async(sintomasConsulta,observacionConsulta,fechaConsulta,turnoElegido,observacionDiagnostico,descripcionDiagnostico,enfermedad,historiaClinica)=>{
  try {
    const url="http://localhost:4000/api/alta_diagnostico_completo";
    const params={
      "sintomas_consultas":sintomasConsulta,
      "observacion_consulta":observacionConsulta,
      "fecha_consulta":fechaConsulta,
      "id_turno":turnoElegido,
      "observacion_diagostico":observacionDiagnostico,
      "descripcion_diagnostico":descripcionDiagnostico,
      "id_enfermedad":enfermedad,
      "id_historia_clinica":historiaClinica
      };
      console.log("los parametros a enviar son para el alta diagnostico y consulta son:="+ JSON.stringify(params));
      const response= await fetch(url,{
        method:"POST",
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'no se pudieron obtener los turnos');
      }
      
      return data;
  } catch (error) {
    console.log("error en la funcion alta consulta y diagnostico: " +error.message);
    throw error;
  }
}
//polo

export { obtenerDatosDiagnostico,alta_consulta_y_diagnostico }
