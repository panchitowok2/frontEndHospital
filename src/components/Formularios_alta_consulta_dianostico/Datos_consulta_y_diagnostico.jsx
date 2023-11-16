import React, { useState, useEffect } from "react";
import { obtener_enfermedades } from "../../funcionesJS/funciones_enfermedades.js";
import { alta_consulta_y_diagnostico } from "../../funcionesJS/funciones_diagnosticos.js";
const Datos_consulta_y_diagnostico = ({ state }) => {
  const{
    sintomasConsulta,
    setSintomasConsulta,
    observacionConsulta, 
    setObservacionConsulta,
    fechaConsulta, 
    setFechaConsulta,
    observacionDiagnostico, 
    setObservacionDiagnostico,
    descripcionDiagnostico, 
    setDescripcionDiagnostico,
    enfermedades, 
    set_enfermedades,
    enfermedad, 
    set_enfermedad,
    historiaClinica, 
    setHistoriaClinica,
    turnoElegido,
    setTurnoElegido,
    turnos,
    medico,
    setErrors,
    persona
  }=state
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await obtener_enfermedades();
        set_enfermedades(data);
      } catch (error) {}
    };
    fetchData();
  }, []);
  let alta_consulta_completa = async(e) => {
    e.preventDefault();
    try {
      const resultado=await alta_consulta_y_diagnostico(sintomasConsulta,observacionConsulta,fechaConsulta,turnoElegido,observacionDiagnostico,descripcionDiagnostico,enfermedad,persona.historia_clinica)
      console.log("resultado = "+resultado);
    } catch (error) {
      setErrors([error.message]);
    }
  };


  return (
    <form onSubmit={alta_consulta_completa}>
      <div className="row">
        <div class="form-floating mb-3 w-50">
          <select
            class="form-select"
            id="turnos"
            aria-label="Seleccion de turnos"
            value={turnoElegido}
            onChange={(e) => {setTurnoElegido(e.target.value)
              const fechaSeleccionada = e.target.options[e.target.selectedIndex].getAttribute("data-fecha");
              setFechaConsulta(fechaSeleccionada);}}
            required
          >
            <option selected value="">
              Seleccioná una opción
            </option>
            {turnos.map((turno) => (
              <option key={turno._id} value={turno._id} data-fecha={turno.fecha}>{turno.fecha} {turno.hora}</option>
            ))}
          </select>
          <label for="turnoElegido">seleccionar turno</label>
        
            <div className="form-floating mb-3 mt-3 w-100">
              <input
                type="text"
                className="form-control"
                id=""
                onChange={(e) =>  setSintomasConsulta(e.target.value)
                 }
                required
              />
              <label htmlFor="sintomas_consulta">sintomas de la consulta</label>
            </div>

            
            <div className="form-floating mb-3 mt-3 w-100">
              <input
                type="text"
                className="form-control"
                id="observaciones_consulta"
                onChange={(e) =>  setObservacionConsulta(e.target.value)}
                required
              />
              <label htmlFor="observaciones_consulta">observaciones de la consulta</label>
            </div>


            <div className="form-floating mb-3 mt-3 w-100">
              <input
                type="text"
                className="form-control"
                id="observaciones_diagnostico"
                onChange={(e) =>  setObservacionDiagnostico(e.target.value)}
                required
              />
              <label htmlFor="observaciones_diagnostico">observaciones del diagnostico</label>
            </div>

            <div className="form-floating mb-3 mt-3 w-100">
              <input
                type="text"
                className="form-control"
                id="descripcion_diagnostico"
                onChange={(e) =>  setDescripcionDiagnostico(e.target.value)}
                required
              />
              <label htmlFor="descripcion_diagnostico">descripcion del diagnostico</label>
            </div>
            <div class="form-floating mb-3 w-50">
          <select
            class="form-select"
            id="enfermedad"
            aria-label="Seleccion de enfermedad"
            value={enfermedad}
            onChange={(e) => set_enfermedad(e.target.value)}
            required
          >
            <option selected value="">
              Seleccioná una opción
            </option>
            {enfermedades.map((enfermedad) => (
              <option value={enfermedad._id}>{enfermedad.nombre}</option>
            ))}
          </select>
          <label for="enfermedad">Enfermedad</label>
        </div>
          <input
    type="submit"
    class="btn btn-primary mb-3"
    value="buscar turnos"
  />
        </div>


      </div>
    </form>
  );
};
export default Datos_consulta_y_diagnostico;
