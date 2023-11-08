const obtenerEspecialidades = async () => {
  try {
    const url = 'http://localhost:4000/api/obtenerEspecialidades';
    const params = { filter: "" };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'No se pudieron obtener las especialidades');
    }

    return data;
  } catch (error) {
    console.error('Error al obtener las enfermedades:', error.message);
    throw error;
  }
};

export default obtenerEspecialidades;

