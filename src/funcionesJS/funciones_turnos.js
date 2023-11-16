//polo
const obtener_turnos=async(fecha_turno,hora1,hora2,id_medico,id_paciente)=>{
  try {
    
   const url="http://localhost:4000/api/obtener_turnos"
   const params={
    "fecha":fecha_turno,
    "hora1":hora1,
    "hora2":hora2,
    "id_medico":id_medico,
    "id_paciente":id_paciente
    };
    const response=await fetch(url,{
      method:"POST",
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'no se pudieron obtener los turnos');
    }
    
    return data;
  } catch (error) {
    console.error('Error al obtener los turnos:', error.message);
  throw error;
  }

}//polo
export {obtener_turnos}