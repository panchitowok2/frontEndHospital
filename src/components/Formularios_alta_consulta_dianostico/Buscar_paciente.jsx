import React, { useEffect } from "react";
import {
  buscarDatosPersona,
  buscarIdPersona,
} from "../../funcionesJS/funciones_persona";
import { obtener_medicos } from "../../funcionesJS/funciones_medicos.js";
const Buscar_paciente = ({ state }) => {
  const {
    tipoDocumento,
    setTipoDocumento,
    documento,
    setDocumento,
    apellido,
    setApellido,
    sexo,
    setSexo,
    persona,
    setPersona,
    setMedicos,
    setErrors,
   setexpandir1,
    setexpandir2,
    setexpandir3
  } = state;

  let Buscar_Persona = async (e) => {
    e.preventDefault();

    try {
      setPersona("");

      setErrors([]);

      const idPersona = await buscarIdPersona(
        tipoDocumento,
        documento,
        apellido,
        sexo
      );
      //console.log("id_persona:" + idPersona);
      const personaEncontrada = await buscarDatosPersona(idPersona);
      setPersona(personaEncontrada);
      //console.log("datos_persona" + personaEncontrada);

      const resultado_medicos = await obtener_medicos();
      //console.log(resultado_medicos);
      setMedicos(resultado_medicos);
      let turno=document.getElementById("fechaTurno");
      setexpandir1(true)
      setexpandir2(false)
      setexpandir3(true)
      turno.focus()
    } catch (err) {
      setErrors([err.message]);
      setPersona("");
    }

    setTimeout(() => {}, 3000); // 3000 milisegundos (3 segundos)
  };
  return (
    <form onSubmit={Buscar_Persona}>
      <div className="row">
        <div className="col-md-6">
          <div className="form-floating">
            <select
              className="form-select"
              id="tipoDocumento"
              aria-label="Floating label select example"
              onChange={(e) => setTipoDocumento(e.target.value)}
              required
            >
              <option value=""> Seleccione una opción </option>
              <option value="DNI">DNI - Documento Nacional de Identidad</option>
              <option value="LI">LC - Libreta Cívica</option>
              <option value="LE">LE - Libreta de Enrolamiento</option>
            </select>
            <label htmlFor="tipoDocumento">Tipo de documento</label>
          </div>
        </div>

        <div className="col-md-6 mt-0 mt-3 mt-md-0">
          <div className="form-floating mb-3">
            <input
              type="number"
              className="form-control"
              id="documento"
              onChange={(e) => setDocumento(e.target.value)}
              required
            />
            <label htmlFor="documento">Número de documento</label>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="apellido"
              onChange={(e) => setApellido(e.target.value)}
              required
            />
            <label htmlFor="apellido"> Apellido </label>
          </div>
        </div>

        <div className="col-md-auto">
          <p className="mb-1"> Sexo: </p>

          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="sexo"
              id="sexoFemenino"
              value="F"
              onChange={(e) => setSexo(e.target.value)}
              required
            />
            <label className="form-check-label" htmlFor="sexoFemenino">
              Femenino
            </label>
          </div>

          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="sexo"
              id="sexoMasculino"
              value="M"
              onChange={(e) => setSexo(e.target.value)}
              required
            />
            <label className="form-check-label" htmlFor="sexoMasculino">
              Masculino
            </label>
          </div>

          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="sexo"
              id="sexoNoBinario"
              value="X"
              onChange={(e) => setSexo(e.target.value)}
              required
            />
            <label className="form-check-label" htmlFor="sexoNoBinario">
              No Binario
            </label>
          </div>
        </div>

        <div class="col-md mt-3">
          <button type="submit" class="btn btn-primary float-end">
            {" "}
            Buscar persona{" "}
          </button>
        </div>
      </div>
    </form>
  );
};
export default Buscar_paciente;
