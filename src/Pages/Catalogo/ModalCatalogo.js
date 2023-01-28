import { useState } from "react";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import { FaCartPlus } from "react-icons/fa";

import "../designer/theme.css";

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
  };

  return (
    <>
      <Modal
        show={props.show}
        onHide={props.onHide}
        // aria-labelledby="contained-modal-title-vcenter"
        centered
        size="lg"
      >
        <div>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              {producto.nombre_categoria}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Card className="Card" style={{ flexDirection: "row" }}>
              <Card.Img
                variant="top"
                style={{
                  width: "500px",
                  height: "400px",
                }}
                src={producto.imagen}
              />
              <Card.Body>
                <div className="px-2">
                  <Card.Title>
                    {producto.nombre ?? producto.nombre_categoria}
                    <hr />
                  </Card.Title>
                  <div>
                    <InputGroup className="mb-3">
                      <InputGroup.Text className="w-50">Valor</InputGroup.Text>
                      <Form.Control
                        disabled
                        defaultValue={"$" + producto.precio}
                      />
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <InputGroup.Text className="w-50">Talla</InputGroup.Text>
                      <Form.Control disabled defaultValue={producto.talla} />
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <InputGroup.Text className="w-50">
                        Cantidad
                      </InputGroup.Text>
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
            </Card>
          </Modal.Body>
          {/* <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
        </div>
      </Modal>
    </>
  );
};

export default ModalCatalogo;
