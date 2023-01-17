import { useEffect, useState } from "react";

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Card from "react-bootstrap/Card";
import Offcanvas from "react-bootstrap/Offcanvas";
import InputGroup from "react-bootstrap/InputGroup";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";

import { MdClose } from "react-icons/md";

const MenuDespe = (props) => {
  const datosCarrito = props.datos;

  const [productSelect, setProductSelect] = useState([]);

  const eliminarProducto = () => {
    let index = datosCarrito.datos.findIndex((object) => {
      return object.id === productSelect.id;
    });
    datosCarrito.datos.splice(index, 1);
    props.guardarDatos(datosCarrito);
  };

  return (
    <>
      <Navbar bg="light" expand="lg" className="mb-3">
        <Container fluid>
          <Offcanvas
            show={props.show}
            onHide={props.handleClose}
            placement={"end"}
          >
            <Offcanvas.Header closeButton className="pb-0">
              <Offcanvas.Title style={{ width: "200px" }}>
                Tu Carrito <hr />
              </Offcanvas.Title>
            </Offcanvas.Header>

            <ListGroup variant="flush" style={{ overflowY: "auto" }}>
              {datosCarrito.datos.map((item, index) => {
                return (
                  <div key={index} className={"px-4"}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                      }}
                      className={"px-2"}
                    >
                      <Card.Img
                        variant="top"
                        src={item.imagen}
                        style={{ width: "115px", height: "115px" }}
                      />
                      <div>
                        <ListGroup.Item
                          style={{ width: "150px", border: "0px solid" }}
                        >
                          <InputGroup
                            className="mb-1"
                            style={{
                              justifyContent: "center",
                            }}
                          >
                            <h5>{item.producto.toUpperCase()}</h5>
                          </InputGroup>
                          <InputGroup className="mb-1">
                            <h6>Talla {item.talla}</h6>
                          </InputGroup>
                          <InputGroup className="mb-1">
                            <h6>${item.total}</h6>
                          </InputGroup>
                          <InputGroup className="mb-1">
                            <InputGroup.Text
                              className="w-100"
                              style={{
                                justifyContent: "center",
                              }}
                            >
                              {item.cantidad}
                            </InputGroup.Text>
                          </InputGroup>
                        </ListGroup.Item>
                      </div>
                      <div>
                        <Button
                          variant="outline"
                          style={{ height: "150px" }}
                          onClickCapture={() => setProductSelect(item)}
                          onClick={eliminarProducto}
                        >
                          <MdClose />
                        </Button>
                      </div>
                    </div>
                    <hr />
                  </div>
                );
              })}
              <div className={"p-4"}>
                <InputGroup className="mb-1">
                  <InputGroup.Text
                    className="w-50"
                    style={{ background: "#ffff", border: "0px" }}
                  >
                    <h6>Total</h6>
                  </InputGroup.Text>
                  <InputGroup.Text
                    className="w-50"
                    style={{
                      justifyContent: "end",
                      background: "#ffff",
                      border: "0px",
                      paddingRight: "20px",
                    }}
                  >
                    <h6>${datosCarrito.totales[0]?.totales}</h6>
                  </InputGroup.Text>
                </InputGroup>
                <Button
                  className="w-100"
                  variant="outline-success"
                  href="/Carrito"
                >
                  {/* <a href="/Carrito">Ir a Carrito</a> */}
                  Ir a Carrito
                </Button>
              </div>
            </ListGroup>
          </Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};

export default MenuDespe;
