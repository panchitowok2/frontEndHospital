import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import { useAuth0 } from "@auth0/auth0-react";

jest.mock("@auth0/auth0-react");


describe("Arranque de la aplicación", () => {
  beforeEach(() => {
    useAuth0.mockReturnValue({
      loginWithRedirect: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('La aplicacion carga', () => {
    render(<App />);
    const linkElements = screen.getAllByText(/Hospital/i);
    expect(linkElements.length).toBeGreaterThan(0);
  });

  test('Cuando inicia la App se ve el boton de Login', () => {
    render(<App />);
    const loginElements = screen.queryAllByText("Iniciar sesión");
    expect(loginElements[0]).toBeInTheDocument();
  });
  
  
  test('Al hacer click en login nos redirecciona', async () => {
    const { loginWithRedirect } = useAuth0();
  
    render(<App />);
  
    const loginElements = screen.queryAllByText("Iniciar sesión");
    const loginElement = loginElements[0];
    loginElement.click();
  
    // Expect that if we click the "Log In" button, the loginWithRedirect function gets called
    await waitFor(() => expect(loginWithRedirect).toHaveBeenCalledTimes(1));
  });
  
});