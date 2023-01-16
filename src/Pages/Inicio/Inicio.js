import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import Card from "react-bootstrap/Card";

import "../designer/theme.css";
//import "../../assets/logo-negocio.jpeg";

import { Link } from "react-router-dom";

function CardsInicio() {
  //cards para presentar admin, gerente y usuario/cliente.
  return (
    <div className="CardsInicio">
      <div className="container d-flex justify-content-center align-items-center h-100">
        <div className="row">
          <div className="col-md-4">
            <Card style={{ height: "430px" }}>
              <Card.Img variant="center" src="admin.png" />
              <Card.Body className="OneCard">
                <div className="py-2" style={{ height: "85px" }}>
                  <Card.Title>Administrador</Card.Title>
                  <Card.Text>Acceso solo para administrador</Card.Text>
                </div>
                <Button variant="outline-secondary rounded-0">Ingresar</Button>
              </Card.Body>
            </Card>
          </div>
          <div className="col-md-4">
            <Card style={{ height: "430px" }}>
              <Card.Img variant="top" src="icono-cliente.png" />
              <Card.Body className="OneCard">
                <div className="py-2" style={{ height: "85px" }}>
                  <Card.Title>Soy Cliente</Card.Title>
                  <Card.Text>Ya tengo una cuenta.</Card.Text>
                </div>
                <Button variant="outline-secondary rounded-0">
                  Iniciar sesión
                </Button>
              </Card.Body>
            </Card>
          </div>
          <div className="col-md-4">
            <Card style={{ height: "430px" }}>
              <Card.Img variant="align-center" src="icono-cliente.png" />
              <Card.Body className="OneCard">
                <div className="py-2" style={{ height: "85px" }}>
                  <Card.Title>Quiero ser Cliente</Card.Title>
                  <Card.Text>Quiero tener una cuenta y ser miembro.</Card.Text>
                </div>
                <Button variant="outline-secondary rounded-0" href="/Registrar">
                  Registrarme
                </Button>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function Iniciar() {
  return (
    <>
      <div className="form-padre">
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
            <Row>
              <Col className="mt-3">
                <Form.Text style={{ color: "#1167e5" }}>
                  Eres Cliente!?,
                  <Link to="registrar">
                    registra tus datos para realizar las compras
                  </Link>
                </Form.Text>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
}

export default CardsInicio;
