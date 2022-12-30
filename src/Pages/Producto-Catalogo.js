import Container from "react-bootstrap/Container";
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

const ProductoImagen = (props) => {
  const producto = props.producto;
  const [cantidad, setCantidad] = useState(0);

  const addCar = () => {
    let Carrito = {
      ...producto,
      cantidad: cantidad,
      total: producto.precio_unidad * cantidad,
    };

    props.datosCarrito(Carrito);
  };

  return (
    <>
      <Row>
        <Col className="mb-3">
          <Form>
            <Form.Group
              as={Row}
              className="mb-3"
              // controlId="formPlaintextInput1"
            >
              <Navbar bg="secondary" variant="dark">
                <Container className="me-auto">
                  <Navbar.Brand>{producto.producto}</Navbar.Brand>
                  <Navbar.Brand>Valor:</Navbar.Brand>
                  <fieldset disabled>
                    <Form.Control
                      id="disabledTextInput"
                      placeholder={producto.precio_unidad}
                      htmlSize="12"
                      style={{
                        width: "80px",
                      }}
                    />
                  </fieldset>

                  <Navbar.Brand>Cantidad: </Navbar.Brand>

                  <input
                    type="number"
                    style={{
                      width: "80px",
                    }}
                    onChange={(event) => {
                      setCantidad(event.target.value);
                    }}
                  ></input>
                </Container>

                <Nav className="me-auto">
                  <Button
                    variant="dark"
                    style={{
                      width: "80px",
                    }}
                    onClick={addCar}
                  >
                    <FaCartPlus />
                  </Button>
                </Nav>
              </Navbar>

              <Figure>
                <Figure.Image
                  width={800}
                  alt="Imagen de muestra"
                  src={producto.imagen}
                />
              </Figure>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default ProductoImagen;
