import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth0 } from "@auth0/auth0-react";
import { obtener_enfermedades } from "../../funcionesJS/funciones_enfermedades.js";
import { obtener_consultas_por_enfermedad } from "../../funcionesJS/funciones_consultas.js";

const Formulario_Consultas_ordenadas_por_enfermedad = () => {
  const [errors, setErrors] = useState([]);
  const [enfermedades, set_enfermedades] = useState([]);

  // variables del formulario
  const [enfermedad, set_enfermedad] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [consultas, set_consultas] = useState([]);
  const { isAuthenticated } = useAuth0();

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resultado = await obtener_consultas_por_enfermedad(
        enfermedad,
        fechaInicio,
        fechaFin
      );
      console.log(resultado);
      set_consultas(resultado);
      setErrors([]);
    } catch (error) {
      setErrors([error.message]);
      set_consultas([]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await obtener_enfermedades();
        set_enfermedades(data);
      } catch (error) {}
    };
    fetchData();
  }, []);
  if (!isAuthenticated) {
    return <h1>no estas logeado reeeee</h1>;
  }
  return (
    <div>
      {errors.length > 0 && (
        <div class="alert alert-danger mt-3">
          <p>
            {" "}
            <strong> Error al procesar la transacción </strong>{" "}
          </p>

          <ul>
            {errors.map((error) => (
              <ul>
                <li> {error} </li>
              </ul>
            ))}
          </ul>
        </div>
      )}
      <h2 class="mb-3">
        {" "}
        Obtener consultas realizadas para un tipo de enfermedad
      </h2>
      <form class="mb-3" onSubmit={handleSubmit}>
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

        <div class="form-floating mb-3 w-50">
          <input
            type="date"
            class="form-control"
            id="fechaInicio"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            required
          />
          <label for="fechaInicio">Fecha de inicio</label>
        </div>

        <div class="form-floating mb-3 w-50">
          <input
            type="date"
            class="form-control"
            id="fechaFin"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
            required
          />
          <label for="fechaFin">Fecha de fin</label>
        </div>

        <input
          type="submit"
          class="btn btn-primary mb-3"
          value="Realizar Consulta"
        />
      </form>

      {consultas.length > 0 && (
        <div class="row">
          <div className="accordion">
            <h2> total de consultas encontradas={consultas.length}</h2>
            {consultas.map((consulta, index) => (
              <div key={index}>
                <div className="accordion-item">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#consulta${index}`}
                    aria-expanded="true"
                    aria-controls={`consulta${index}`}
                  >
                    Consulta {index + 1}
                  </button>
                  <div
                    id={`consulta${index}`}
                    className="accordion-collapse collapse show"
                    aria-labelledby="headingOne"
                  >
                    <div className="accordion-body">
                      <h3>DATOS CONSULTA</h3>
                      <p>Fecha: {consulta.consulta.fecha_consulta}</p>
                      <h4>Datos del paciente:</h4>
                      <p>Nombre:{consulta.consulta.paciente_consulta.nombre} {consulta.consulta.paciente_consulta.apellido}</p>
                      <p>Tipo documento:{consulta.consulta.paciente_consulta.tipo_documento} </p>
                      <p>Numero:{consulta.consulta.paciente_consulta.documento}</p>
                      <p>Sexo:{consulta.consulta.paciente_consulta.sexo}</p>
                      <p>Direccion:{consulta.consulta.paciente_consulta.direccion}</p>
                      <p>Telefono:{consulta.consulta.paciente_consulta.telefono}</p>
                      <p>Sintomas: {consulta.consulta.sintomas}</p>
                      <p>Observaciones: {consulta.consulta.observacion} </p>
                      <h4>Medico: </h4>
                      <p>
                        nombre:{consulta.consulta.medico_consulta.nombre} {consulta.consulta.medico_consulta.apellido}
                      </p>
                      <p>legajo:{consulta.consulta.medico_consulta.legajo}</p>
                      <h4>
                        Diagnostico
                      </h4>
                      <p>Observaciones:{consulta.consulta.diagnostico.observaciones}</p>
                      <p>Enfermedad:{consulta.consulta.diagnostico.enfermedad}</p>
                      <h4>Tratamiento:</h4>
                      {consulta.consulta.diagnostico.tratamiento_farmacologico != null ? (
                      <>
                      <p>Descripcion:{consulta.consulta.diagnostico.tratamiento_farmacologico.descripcion_tratamiento_farmacologico}</p>
                      <p>Medicamento:{consulta.consulta.diagnostico.tratamiento_farmacologico.nombre_medicamento}</p>
                      <p>Presentacion:{consulta.consulta.diagnostico.tratamiento_farmacologico.presentacion_medicamento}</p>
                      <p>Dosis:{consulta.consulta.diagnostico.tratamiento_farmacologico.dosis}</p>
                      <p>fecha de inicio del tratamiento:{consulta.consulta.diagnostico.tratamiento_farmacologico.fecha_inicio}</p>
                     <p>duracion:{consulta.consulta.diagnostico.tratamiento_farmacologico.duracion}</p>
                      </>
  ) : (
    // Renderizar otro contenido si el tratamiento es nulo
    <p>No hay tratamiento registrado.</p>
  )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="accordion-item">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne2"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                1. Datos del Paciente
              </button>

              <div
                id="collapseOne2"
                className="accordion-collapse collapse show"
                aria-labelledby="headingOne"
              >
                <div className="accordion-body">
                  <h2>hola mundo</h2>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-4 justify-content-center"></div>
        </div>
      )}
    </div>
  );
};

export default Formulario_Consultas_ordenadas_por_enfermedad;
