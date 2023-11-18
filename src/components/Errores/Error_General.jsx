import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

const Error_General = ({ errors }) => {

  return (
      errors.length > 0 && 
      <Alert variant="danger" dismissible>
        <Alert.Heading>Error al procesar la transaccion</Alert.Heading>
        <ul>
          {errors.map((error) => (
            <li> {error} </li>
          ))}
        </ul>
      </Alert>
  );
}

export default Error_General;