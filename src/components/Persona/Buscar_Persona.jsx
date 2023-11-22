import React, { useEffect } from 'react';
import {buscarIdPersona, buscarDatosPersona } from '../../funcionesJS/funciones_persona.js';
import { buscarDatosHistoriaClinica } from '../../funcionesJS/funciones_historia_clinica.js';

const Buscar_Persona = ({ state }) => {
  const {
    setId,
    tipoDocumento, 
    setTipoDocumento, 
    documento, 
    setDocumento,
    apellido,
    setApellido,
    sexo,
    setSexo,
    setErrors,
    persona,
    setPersona,
    setBuscandoPersona,
    setHistoriaClinica
  } = state;


  let handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setPersona("")
      setHistoriaClinica("")
      setErrors([])

      setBuscandoPersona(true);
      
      const idPersona = await buscarIdPersona(tipoDocumento, documento, apellido, sexo);
      setId(idPersona);
      const personaEncontrada = await buscarDatosPersona(idPersona);
      setPersona(personaEncontrada)
    } catch (err) {
      setErrors([err.message])
      setPersona("")
      setId("")
    }

    setTimeout(() => {
      setBuscandoPersona(false);
    }, 3000); // 3000 milisegundos (3 segundos)
  }

  useEffect(() => {
    if (!persona){
    setId("")
      return;
    }
    
    const fetchHistoriaClinica = async () => {
      try {
          const historia_clinica = await buscarDatosHistoriaClinica(persona.historia_clinica)
        setHistoriaClinica(historia_clinica)
      } catch (err) {
        setErrors([err.message])
      }
    };
  
    fetchHistoriaClinica();
  }, [persona]); 

  return(
    <form  onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-6"> 
          <div className="form-floating">
            <select className="form-select" id="tipoDocumento" aria-label="Floating label select example" onChange={(e) => setTipoDocumento(e.target.value)} required>
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
            <input type="number" className="form-control" id="documento" onChange={(e) => setDocumento(e.target.value)} required/>
            <label htmlFor="documento">Número de documento</label>
          </div>
        </div>
      </div>
      
      <div className="row">
        <div className="col-md-6">
          <div className="form-floating mb-3">
            <input type="text" className="form-control" id="apellido" onChange={(e) => setApellido(e.target.value)} required/>
            <label htmlFor="apellido"> Apellido </label>
          </div>
        </div>

        <div className="col-md-auto">
          <p className="mb-1"> Sexo: </p>
          
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="sexo" id="sexoFemenino" value="F" onChange={(e) => setSexo(e.target.value)} required />
            <label className="form-check-label" htmlFor="sexoFemenino">
              Femenino
            </label>
          </div>

          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="sexo" id="sexoMasculino" value="M" onChange={(e) => setSexo(e.target.value)} required />
            <label className="form-check-label" htmlFor="sexoMasculino">
              Masculino
            </label>
          </div>

          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="sexo" id="sexoNoBinario" value="X" onChange={(e) => setSexo(e.target.value)} required />
            <label className="form-check-label" htmlFor="sexoNoBinario">
              No binario
            </label>
          </div>
        </div>

        <div className="col-md mt-3 text-md-end text-center">
          <button type="submit" className="btn btn-primary"> Buscar </button>
        </div>

      </div>
    </form>
  )

}

export default Buscar_Persona;