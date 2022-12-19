import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import "./designer/theme.css";

function BasicExample() {
  return (
    <>
      <div className="form-login">
        <Container>
          <Row>
            <Col className="mb-3">
              <Form.Text>
                <h5>Inicio de Sesión</h5>
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
                    Usuario:
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control type="text" placeholder="usuario" />
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formPlaintextPassword"
                >
                  <Form.Label column sm="3">
                    Contraseña:
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control type="password" placeholder="Contraseña" />
                  </Col>
                </Form.Group>
                <Button variant="primary" type="submit">
                  Iniciar Sesión
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default BasicExample;
