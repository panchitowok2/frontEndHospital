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

const obtenerEspecialidades = async (id) => {
  try {
    const url = `http://localhost:4000/api/medicos/${id}/especialidades`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'No se pudo obtener las especialidades del medico');
    }

    return data;
  } catch (error) {
    console.error('Error al obtener las especialidades del medico:', error.message);
    throw error;
  }
};

export { obtenerMedico, obtenerEspecialidades }

