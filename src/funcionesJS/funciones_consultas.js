//polo
const obtener_consultas_por_enfermedad=async(enfermedad, fechaInicio,fechaFin)=>{

try {
  const url= "http://localhost:4000/api/obtener_diagnosticos_por_enfermedad"
  const params={
  "id_enfermedad":enfermedad,
  "fecha_inicio":fechaInicio,
  "fecha_fin":fechaFin
  };
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'No se pudieron obtener las consultas y los diagnosticos');
  }
  
  return data;
} catch (error) {
  console.error('Error al obtener los diagnosticos:', error.message);
  throw error;
}
}//polo

const obtenerConsulta = async (id) => {
  try {
    const url = `http://localhost:4000/api/consultas/${id}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'No se pudo obtener la consulta');
    }

    return data;
  } catch (error) {
    console.error('Error al obtener la consulta:', error.message);
    throw error;
  }
};

export { obtenerConsulta ,obtener_consultas_por_enfermedad}
