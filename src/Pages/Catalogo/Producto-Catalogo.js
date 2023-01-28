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
      total: Number(producto.precio) * Number(cantidad),
    };
    setCantidad(0);
    props.datosCarrito(Carrito);
  };

  return (
    <>
      <Col>
        <Card style={{ width: "18rem", height: "24rem" }}>
          <Card className="Card">
            <Card.Img
              variant="top"
              src={producto.imagen}
              style={{ height: "200px" }}
              onClick={() => {
                setDatos(producto);
                setModalShow(true);
              }}
            />
          </Card>
          <Card.Body>
            <Card.Title>
              {/* {producto.producto} */}
              <div
                className="d-flex"
                style={{ justifyContent: "space-around", height: "35px" }}
              >
                <div
                  className="d-flex"
                  style={{
                    justifyContent: "space-around",
                    flexDirection: "column",
                  }}
                >
                  <label>
                    <b>{producto.nombre ?? producto.nombre_categoria}</b>
                  </label>
                  <label className="pt-1" style={{ fontSize: "13px" }}>
                    {producto.talla ? "Talla: " + producto.talla : "-"}
                  </label>
                </div>
                <label style={{ fontSize: "16px" }}>
                  <b>${producto.precio}</b>
                </label>
              </div>
              <hr />
            </Card.Title>
            <div>
              <div className="d-flex justify-content-center">
                <InputGroup style={{ width: "140px" }}>
                  <Form.Control
                    onChange={(event) => {
                      if (event.target.value > 0)
                        setCantidad(event.target.value);
                      else setCantidad("");
                    }}
                    placeholder={cantidad}
                    value={cantidad == 0 ? "" : cantidad}
                    maxLength={4}
                  />
                  <Button
                    variant="dark"
                    disabled={cantidad == 0}
                    style={{
                      width: "70px",
                    }}
                    onClick={addCar}
                  >
                    <FaCartPlus />
                  </Button>
                </InputGroup>
              </div>
            </div>

            {/* <div>
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
            </div> */}

            {/* <Card className="py-1 Card">
              <div
                className="d-flex"
                style={{ justifyContent: "space-around", alignItems: "column" }}
              >
                <label>
                  <b>Precio</b>
                </label>
                <label>
                  <b>Talla</b>
                </label>
              </div>
              <div
                className="d-flex"
                style={{ justifyContent: "space-around" }}
              >
                <label>${producto.precio_unidad}</label>
                <label>{producto.talla}</label>
              </div>
              <div
                className="d-flex pb-2"
                style={{ justifyContent: "space-around", alignItems: "center" }}
              >
                <label style={{ fontSize: "13px" }}>
                  <b>Cantidad:</b>
                </label>
                <Form.Control
                  style={{ width: "70px" }}
                  onChange={(event) => {
                    if (event.target.value > 0) setCantidad(event.target.value);
                    else setCantidad("");
                  }}
                  placeholder={cantidad}
                  value={cantidad == 0 ? "" : cantidad}
                  maxLength={4}
                />
              </div>
            </Card> 

            <Button
              variant="dark"
              disabled={cantidad == 0}
              style={{
                width: "100px",
              }}
              onClick={addCar}
            >
              <FaCartPlus />
            </Button>*/}
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
