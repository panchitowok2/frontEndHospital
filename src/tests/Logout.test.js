import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import { useAuth0 } from "@auth0/auth0-react";

jest.mock("@auth0/auth0-react");

describe("El usuario ya está logueado", () => {
  beforeEach(() => {
    useAuth0.mockReturnValue({
      isAuthenticated: true,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Verificar que exista el boton cerrar sesion', async () => {

    render(<App />);

    const logoutElements = screen.queryAllByText("Cerrar sesión");
    expect(logoutElements[0]).toBeInTheDocument();
  });
  
});