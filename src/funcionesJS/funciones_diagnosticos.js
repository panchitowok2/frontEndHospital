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


export { obtenerDatosDiagnostico }