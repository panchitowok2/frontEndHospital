const altaTratamientoFarmacologico = async (tipo, descripcion, fecha_inicio, duracion, historia_clinica_id, diagnostico_id, medico_id, dosificaciones) => {
  try {
    const url = 'http://localhost:4000/api/altaTratamientoFarmacologico';
    const params = {
      "tipo": tipo,
      "descripcion": descripcion,
      "fecha_inicio": fecha_inicio,
      "duracion": duracion,
      "historia_clinica": historia_clinica_id,
      "diagnostico": diagnostico_id,
      "medico": medico_id,
      "dosificaciones": dosificaciones
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
      throw new Error(data.message || 'No se pudo crear el tratamiento');
    }

    return data;
  } catch (error) {
    console.error('Error al crear el tratamiento:', error.message);
  }
}
const buscarTratamientosFarmacologicosEnLaFecha = async (fechaInicio, fechaFin) => {
  try {
    const baseURL = 'http://localhost:4000/api/tratamientos_farmacologicos/buscar';
    const params = new URLSearchParams({
      fecha_inicio: fechaInicio,
      fecha_final: fechaFin
    });

    const url = `${baseURL}?${params.toString()}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'No existen tratamientos farmacologicos registrados con dicha especialidad en las fechas mencionadas');
    }

    return data;
  } catch (error) {
    console.error('Error al obtener la lista de tratamientos farmacologicos:', error.message);
    throw error;
  }
};

export { altaTratamientoFarmacologico }
export { buscarTratamientosFarmacologicosEnLaFecha }
