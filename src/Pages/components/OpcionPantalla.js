import Button from "react-bootstrap/esm/Button";

const BtnCambioOpciones = ({ styleBtn, onClick, nameBtn }) => {
  return (
    <Button
      style={{ ...styleBtn, width: "15%" }}
      className="btnOpcion"
      onClick={onClick}
    >
      {nameBtn}
    </Button>
  );
};

export default BtnCambioOpciones;
