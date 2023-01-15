import { useState } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import { FaCartPlus } from "react-icons/fa";

import ModalCatalogo from "./ModalCatalogo";
import "../designer/theme.css";

const ProductoImagen = (props) => {
  const producto = props.producto;
  const [cantidad, setCantidad] = useState(0);
  const [modalShow, setModalShow] = useState(false);
  const [datos, setDatos] = useState([]);

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
                  placeholder={cantidad}
                  value={cantidad == 0 ? "" : cantidad}
                />
              </InputGroup>
            </div>

            <Button
              variant="dark"
              disabled={cantidad == 0}
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
