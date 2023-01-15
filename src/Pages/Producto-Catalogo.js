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
import ModalCatalogo from "./ModalCatalogo";

const ProductoImagen = (props) => {
  const producto = props.producto;
  const [cantidad, setCantidad] = useState(0);
  const [modalShow, setModalShow] = React.useState(false);
  const [datos, setDatos] = React.useState([]);

  const addCar = () => {
    let Carrito = {
      ...producto,
      cantidad: cantidad,
      total: producto.precio_unidad * cantidad,
    };
    console.log(Carrito);
    props.datosCarrito(Carrito);
  };

  const ref = React.useRef(null);

  return (
    <>
      <Col>
        <Card style={{ width: "18rem" }}>
          <Card.Img
            variant="top"
            src={producto.imagen}
            onClick={() => {
              setDatos(producto);
              setModalShow(true);
            }}
          />
          <Card.Body>
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
                />
              </InputGroup>
            </div>

            <Button
              variant="dark"
              style={{
                width: "100px",
              }}
              onClick={addCar}
            >
              <FaCartPlus />
            </Button>
          </Card.Body>
        </Card>
      </Col>
      {modalShow ? (
        <ModalCatalogo
          producto={datos}
          datosCarrito={props.datosCarrito}
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default ProductoImagen;
