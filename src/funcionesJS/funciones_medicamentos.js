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

const obtenerMedicamentos = async () => {
  try {
    const url = `http://localhost:4000/api/medicamentos`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'No se pudo obtener los medicamentos');
    }

    return data;
  } catch (error) {
    console.error('Error al obtener los medicamentos:', error.message);
    throw error;
  }
};

const obtenerMedicamento = async (id) => {
  try {
    const url = `http://localhost:4000/api/medicamentos/${id}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'No se pudo obtener los datos del medicamento');
    }

    return data;
  } catch (error) {
    console.error('Error al obtener los datos del medicamento:', error.message);
    throw error;
  }
};

export default obtenerMedicamentosMasRecetados;
export { obtenerMedicamentos, obtenerMedicamento }
