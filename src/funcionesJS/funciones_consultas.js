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

export { obtenerConsulta }

