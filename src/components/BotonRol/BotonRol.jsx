import { useAuth0 } from '@auth0/auth0-react';
import jwt_decode from 'jwt-decode';
function BotonRol() {
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

    // Acceder al token de acceso 
    const getRole = async () => {
        if (isAuthenticated) {
            try {
                // Obtener el token de acceso 
                const token = await getAccessTokenSilently();

                // Decodificar el token (ten en cuenta que necesitas una biblioteca para decodificar JWT, como jsonwebtoken) 
                const decodedToken = jwt_decode(token);

                // Acceder al claim personalizado (en este ejemplo, el claim es 'https://miaplicacion.com/claims/role') 
                const role = decodedToken['https://backendhospital.com/claims/role'];

                console.log('Rol:', role);
            } catch (error) {
                console.error('Error al obtener el token de acceso:', error);
            }
        }
    }

    return (
        <div>
            {/* Tu componente y contenido aquí */}
            <button onClick={getRole}>Obtener Rol</button>
        </div>
    );
}