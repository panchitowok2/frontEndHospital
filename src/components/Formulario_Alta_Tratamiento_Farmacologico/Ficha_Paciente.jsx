import React from 'react';

import { calcularEdad } from '../../funcionesJS/funciones_persona.js';

const Ficha_Paciente = ({ state }) => {

  const { 
    persona,
    historiaClinica,
    buscandoPersona
  } = state;

  return(
      ! buscandoPersona ? (
        <div>
          <div className="card">
            <div className="card-header fw-bold">
              Ficha del paciente
            </div>

            <div className="card-body">
              {persona ? (
                <div>
                  <h4 className="card-title">{persona.nombre} {persona.apellido}</h4>
                  <h6 className="card-subtitle mb-2 text-muted">De {persona.nacionalidad}, {calcularEdad(persona.fecha_nacimiento)} años </h6>

                  <p className="card-text">
                    <strong> Telefono: </strong> {persona.telefono} <br />
                    <strong>Email: </strong> {persona.email}
                  </p>
                </div>
              ) : (
                <div> Esperando selección del paciente </div>
              )}
            </div>
          </div>

          <div className="card mt-3">
            <div className="card-header fw-bold">
              Datos Historia Clínica
            </div>

            <div className="card-body">
              {historiaClinica ? (
                <div>
                  <p className="card-text">
                    <strong> Nro: </strong> #{historiaClinica._id} <br />
                    <strong> Grupo Sanguineo: </strong> {historiaClinica.grupo_sanguineo} <br />
                    <strong>Factor: </strong> {historiaClinica.factor_sanguineo}

                    {historiaClinica.diagnosticos.length === 0 && 
                    <p className="text-danger mt-3"> No hay diagnosticos cargados en la Historia Clinica</p>
                    }
                  </p>
                </div>
              ) : (
                <div> Sin datos de Historia Clínica </div>
              )}
            </div>
          </div>
        </div>
      ) : (
          <div className="d-flex align-items-center justify-content-center p-5">
            <div className="spinner-grow text-primary spinner-grow-sm ms-0" role="status">
              <span className="visually-hidden">Loading...</span> 
            </div>

            <div className="spinner-grow text-primary spinner-grow-sm ms-2" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>

            <div className="spinner-grow text-primary spinner-grow-sm ms-2" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
      )
      
  )
}

export default Ficha_Paciente;