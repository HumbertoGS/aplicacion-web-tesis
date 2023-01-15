import { useEffect } from "react";
import Alert from "react-bootstrap/Alert";

//------ tipo mensaje ------
// 'info',  //Para informacion
// 'success',  //Para todo nice
// 'danger',   //Para error
// 'warning',  //Para advertencias

const stilo = {
  position: "absolute",
  // width: "500px",
  zIndex: "2",
  // left: "200px",
  // left: "95px",
  width: "calc(100% - 500px)",
};

const MensajeAlert = (props) => {
  const variant = props.variant;
  const mensaje = props.mensaje;

  return (
    <>
      <div
        style={{
          position: "absolute",
          zIndex: "2000",
          width: "calc(100% - 30px)",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Alert
          variant={variant}
          style={{ display: "flex", justifyContent: "center", width: "500px" }}
        >
          {mensaje}
        </Alert>
      </div>
    </>
  );
};

export default MensajeAlert;
