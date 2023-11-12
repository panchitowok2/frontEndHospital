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

export { buscarDatosHistoriaClinica }
