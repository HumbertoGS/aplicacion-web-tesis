import { useState } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/esm/Row";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Badge from "react-bootstrap/Badge";

import { FaCartPlus } from "react-icons/fa";

import validaciones from "../components/Validaciones";
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
      total: (Number(producto.precio) * Number(cantidad)).toFixed(2),
    };
    setCantidad(0);
    props.datosCarrito(Carrito);
  };

  return (
    <>
      <Col>
        <Card style={{ minHeight: "25rem" /*maxHeight: "21.5rem"*/ }}>
          <Card className="Card" style={{ height: "15rem" }}>
            <Card.Img
              variant="top"
              src={producto.imagen}
              alt=""
              style={{ height: "210px", borderBottom: "1px solid #c3c3c3" }}
              onClick={() => {
                setDatos(producto);
                setModalShow(true);
              }}
            />
            {producto.newProducto && (
              <Badge
                bg={"#ecf030"}
                className="w-25"
                style={{
                  background: "#ecf030",
                  color: "#000",
                  position: "absolute",
                }}
              >
                New
              </Badge>
            )}
          </Card>
          <Card.Body
            style={{ minHeight: "11rem", position: "relative" }}
            className="d-flex flex-column justify-content-between"
          >
            <Card.Title>
              <Row className="justify-content-center">
                <div
                  className="d-flex"
                  style={{
                    justifyContent: "space-around",
                    flexDirection: "column",
                  }}
                >
                  <label className="fw-bold" style={{ fontSize: "15px" }}>
                    {producto?.nombre}
                  </label>
                  <label className="pt-1" style={{ fontSize: "13px" }}>
                    Disponible: {producto.cantidad}
                  </label>
                </div>
                <Row>
                  <label className="pt-2" style={{ fontSize: "15px" }}>
                    ${producto?.precio}
                  </label>
                </Row>
              </Row>
              <hr
                className="mx-3 detalleCatalogo"
                style={{
                  bottom: "53px",
                }}
              />
            </Card.Title>

            <div
              className="detalleCatalogo d-flex justify-content-center"
              style={{
                bottom: "10px",
              }}
            >
              <InputGroup style={{ width: "140px" }}>
                <Form.Control
                  onChange={(event) => {
                    if (event.target.value > producto.cantidad)
                      setCantidad(producto.cantidad);
                    else setCantidad(event.target.value);
                  }}
                  onKeyDown={(e) => {
                    validaciones.onlyNumber(e);
                  }}
                  placeholder={cantidad}
                  value={cantidad === 0 ? "" : cantidad}
                  maxLength={4}
                />
                <Button
                  variant="dark"
                  disabled={cantidad === 0 || cantidad === ""}
                  style={{
                    width: "70px",
                  }}
                  onClick={addCar}
                >
                  <FaCartPlus />
                </Button>
              </InputGroup>
            </div>
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
