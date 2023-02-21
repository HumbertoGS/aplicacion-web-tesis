import { useState } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Badge from "react-bootstrap/Badge";

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
      total: (Number(producto.precio) * Number(cantidad)).toFixed(2),
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
            {producto.newProducto ? (
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
            ) : (
              <></>
            )}
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
                  <label style={{ fontSize: "15px" }}>
                    <b>{producto.nombre ?? producto.nombre_categoria}</b>
                  </label>
                  <label className="pt-1" style={{ fontSize: "13px" }}>
                    {producto.talla ? "Talla: " + producto.talla : "-"}
                  </label>
                </div>
                <label style={{ fontSize: "16px", paddingLeft: "9px" }}>
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
