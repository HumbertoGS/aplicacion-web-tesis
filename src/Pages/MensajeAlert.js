import Alert from "react-bootstrap/Alert";
import "./designer/theme.css";

//------ tipo mensaje ------
// 'info',  //Para informacion
// 'success',  //Para todo nice
// 'danger',   //Para error
// 'warning',  //Para advertencias

const MensajeAlert = (props) => {
  const variant = props.variant;
  const mensaje = props.mensaje;

  return (
    <>
      <div
        className="Mensaje"
        // style={{
        //   position: "absolute",
        //   zIndex: "2000",
        //   width: "calc(100% - 30px)",
        //   display: "flex",
        //   justifyContent: "center",
        // }}
      >
        <Alert
          variant={variant}
          className="Alert"
          // style={{ display: "flex", justifyContent: "center", width: "500px" }}
        >
          {mensaje}
        </Alert>
      </div>
    </>
  );
};

export default MensajeAlert;
