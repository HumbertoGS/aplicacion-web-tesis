import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";

import "./designer/theme.css";

const Registrar = () => {
  return (
    <>
      <div className="form-padre">
        <div className="d-flex" style={{ width: "90%" }}>
          <Card className="Card">
            <Card.Img variant="align-center" src="logo512.png" width={350} />
          </Card>
          <Card className="p-4" style={{ width: "450px" }}>
            <Row>
              <Col className="mb-3 pt-4">
                <Form.Text>
                  <h5 className="text-center">Registrate</h5>
                </Form.Text>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form className="px-4">
                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="formPlaintextInput1"
                  >
                    <Form.Label column sm="4" className="text-start">
                      N° Identificación:
                    </Form.Label>
                    <Col sm="8">
                      <Form.Control type="text" placeholder="Cedula" />
                    </Col>
                  </Form.Group>

                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="formPlaintextInput2"
                  >
                    <Form.Label column sm="4" className="text-start">
                      Nombres:
                    </Form.Label>
                    <Col sm="8">
                      <Form.Control
                        type="text"
                        autoComplete="true"
                        placeholder="Nombres"
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="formPlaintextInput3"
                  >
                    <Form.Label column sm="4" className="text-start">
                      Apellidos:
                    </Form.Label>
                    <Col sm="8">
                      <Form.Control
                        type="text"
                        autoComplete="true"
                        placeholder="Apellidos..."
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="formPlaintextInput3"
                  >
                    <Form.Label column sm="4" className="text-start">
                      Contraseña:
                    </Form.Label>
                    <Col sm="8">
                      <Form.Control
                        type="text"
                        autoComplete="true"
                        placeholder="Contraseña..."
                      />
                    </Col>
                  </Form.Group>
                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100"
                    href="/"
                  >
                    Guardar datos
                  </Button>
                </Form>
              </Col>
            </Row>
            <Row>
              <Col className="mt-3 px-4">
                <Form.Text>
                  Todos los datos requeridos son para la compra del carrito
                </Form.Text>
              </Col>
            </Row>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Registrar;
