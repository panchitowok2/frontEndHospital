const obtenerEnfermedades = async () => {
  try {
    const response = await fetch('http://localhost:4000/api/obtener_enfermedades');
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'No se pudieron obtener las enfermedades');
    }

    return data;
  } catch (error) {
    console.error('Error al obtener las enfermedades:', error.message);
    throw error;
  }
};

const obtenerEnfermedad = async (id) => {
  try {
    const url = `http://localhost:4000/api/enfermedades/${id}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'No se pudo obtener la enfermedad');
    }

    return data;
  } catch (error) {
    console.error('Error al obtener la enfermedad:', error.message);
    throw error;
  }
};

export { obtenerEnfermedad, obtenerEnfermedades }


