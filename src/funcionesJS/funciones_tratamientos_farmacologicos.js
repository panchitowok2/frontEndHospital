const altaTratamientoFarmacologico = async (tipo, descripcion, fecha_inicio, duracion, historia_clinica_id, diagnostico_id, medico_id, dosificaciones) => {
  try {
    const url = 'http://localhost:4000/api/tratamientos_farmacologicos';
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
    throw error;
  }
};

export { altaTratamientoFarmacologico }
