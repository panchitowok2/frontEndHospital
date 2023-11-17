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

export { buscarTratamientosFarmacologicosEnLaFecha }