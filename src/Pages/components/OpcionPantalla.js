import Button from "react-bootstrap/esm/Button";

const BtnCambioOpciones = ({ styleBtn, onClick, nameBtn }) => {
  return (
    <Button style={styleBtn} className="w-25 btnOpcion" onClick={onClick}>
      {nameBtn}
    </Button>
  );
};

export default BtnCambioOpciones;
