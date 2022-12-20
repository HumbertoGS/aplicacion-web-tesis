import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import "./designer/theme.css";

const Registrar = () => {
  return (
    <>
      <div className="form-login">
        <Container>
          <Row>
            <Col className="mb-3">
              <Form.Text>
                <h5>Registro de Clientes</h5>
              </Form.Text>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formPlaintextInput1"
                >
                  <Form.Label column sm="3">
                    Cedula:
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control type="text" placeholder="Cedula" />
                  </Col>
                </Form.Group>

                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formPlaintextInput2"
                >
                  <Form.Label column sm="3">
                    Nombres:
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control type="text" autoComplete="true" placeholder="Nombres" />
                  </Col>
                </Form.Group>

                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formPlaintextInput3"
                >
                  <Form.Label column sm="3">
                    Apellidos:
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control type="text" autoComplete="true" placeholder="Apellidos..." />
                  </Col>
                </Form.Group>

                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formPlaintextInput4"
                >
                  <Form.Label column sm="3">
                    Direccion:
                  </Form.Label>
                  <Col sm="9">
                    {/* <Form.Control type="text" placeholder="usuario" /> */}
                    <Form.Control as="textarea" rows={3} />
                  </Col>
                </Form.Group>
                <Button variant="primary" type="submit">
                  Guardar datos
                </Button>
              </Form>
            </Col>
          </Row>
          <Row>
            <Col className="mt-3">
              <Form.Text>
                Todos los datos registrados son para la compra del carrito
              </Form.Text>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Registrar;
