import React, { useEffect } from "react";
import { obtener_turnos } from "../../funcionesJS/funciones_turnos.js";

const Seleccionar_medico_fecha_y_hora = ({ state }) => {
  const {
    persona,
    fechaTurno,
    hora1, sethora1
    , hora2, sethora2,
    medico, setTurnos,
    setErrors,
    setFechaTurno,
    setMedico,
    medicos,
    setexpandir1,
    setexpandir2,
    setexpandir3
  } = state
  let buscar_turnos = async (e) => {
    e.preventDefault();

    try {
      console.log("el id de la persona a buscar es: " + persona._id);
      const resultado = await obtener_turnos(fechaTurno, medico, persona._id)
      console.log(resultado);
      setTurnos(resultado);
      setErrors([]);
      setexpandir1(true)
    setexpandir2(true)
    setexpandir3(false)
    } catch (error) {
      setErrors([error.message]);
    }
  };
  return (
    <form class="mb-3" onSubmit={buscar_turnos}>
      <div className="row">
        <div class="col-md-6">
          <div class="form-floating mb-3 ">
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
        </div>
      </div>
 
      <div className="row">
        <div class="col-md-6">
          <div class="form-floating mb-3">
            <select
              class="form-select"
              id="medico"
              aria-label="Seleccion de medico"
              value={medico}
              onChange={(e) => setMedico(e.target.value)}
              required
            >
              <option selected value="">
                Selecciona una opción
              </option>
              {medicos.map((medico) => (
                <option key= {medico._id} value={medico._id}>
                  {medico.nombre} {medico.apellido}
                </option>
              ))}
            </select>
            <label for="medico">Médico</label>
          </div>

        </div>
      </div>

      <input
        type="submit"
        class="btn btn-primary mb-3"
        value="Buscar Turnos"
      />
    </form>);
}
export default Seleccionar_medico_fecha_y_hora;