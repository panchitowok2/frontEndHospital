import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth0 } from "@auth0/auth0-react";
import { obtener_enfermedades } from "../../funcionesJS/funciones_enfermedades.js";
import { obtener_consultas_por_enfermedad } from "../../funcionesJS/funciones_consultas.js";
import "./estilos.css";

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
    <div className="ms-5 me-5 ">
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
        Buscar consultas por una enfermedad
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
            <h2> Registros encontrados: {consultas.length}</h2>
            {consultas.map((consulta, index) => (
              <div key={index} className="">
                <div className="accordion-item ">
                  <button
                    className="accordion-button "
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#consulta${index}`}
                    aria-expanded="false"
                    aria-controls={`consulta${index}`}
                  >
                    Consulta {index + 1}
                  </button>
                  <div
                    id={`consulta${index}`}
                    className="accordion-collapse collapse "
                    aria-labelledby="headingOne"
                  >
                    <div
                      className="accordion-body d-flex flex-column"
                      aria-expanded="false"
                    >
                      <div className="">
                      <p><b>Fecha:</b> {consulta.consulta.fecha_consulta}</p>
                      </div>


                      <div className="d-flex flex-wrap">
                      <div className="col-md-2 me-5 mb-4" >
                        <h4 >Datos del paciente:</h4>
                        <p className="mb-2">
                          <b>Nombre:</b> {consulta.consulta.paciente_consulta.nombre}{" "}
                          {consulta.consulta.paciente_consulta.apellido}
                        </p>
                        <p className="mb-2">
                          <b>Tipo de documento: </b>{consulta.consulta.paciente_consulta.tipo_documento}{" "}
                        </p>
                        <p className="mb-2">
                        <b>Número:</b> {consulta.consulta.paciente_consulta.documento}
                        </p>
                        <p className="mb-2"><b>Sexo:</b> {consulta.consulta.paciente_consulta.sexo}</p>
                        <p className="mb-2">
                        <b>Dirección:</b> {consulta.consulta.paciente_consulta.direccion}
                        </p>
                        <p className="mb-2">
                        <b>Teléfono:</b>
                          {consulta.consulta.paciente_consulta.telefono}
                        </p>
                      </div>
                      <div className="col-md-2 me-5 mb-4">
                      <h4>Síntomas:</h4>
                        <p className="mb-2"><b>Síntomas:</b> {consulta.consulta.sintomas}</p>
                        <p className="mb-2"><b>Observaciones:</b> {consulta.consulta.observacion} </p>
                      </div>
                      <div className="col-md-2 me-5 mb-4">
                        <h4>Médico: </h4>
                        <p className="mb-2">
                          <b>Nombre:</b> {consulta.consulta.medico_consulta.nombre}{" "}
                          {consulta.consulta.medico_consulta.apellido}
                        </p>
                        <p className="mb-2"><b>Legajo:</b> {consulta.consulta.medico_consulta.legajo}</p>
                      </div>
                      <div className="col-md-2 me-5 mb-4">
                        <h4>Diagnóstico</h4>
                        <p className="mb-2"> 
                          <b>Observaciones:</b> {consulta.consulta.diagnostico.observaciones}
                        </p>
                        <p className="mb-2 ">
                          <b>Enfermedad:</b> {consulta.consulta.diagnostico.enfermedad}
                        </p>
                      </div>

                      <div className="col-md-2 me-5 mb-4">
                        <h4>Tratamiento:</h4>
                        {consulta.consulta.diagnostico
                          .tratamiento_farmacologico != null ? (
                          <>
                            <p className="mb-2">
                            <b>Descripción:</b> {
                                consulta.consulta.diagnostico
                                  .tratamiento_farmacologico
                                  .descripcion_tratamiento_farmacologico
                              }
                            </p>
                            <p className="mb-2">
                              <b>Medicamento:</b> {
                                consulta.consulta.diagnostico
                                  .tratamiento_farmacologico.nombre_medicamento
                              }
                            </p>
                            <p className="mb-2">
                            <b>Presentación:</b> {
                                consulta.consulta.diagnostico
                                  .tratamiento_farmacologico
                                  .presentacion_medicamento
                              }
                            </p>
                            <p className="mb-2">
                              <b>Dosis:</b> {
                                consulta.consulta.diagnostico
                                  .tratamiento_farmacologico.dosis
                              }
                            </p>
                            <p className="mb-2">
                              <b>Fecha de inicio del tratamiento:</b> {
                                consulta.consulta.diagnostico
                                  .tratamiento_farmacologico.fecha_inicio
                              }
                            </p>
                            <p className="mb-2">
                            <b>Duración:</b> {
                                consulta.consulta.diagnostico
                                  .tratamiento_farmacologico.duracion
                              }
                            </p>
                          </>
                        ) : (
                          // Renderizar otro contenido si el tratamiento es nulo
                          <p className="mb-2">No hay tratamiento registrado.</p>
                        )}</div>
                     

                     </div>


                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

         
        </div>
      )}
    </div>
  );
};

export default Formulario_Consultas_ordenadas_por_enfermedad;
