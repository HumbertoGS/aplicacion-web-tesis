import React from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Figure from "react-bootstrap/Figure";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./designer/theme.css";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FaAddressCard, FaCartPlus } from "react-icons/fa";
import Catalogo from "./Catalogo";
import { useState } from "react";
import { InputGroup } from "react-bootstrap";

import Modal from "react-bootstrap/Modal";

const ModalCatalogo = (props) => {
  const producto = props.producto;
  const [cantidad, setCantidad] = useState(0);

  const addCar = () => {
    let Carrito = {
      ...producto,
      cantidad: cantidad,
      total: producto.precio_unidad * cantidad,
    };
    setCantidad(0);
    props.datosCarrito(Carrito);
  };

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card style={{ width: "19rem", flexDirection: "row" }}>
          <Card.Img variant="top" src={producto.imagen} />
          <Card.Body>
            <div
              style={{
                width: "200px",
              }}
              className="px-3"
            >
              <Card.Title>
                {producto.producto}
                <hr />
              </Card.Title>
              <div>
                <InputGroup className="mb-3">
                  <InputGroup.Text className="w-50">Valor</InputGroup.Text>
                  <Form.Control
                    disabled
                    defaultValue={"$" + producto.precio_unidad}
                  />
                </InputGroup>

                <InputGroup className="mb-3">
                  <InputGroup.Text className="w-50">Talla</InputGroup.Text>
                  <Form.Control disabled defaultValue={producto.talla} />
                </InputGroup>

                <InputGroup className="mb-3">
                  <InputGroup.Text className="w-50">Cantidad</InputGroup.Text>
                  <Form.Control
                    onChange={(event) => {
                      setCantidad(event.target.value);
                    }}
                    placeholder={cantidad}
                    value={cantidad == 0 ? "" : cantidad}
                  />
                </InputGroup>
              </div>
              <Button
                variant="dark"
                disabled={cantidad == 0}
                style={{
                  width: "100%",
                }}
                onClick={addCar}
              >
                <FaCartPlus />
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
    </Modal>
  );
};

export default ModalCatalogo;
