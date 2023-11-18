import React, { useEffect } from "react";
import { obtener_turnos } from "../../funcionesJS/funciones_turnos.js";

const Seleccionar_medico_fecha_y_hora=({state})=>{
const{
  persona,
  fechaTurno,
  hora1,sethora1
  ,hora2,sethora2,
  medico,setTurnos,
  setErrors,
  setFechaTurno,
  setMedico,
  medicos
}=state
  let buscar_turnos = async (e) => {
    e.preventDefault();
   
    try {
      console.log("el id de la persona a buscar es: "+persona._id);
      const resultado= await obtener_turnos(fechaTurno,hora1,hora2,medico,persona._id)
      console.log(resultado);
      setTurnos(resultado);
      setErrors([]);
    } catch (error) {
      setErrors([error.message]);
    }
  };
  return( <form class="mb-3" onSubmit={buscar_turnos}>
  <div class="form-floating mb-3 w-50">
    <input
      type="date"
      class="form-control"
      id="fechaTurno"
      value={fechaTurno}
      onChange={(e) => setFechaTurno(e.target.value)}
      required
    />
    <label for="fechaTurno">Fecha</label>
  </div>

  <div className="col-md-6">
    <div className="form-floating">
      <select
        className="form-select"
        id="horaini"
        aria-label="Floating label select example"
        onChange={(e) => sethora1(e.target.value)}
        required
      >
        <option value=""> Seleccione una opción </option>
        <option value="00:00"> 00:00</option>
        <option value="01:00"> 01:00</option>
        <option value="02:00"> 02:00</option>
        <option value="03:00"> 03:00</option>
        <option value="04:00"> 04:00</option>
        <option value="05:00"> 05:00</option>
        <option value="06:00"> 06:00</option>
        <option value="07:00"> 07:00</option>
        <option value="08:00"> 08:00</option>
        <option value="09:00"> 09:00</option>
        <option value="10:00"> 10:00</option>
        <option value="11:00"> 11:00</option>
        <option value="12:00"> 12:00</option>
        <option value="13:00"> 13:00</option>
        <option value="14:00"> 14:00</option>
        <option value="15:00"> 15:00</option>
        <option value="16:00"> 16:00</option>
        <option value="17:00"> 17:00</option>
        <option value="18:00"> 18:00</option>
        <option value="19:00"> 19:00</option>
        <option value="20:00"> 20:00</option>
        <option value="21:00"> 21:00</option>
        <option value="22:00"> 22:00</option>
        <option value="23:00"> 23:00</option>
      </select>
      <label htmlFor="horaini">hora</label>
    </div>
  </div>
  <div className="col-md-6">
    <div className="form-floating">
      <select
        className="form-select"
        id="horafin"
        aria-label="Floating label select example"
        onChange={(e) => sethora2(e.target.value)}
        required
      >
        <option value=""> Seleccione una opción </option>
        <option value="00:00"> 00:00</option>
        <option value="01:00"> 01:00</option>
        <option value="02:00"> 02:00</option>
        <option value="03:00"> 03:00</option>
        <option value="04:00"> 04:00</option>
        <option value="05:00"> 05:00</option>
        <option value="06:00"> 06:00</option>
        <option value="07:00"> 07:00</option>
        <option value="08:00"> 08:00</option>
        <option value="09:00"> 09:00</option>
        <option value="10:00"> 10:00</option>
        <option value="11:00"> 11:00</option>
        <option value="12:00"> 12:00</option>
        <option value="13:00"> 13:00</option>
        <option value="14:00"> 14:00</option>
        <option value="15:00"> 15:00</option>
        <option value="16:00"> 16:00</option>
        <option value="17:00"> 17:00</option>
        <option value="18:00"> 18:00</option>
        <option value="19:00"> 19:00</option>
        <option value="20:00"> 20:00</option>
        <option value="21:00"> 21:00</option>
        <option value="22:00"> 22:00</option>
        <option value="23:00"> 23:00</option>
      </select>
      <label htmlFor="horafin">hora</label>
    </div>
  </div>

  <div class="form-floating mb-3 w-50">
    <select
      class="form-select"
      id="medico"
      aria-label="Seleccion de medico"
      value={medico}
      onChange={(e) => setMedico(e.target.value)}
      required
    >
      <option selected value="">
        Seleccioná una opción
      </option>
      {medicos.map((medico) => (
        <option value={medico._id}>
          {medico.nombre} {medico.apellido}
        </option>
      ))}
    </select>
    <label for="medico">medico</label>
  </div>

  <input
    type="submit"
    class="btn btn-primary mb-3"
    value="buscar turnos"
  />
</form>);
}
export default Seleccionar_medico_fecha_y_hora;