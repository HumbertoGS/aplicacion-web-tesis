import { useState } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";

import { PostData } from "../../../custom-hooks/useFetch";

const url = `${process.env.REACT_APP_API_CORE_URL}persona/buscar`;

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
    <InputGroup size="sm" className="mb-3" key={i}>
      <InputGroup.Text className="w-25">{capitalize(row)}</InputGroup.Text>
      <InputGroup.Text className="w-75 bg-white noEdit">
        {item?.[row]}
      </InputGroup.Text>
    </InputGroup>
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
      setDatosPersona([data]);
    }
    setBuscar(false);
  });

  return (
    <Modal {...modalProps} centered>
      <Modal.Header closeButton>
        <Modal.Title style={{ fontSize: "15px" }}>
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
