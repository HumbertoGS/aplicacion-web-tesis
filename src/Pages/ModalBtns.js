import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import {
  styleBtnSave,
  styleBtnCancel,
} from "../../src/Pages/designer/styleBtn";

const botons = { display: "flex", justifyContent: "space-evenly" };
const btnStandar = { width: "100px", border: "0px" };
const warn = { color: "#545454", background: "#dbdb84" };

const ModalBtns = (props) => {
  const guardar = () => {
    console.log(props.detalles);
    props.onHide();
  };

  return (
    <Modal show={props.show} centered>
      <Modal.Header style={warn}>
        <h5>ADVERTENCIA</h5>
      </Modal.Header>
      <Modal.Body style={{ ...warn, background: "#ddddaf" }}>
        <h5 className="mb-4 text-center">{props.detalles.titulo}</h5>
        <div style={botons} className="m-3">
          <Button style={{ ...btnStandar, ...styleBtnSave }} onClick={guardar}>
            ACEPTAR
          </Button>
          <Button
            style={{ ...btnStandar, ...styleBtnCancel }}
            onClick={props.onHide}
          >
            CANCELAR
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModalBtns;
