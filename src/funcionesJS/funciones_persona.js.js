const buscarPersona = async (tipo_documento, documento, sexo) => {
  try {
    const url = 'http://localhost:4000/api/buscar_persona';
    const params = { 
      "tipo_documento": tipo_documento,
      "documento": documento,
      "sexo": sexo
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
      throw new Error(data.message || 'No se pudo obtener la persona');
    }

    return data;
  } catch (error) {
    console.error('Error al obtener los datos de la persona:', error.message);
    throw error;
  }
};

const calcularEdad = (birthdate) => {
  var today = new Date();
  var birthDate = new Date(birthdate);
  var age = today.getFullYear() - birthDate.getFullYear();
  var monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
  }

  return age;
}

export default buscarPersona
export { calcularEdad }
