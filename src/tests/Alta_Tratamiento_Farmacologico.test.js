import { server } from 'msw/node';
import { render, screen, fireEvent } from '@testing-library/react';
import Formulario_Alta_Tratamiento_Farmacologico from '../components/Formulario_Alta_Tratamiento_Farmacologico/Formulario_Alta_Tratamiento_Farmacologico';
import { useAuth0 } from "@auth0/auth0-react";

jest.mock("@auth0/auth0-react");

beforeAll(() => server.listen());
afterAll(() => server.close());
beforeEach(() => {
  useAuth0.mockReturnValue({
    isAuthenticated: true,
  });
});

afterEach(() => {
  jest.clearAllMocks();
  server.resetHandlers()
});
describe("Componente alta tratamiento farmacológico", () => {
  
  test('Testeamos las funcionalidades del componente', async () => {

    render(<Formulario_Alta_Tratamiento_Farmacologico />);

    // Seleccionamos el tipo de documento
    const selectorTipoDoc = screen.getByTestId('select-tipodoc');
    expect(selectorTipoDoc).toBeInTheDocument();
    expect(selectorTipoDoc?.tagName).toBe('SELECT');
    fireEvent.change(selectorTipoDoc, { target: { value: 'DNI' } })
    let options = screen.getAllByTestId('select-option')
    expect(options[0].selected).toBeFalsy();
    expect(options[1].selected).toBeTruthy();
    expect(options[2].selected).toBeFalsy();
    expect(options[3].selected).toBeFalsy();

    //seleccionamos el numero de documento
    const inputNumeroDoc = screen.getByTestId('input-numdoc')
    expect(inputNumeroDoc?.tagName).toBe('INPUT')
    fireEvent.change(inputNumeroDoc, { target: { value: 39650255 } })

    //seleccionamos apelllido
    const inputApellido = screen.getByLabelText(/apellido/i)
    expect(inputApellido?.tagName).toBe('INPUT')
    fireEvent.change(inputApellido, { target: { value: 'Fabi' } })

    //seleccionamos el sexo
    const inputSexo = screen.getByLabelText(/masculino/i)
    expect(inputSexo?.tagName).toBe('INPUT')
    fireEvent.click(inputSexo)
    expect(inputSexo).toBeChecked()

    //buscamos la persona
    const botonBuscar = screen.getByText(/buscar/i)
    expect(botonBuscar?.tagName).toBe('BUTTON')
    fireEvent.click(botonBuscar)
    const mensajeError = screen.getByText(/error/i) 
    expect(mensajeError).toBeInTheDocument()

  });

});