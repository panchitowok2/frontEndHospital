import React, { useState } from 'react';
import { buscarPersona } from '../../funcionesJS/funciones_persona.js';

const Buscar_Persona = ({ state }) => {
  const { 
    tipoDocumento, 
    setTipoDocumento, 
    documento, 
    setDocumento,
    sexo,
    setSexo,
    setErrors,
    setPersona
  } = state;

  const [buscandoPersona, setBuscandoPersona] = useState(false);

  let handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setBuscandoPersona(true);
      const personaEncontrada = await buscarPersona(tipoDocumento, documento, sexo);
      setPersona(personaEncontrada)

      setErrors([])
    } catch (err) {
      setErrors([err.message])
    }

    setTimeout(() => {
      setBuscandoPersona(false);
    }, 1000); // 3000 milisegundos (3 segundos)
  }

  return(
    <form  onSubmit={handleSubmit}>
      <div class="row">
        <div class="col-md-6"> 
          <div class="form-floating">
            <select class="form-select" id="tipoDocumento" aria-label="Floating label select example" onChange={(e) => setTipoDocumento(e.target.value)} required>
              <option value=""> Seleccione una opción </option>
              <option value="DNI">DNI - Documento Nacional de Identidad</option>
              <option value="LI">LC - Libreta Cívica</option>
              <option value="LE">LE - Libreta de Enrolamiento</option>
            </select>
            <label for="tipoDocumento">Tipo de documento</label>
          </div>
        </div>

        <div class="col-md-6">
          <div class="form-floating mb-3">
            <input type="number" class="form-control" id="documento" onChange={(e) => setDocumento(e.target.value)} required/>
            <label for="documento">Número de documento</label>
          </div>
        </div>
      </div>
      
      <div class="row">
        <div class="col-md-12">
          <p class="mb-1"> Sexo: </p>
          
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="sexo" id="sexoFemenino" value="F" onChange={(e) => setSexo(e.target.value)} required />
            <label class="form-check-label" for="sexoFemenino">
              Femenino
            </label>
          </div>

          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="sexo" id="sexoMasculino" value="M" onChange={(e) => setSexo(e.target.value)} required />
            <label class="form-check-label" for="sexoMasculino">
              Masculino
            </label>
          </div>
        </div>

        <div class="col-md-auto mt-3">
          <button type="submit" class="btn btn-primary"> Buscar persona </button>
        </div>

        {buscandoPersona && 
        <div class="col-md mt-4">
          <div class="spinner-grow text-primary spinner-grow-sm ms-0" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>

          <div class="spinner-grow text-primary spinner-grow-sm ms-2" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>

          <div class="spinner-grow text-primary spinner-grow-sm ms-2" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
        }
      </div>
    </form>
  )

}

export default Buscar_Persona;