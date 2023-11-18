const buscarDatosHistoriaClinica = async (id) => {
  try {
    const url = 'http://localhost:4000/api/buscar_datos_historia_clinica';
    const params = { 
      "_id": id
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
      throw new Error(data.message || 'No se pudo obtener los datos de la historia clinica');
    }
    
    return data;
  } catch (error) {
    console.error('Error al obtener los datos de la historia clinica:', error.message);
    throw error;
  }
};

const buscarDiagnosticosHistoriaClinica = async (id) => {
  try {
    const url = `http://localhost:4000/api/historias_clinicas/${id}/diagnosticos`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'No se pudo obtener los diagnosticos en la historia clínica');
    }
    
    return data;
  } catch (error) {
    console.error('Error al obtener los diagnosticos de la historia clínica:', error.message);
    throw error;
  }
};

export { buscarDatosHistoriaClinica,  buscarDiagnosticosHistoriaClinica}
