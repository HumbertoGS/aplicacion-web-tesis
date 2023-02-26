import { useState } from "react";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

import { FaCartPlus } from "react-icons/fa";

import "../designer/theme.css";
import ZoomImage from "./ZoomImage";

const ModalCatalogo = (props) => {
  const producto = props.producto;
  const [cantidad, setCantidad] = useState(0);

  const addCar = () => {
    let Carrito = {
      ...producto,
      cantidad: cantidad,
      total: producto.precio * cantidad,
    };
    setCantidad(0);
    props.datosCarrito(Carrito);
    props.onHide();
  };

  return (
    <>
      <Modal show={props.show} onHide={props.onHide} centered size="lg">
        <div>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              {producto.nombre_categoria}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Card className="Card flex-row">
              <Row>
                <Col md={7}>
                  <div
                    className="CardImagen px-2"
                    style={{
                      width: "450px",
                      height: "400px",
                    }}
                  >
                    <ZoomImage src={producto.imagen} width={450} height={400} />
                  </div>
                </Col>
                <Col md={5}>
                  <Card.Body className="bg-white">
                    <div className="px-2">
                      <Card.Title>
                        {producto?.nombre}
                        <hr />
                      </Card.Title>
                      <div>
                        <InputGroup className="mb-3">
                          <InputGroup.Text className="w-50">
                            Precio
                          </InputGroup.Text>
                          <Form.Control
                            disabled
                            defaultValue={"$" + producto.precio}
                          />
                        </InputGroup>

                        <InputGroup className="mb-3">
                          <InputGroup.Text className="w-50">
                            Talla
                          </InputGroup.Text>
                          <Form.Control
                            disabled
                            defaultValue={producto.talla}
                          />
                        </InputGroup>

                        <InputGroup className="mb-3">
                          <InputGroup.Text className="w-50">
                            Disponible
                          </InputGroup.Text>
                          <Form.Control
                            disabled
                            defaultValue={producto.cantidad}
                          />
                        </InputGroup>

                        <InputGroup className="mb-3">
                          <InputGroup.Text className="w-50">
                            Cantidad
                          </InputGroup.Text>
                          <Form.Control
                            autoComplete="off"
                            onChange={(event) => {
                              if (event.target.value > producto.cantidad)
                                setCantidad(producto.cantidad);
                              else if (event.target.value <= 0) setCantidad(0);
                              else setCantidad(event.target.value);
                            }}
                            placeholder={cantidad}
                            value={cantidad === 0 ? "" : cantidad}
                          />
                        </InputGroup>
                      </div>
                      <Button
                        variant="dark"
                        disabled={cantidad === 0}
                        className="w-100"
                        onClick={addCar}
                      >
                        <FaCartPlus />
                      </Button>
                      <div className="py-3">
                        <InputGroup className="mb-3">
                          <InputGroup.Text
                            className="w-100"
                            style={{ borderRadius: "0px" }}
                          >
                            Descripcion
                          </InputGroup.Text>
                          <Form.Control
                            style={{ border: "0px" }}
                            disabled
                            className="bg-white text-center pt-3"
                            defaultValue={producto.descripcion}
                          />
                        </InputGroup>
                      </div>
                    </div>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Modal.Body>
        </div>
      </Modal>
    </>
  );
};

export default ModalCatalogo;
