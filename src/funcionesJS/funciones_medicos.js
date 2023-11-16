const obtenerMedico = async (id) => {
  try {
    const url = `http://localhost:4000/api/medicos/${id}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'No se pudo obtener el medico');
    }

    return data;
  } catch (error) {
    console.error('Error al obtener el medico:', error.message);
    throw error;
  }
};
//polo
const obtener_medicos=async()=>{
try {
  const url="http://localhost:4000/api/obtener_medicos";
  const response=await fetch(url);
const data=response.json()
if (!response.ok) {
  throw new Error(data.message || 'No se pudieron obtener los medicos');
}

return data;
} catch (error) {
  console.error('Error al obtener los medicos', error.message);
}

}//polo
export { obtenerMedico, obtener_medicos}

