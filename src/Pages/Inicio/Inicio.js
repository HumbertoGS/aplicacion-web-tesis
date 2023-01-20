import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import Card from "react-bootstrap/Card";

import "../designer/theme.css";

import { Link } from "react-router-dom";

const CardsInicio = () => {
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
                <Button
                  variant="outline-secondary rounded-0"
                  href="/IngresarEmp"
                >
                  Ingresar
                </Button>
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
                <Button variant="outline-secondary rounded-0" href="/Ingresar">
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
};

const Iniciar = () => {
  const logout = () => {
    localStorage.removeItem("user");
    window.location.href = process.env.REACT_APP_BASENAME + "Inicio";
  };

  return (
    <>
      <div className="form-padre">
        <Container>
          <Row>
            <Col className="mb-3">
              <Form.Text>
                <h5>Bienvenido tal persona</h5>
              </Form.Text>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button onClick={logout}>Cerrar Sesión</Button>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export { CardsInicio, Iniciar };
