import Alert from "react-bootstrap/Alert";
import "../designer/theme.css";

//------ tipo mensaje ------
// 'info',  //Para informacion
// 'success',  //Para todo nice
// 'danger',   //Para error
// 'warning',  //Para advertencias

const MensajeAlert = ({ variant, mensaje }) => (
  <div className="Mensaje">
    <Alert variant={variant} className="Alert">
      {mensaje}
    </Alert>
  </div>
);

export default MensajeAlert;
