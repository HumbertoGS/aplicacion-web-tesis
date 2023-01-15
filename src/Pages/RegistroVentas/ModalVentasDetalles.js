import { useState } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import InputGroup from "react-bootstrap/InputGroup";

const ModalVentasDetalles = (props) => {
  const [key, setKey] = useState("Producto1");

  const detalles = props.detalles;

  return (
    <Modal
      {...props}
      // size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title
          id="contained-modal-title-vcenter"
          style={{ fontSize: "17px" }}
        >
          Detalles de pedido
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ fontSize: "15px" }}>
        {/* <p>CLIENTE: {detalles.cliente}</p> */}
        <InputGroup size="sm" className="mb-3">
          <InputGroup.Text style={{ width: "150px" }}>CLIENTE</InputGroup.Text>
          <InputGroup.Text style={{ background: "#fff", width: "300px" }}>
            {detalles.cliente}
          </InputGroup.Text>
        </InputGroup>
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3"
          // style={{ width: "1000px" }}
        >
          {detalles.detalles?.map((item, index) => {
            return (
              <Tab
                key={index}
                eventKey={"Producto" + (index + 1)}
                title={"Producto #" + (index + 1)}
              >
                <div key={index}>
                  <InputGroup size="sm" className="mb-3">
                    <InputGroup.Text style={{ width: "150px" }}>
                      Producto
                    </InputGroup.Text>
                    <InputGroup.Text
                      style={{ background: "#fff", width: "300px" }}
                    >
                      {item.producto}
                    </InputGroup.Text>
                  </InputGroup>
                  <InputGroup size="sm" className="mb-3">
                    <InputGroup.Text style={{ width: "150px" }}>
                      Precio x Unidad
                    </InputGroup.Text>
                    <InputGroup.Text
                      style={{ background: "#fff", width: "300px" }}
                    >
                      {item.precio_unidad}
                    </InputGroup.Text>
                  </InputGroup>
                  <InputGroup size="sm" className="mb-3">
                    <InputGroup.Text style={{ width: "150px" }}>
                      Cantidad
                    </InputGroup.Text>
                    <InputGroup.Text
                      style={{ background: "#fff", width: "300px" }}
                    >
                      {item.cantidad}
                    </InputGroup.Text>
                  </InputGroup>
                  <InputGroup size="sm" className="mb-3">
                    <InputGroup.Text style={{ width: "150px" }}>
                      Total
                    </InputGroup.Text>
                    <InputGroup.Text
                      style={{ background: "#fff", width: "300px" }}
                    >
                      {item.total}
                    </InputGroup.Text>
                  </InputGroup>
                </div>
              </Tab>
            );
          })}
        </Tabs>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalVentasDetalles;
