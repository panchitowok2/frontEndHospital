const obtenerMedicamentosMasRecetados = async (especialidad, fechaInicio, fechaFin) => {  
  try {
    const url = 'http://localhost:4000/api/buscarMedicamentosMasRecetados';
    const params = { 
      "especialidad": especialidad,
      "fecha_inicio": fechaInicio,
      "fecha_final": fechaFin
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
      throw new Error(data.message || 'No se pudieron obtener los medicamentos mas recetados');
    }
    
    return data;
  } catch (error) {
    console.error('Error al obtener los medicamentos:', error.message);
    throw error;
  }
};

export default obtenerMedicamentosMasRecetados;

