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
const obtenerEspecialidad = async (id) => {
  try {
    const url = `http://localhost:4000/api/especialidades/${id}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'No se pudo obtener la especialidad');
    }

    return data;
  } catch (error) {
    console.error('Error al obtener la especialidad:', error.message);
    throw error;
  }
};
export {obtenerEspecialidades,obtenerEspecialidad};

