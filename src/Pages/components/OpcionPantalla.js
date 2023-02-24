import Button from "react-bootstrap/esm/Button";

const styleNoSelect = {
  border: "0px",
  marginBottom: "0px",
  background: "#ffff",
};

const styleSelect = {
  border: "1px solid #d2d8dd",
  marginBottom: "-1px",
  background: "#e9ecef",
};

const BtnCambioOpciones = ({ estado, onClick, nameBtn }) => {
  return (
    <Button
      style={estado ? styleSelect : styleNoSelect}
      className="btnOpcion"
      onClick={onClick}
    >
      {nameBtn}
    </Button>
  );
};

export default BtnCambioOpciones;
