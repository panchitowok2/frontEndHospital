import Alert from 'react-bootstrap/Alert';

const Error_General = ({ errors }) => {

  return (
      errors.length > 0 && 
      <Alert variant="danger" dismissible>
        <Alert.Heading>Error al procesar la transaccion</Alert.Heading>
        <ul>
          {errors.map((error, index) => (
            
            <li key={index}> {error} </li>
          ))}
        </ul>
      </Alert>
  );
}

export default Error_General;