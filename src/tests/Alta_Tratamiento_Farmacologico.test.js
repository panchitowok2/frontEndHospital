import { render, screen, waitFor } from '@testing-library/react';
import Formulario_Alta_Tratamiento_Farmacologico from '../components/Formulario_Alta_Tratamiento_Farmacologico/Formulario_Alta_Tratamiento_Farmacologico';
import { useAuth0 } from "@auth0/auth0-react";

jest.mock("@auth0/auth0-react");

describe("Componente alta tratamiento farmacológico", () => {
  beforeEach(() => {
    useAuth0.mockReturnValue({
      isAuthenticated: true,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('El componente se renderiza correctamente', async () => {

    render(<Formulario_Alta_Tratamiento_Farmacologico />);

    const linkElement = screen.getByText(/Alta de Tratamiento Farmacológico/i);
    expect(linkElement).toBeInTheDocument();
  });
  
});