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

export default obtenerEnfermedades;

