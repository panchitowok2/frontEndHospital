import React, { useState, useEffect } from "react";
import { obtener_enfermedades } from "../../funcionesJS/funciones_enfermedades.js";
import { alta_consulta_y_diagnostico } from "../../funcionesJS/funciones_diagnosticos.js";
const Datos_consulta_y_diagnostico = ({ state }) => {
  const {
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
    persona,
    setMessages
  } = state
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await obtener_enfermedades();
        set_enfermedades(data);
      } catch (error) {
        setErrors([error.message])
      }
    };
    fetchData();
  }, []);



  let alta_consulta_completa = async (e) => {
    e.preventDefault();
    try {
      const resultado = await alta_consulta_y_diagnostico(sintomasConsulta, observacionConsulta, fechaConsulta, turnoElegido, observacionDiagnostico, descripcionDiagnostico, enfermedad, persona.historia_clinica)
      console.log("resultado = " + resultado);
      setMessages(['consulta y diagonostico creados exitosamente.'])
    } catch (error) {
      setErrors([error.message]);
    }
  };


  return (
    <form onSubmit={alta_consulta_completa}>
      <div className="row">
        <div className="col-md-9">
          <div class="form-floating mb-3">
            <select
              class="form-select"
              id="turnos"
              aria-label="Seleccion de turnos"
              value={turnoElegido}
              onChange={(e) => {
                setTurnoElegido(e.target.value)
                const fechaSeleccionada = e.target.options[e.target.selectedIndex].getAttribute("data-fecha");
                setFechaConsulta(fechaSeleccionada);
              }}
              required
            >
              <option value="">
                Selecciona una opción
              </option>
              {turnos.map((turno) => (

                <option key={turno._id} value={turno._id} data-fecha={turno.fecha}>{(new Date(turno.fecha)).toLocaleDateString()} {turno.hora}</option>
              ))}
            </select>
            <label forHtml="turnoElegido">Seleccionar Turno</label>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-9">
          <div className="form-floating mb-3 mt-3">
            <input
              type="text"
              className="form-control"
              id=""
              onChange={(e) => setSintomasConsulta(e.target.value)
              }
              required
            />
            <label htmlFor="sintomas_consulta">Síntomas de la Consulta</label>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-9">
          <div className="form-floating mb-3 mt-3">
            <input
              type="text"
              className="form-control"
              id="observaciones_consulta"
              onChange={(e) => setObservacionConsulta(e.target.value)}
              required
            />
            <label htmlFor="observaciones_consulta">Observaciones de la Consulta</label>
          </div>
        </div>
      </div><div className="row">
        <div className="col-md-9">
          <div className="form-floating mb-3 mt-3">
            <input
              type="text"
              className="form-control"
              id="observaciones_diagnostico"
              onChange={(e) => setObservacionDiagnostico(e.target.value)}
              required
            />
            <label htmlFor="observaciones_diagnostico">Observaciones del Diagnóstico</label>
          </div>
        </div>
      </div><div className="row">
        <div className="col-md-9">
          <div className="form-floating mb-3 mt-3">
            <input
              type="text"
              className="form-control"
              id="descripcion_diagnostico"
              onChange={(e) => setDescripcionDiagnostico(e.target.value)}
              required
            />
            <label htmlFor="descripcion_diagnostico">Descripción del Diagnóstico</label>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-9">
          <div className="form-floating mb-3">
            <select
              class="form-select"
              id="enfermedad"
              aria-label="Seleccion de enfermedad"
              value={enfermedad}
              onChange={(e) => set_enfermedad(e.target.value)}
              required
            >

              <option value="">
                Selecciona una opción
              </option>
              {enfermedades.map((enfermedad) => (
                <option key={enfermedad._id} value={enfermedad._id}>{enfermedad.nombre}</option>
              ))}
            </select>
            <label for="enfermedad">Enfermedad</label>
          </div>

        </div>
      </div>

      <input
        type="submit"
        class="btn btn-primary mb-3"
        value="Guardar Consuta y Diagnóstico"
      />
    </form>
  );
};
export default Datos_consulta_y_diagnostico;
