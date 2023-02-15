import { useState } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";

import { PostData } from "../../../custom-hooks/useFetch";

const url = `${process.env.REACT_APP_API_CORE_URL}persona/buscar`;

const styleInput = {
  titulo: { borderTopRightRadius: "0%", borderBottomRightRadius: "0%" },
  text: {
    cursor: "no-drop",
    opacity: "85%",
    background: "#fff",
    borderTopLeftRadius: "0%",
    borderBottomLeftRadius: "0%",
  },
};

const capitalize = (text) => {
  const map = {
    cedula: "cédula",
    direccion: "dirección",
    telefono: "teléfono",
  };

  text = map[text] || text;
  return text.charAt(0).toUpperCase() + text.slice(1);
};

const renderInput = (row, item, i) => {
  return (
    <div size="sm" className="mb-3 d-flex" key={i}>
      <InputGroup.Text style={styleInput.titulo} className="w-25">
        {capitalize(row)}
      </InputGroup.Text>
      <InputGroup.Text className="w-75" style={styleInput.text}>
        {item?.[row]}
      </InputGroup.Text>
    </div>
  );
};

const ClienteDetalles = (props) => {
  const { data: numIdent, ...modalProps } = props;

  const [datosPersona, setDatosPersona] = useState(null);
  const [buscar, setBuscar] = useState(true);

  PostData(url, { numIdent }, buscar, (result) => {
    if (result?.datos?.[0]) {
      let data = { ...result.datos[0] };
      delete data.id;
      delete data.id_rol;
      // data.cliente = `${data?.apellido}  ${data?.nombre}`;
      setDatosPersona([data]);
    }
    setBuscar(false);
  });

  return (
    <Modal {...modalProps} centered>
      <Modal.Header closeButton>
        <Modal.Title
          id="contained-modal-title-vcenter"
          style={{ fontSize: "17px" }}
        >
          Detalles del Cliente
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ fontSize: "15px" }}>
        {datosPersona && (
          <div>
            {datosPersona.map((item, index) => {
              return (
                <div size="sm" className="px-3" key={index}>
                  {Object.keys(item).map((row, i) => renderInput(row, item, i))}
                </div>
              );
            })}
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="outline-secondary"
          className="w-25"
          onClick={props.onHide}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ClienteDetalles;
