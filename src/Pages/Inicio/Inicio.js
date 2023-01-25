import { useState } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import InputGroup from "react-bootstrap/InputGroup";

import { Link } from "react-router-dom";

import "../designer/theme.css";
import { ReloadData } from "../../custom-hooks/useFetch";
import {
  BtnCambiarEstado,
  BtnGuardarDatos,
} from "../../custom-hooks/BtnAccion";
import HeaderPerfil from "../Perfil/HeaderPerfil";

const CardsInicio = () => {
  //cards para presentar admin, gerente y usuario/cliente.
  return (
    <div className="CardsInicio">
      <div className="container d-flex justify-content-center align-items-center h-100">
        <div className="row">
          {/* <div className="col-md-4">
            <Card style={{ height: "430px" }}>
              <Card.Img variant="center" src="admin.png" />
              <Card.Body className="OneCard">
                <div className="py-2" style={{ height: "85px" }}>
                  <Card.Title>Administrador</Card.Title>
                  <Card.Text>Acceso solo para administrador</Card.Text>
                </div>
                <Link to="/Ingreso-Ad">
                  <Button variant="outline-secondary rounded-0 w-50">
                    Ingresar
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </div> */}
          <div className="col-md-6">
            <Card style={{ height: "400px" }}>
              <Card.Img variant="top" src="icono-cliente.png" />
              <Card.Body className="OneCard">
                <div className="pt-2" style={{ height: "50px" }}>
                  <Card.Title>Ya tengo una cuenta</Card.Title>
                  {/* <Card.Text>Ya tengo una cuenta.</Card.Text> */}
                </div>
                <Link to="/Ingresar">
                  <Button variant="outline-secondary rounded-0 w-50">
                    Iniciar sesión
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </div>
          <div className="col-md-6">
            <Card style={{ height: "400px" }}>
              <Card.Img variant="align-center" src="icono-cliente.png" />
              <Card.Body className="OneCard">
                <div className="py-2" style={{ height: "50px" }}>
                  <Card.Title>Quiero tener una cuenta</Card.Title>
                  {/* <Card.Text>Quiero tener una cuenta y ser miembro.</Card.Text> */}
                </div>
                <Link to="/Registrar">
                  <Button variant="outline-secondary rounded-0 w-50">
                    Registrarme
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

const Iniciar = ({ user, usuario }) => {
  const url = process.env.REACT_APP_API_CORE_URL + "persona";

  const [datosEmpleados, setDatosEmpleados] = useState([]);
  const [buscar, setBuscar] = useState(true);

  const logout = () => {
    localStorage.removeItem("user");
    window.location.href = process.env.REACT_APP_BASENAME + "Inicio";
  };

  ReloadData(url + "/buscarEmpleado", buscar, (x) => {
    setDatosEmpleados([x.datos[0]]);
    setBuscar(false);
  });

  return (
    <>
      <Card body style={{ height: "80vh" }} className="Card">
        <HeaderPerfil user={user} usuario={usuario} />
        {user ? (
          <div className="py-3" style={{ height: "75vh" }}>
            <Row>
              <Col className="mb-3" xs={4}>
                <div className="m-4" style={{ width: "400px" }}>
                  <Card className="Card" style={{ paddingRight: "35px" }}>
                    <Form.Text>
                      <h6>Agregar Empleado</h6>
                      <hr />
                    </Form.Text>
                    <Form className="px-3">
                      <InputGroup className="my-3">
                        <InputGroup.Text style={{ width: "100px" }}>
                          Nombres:
                        </InputGroup.Text>
                        <Form.Control />
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroup.Text style={{ width: "100px" }}>
                          Apellidos:
                        </InputGroup.Text>
                        <Form.Control />
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroup.Text style={{ width: "100px" }}>
                          Cedula:
                        </InputGroup.Text>
                        <Form.Control />
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroup.Text style={{ width: "100px" }}>
                          Contraseña:
                        </InputGroup.Text>
                        <Form.Control />
                      </InputGroup>
                      <Button className="w-100" variant="outline-secondary">
                        Registrar
                      </Button>
                    </Form>
                  </Card>
                </div>
              </Col>
              <Col className="mb-3">
                <div
                  className="p-4 mx-3"
                  style={{ overflowY: "auto", height: "300px" }}
                >
                  <Table>
                    <thead className="theadTable">
                      <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Cedula</th>
                        <th>Contraseña</th>
                        <th>Codigo</th>
                        <th>Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {datosEmpleados.map((item) => {
                        return (
                          <tr key={item.id}>
                            <td>{item.nombre}</td>
                            <td>{item.apellido}</td>
                            <td>{item.cedula}</td>
                            <td>{item.contrasena}</td>
                            <td>{item.codigo}</td>
                            <td>
                              <BtnCambiarEstado
                                item={item}
                                reload={() => {
                                  setBuscar(true);
                                }}
                                url={url}
                              />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </div>
              </Col>
            </Row>
          </div>
        ) : (
          <div className="py-3" style={{ height: "70vh" }}>
            <Card className="Card px-4">
              <Row>
                <Col className="my-3" xs={6}>
                  <Form.Text>
                    <h6>Datos del Perfil</h6>
                    <hr />
                  </Form.Text>
                  <Form className="px-4">
                    <InputGroup className="mb-3">
                      <InputGroup.Text style={{ width: "170px" }}>
                        Nombres:
                      </InputGroup.Text>
                      <Form.Control />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroup.Text style={{ width: "170px" }}>
                        Apellidos:
                      </InputGroup.Text>
                      <Form.Control />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroup.Text style={{ width: "170px" }}>
                        Numero Identificacion:
                      </InputGroup.Text>
                      <Form.Control />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroup.Text style={{ width: "170px" }}>
                        Dirección:
                      </InputGroup.Text>
                      <Form.Control
                        as="textarea"
                        aria-label="With textarea"
                        rows={3}
                        style={{ resize: "none" }}
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroup.Text style={{ width: "170px" }}>
                        Referencia:
                      </InputGroup.Text>
                      <Form.Control />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroup.Text style={{ width: "170px" }}>
                        Telefono:
                      </InputGroup.Text>
                      <Form.Control />
                    </InputGroup>
                    <Button className="w-100" variant="outline-secondary">
                      Actualizar Datos
                    </Button>
                  </Form>
                </Col>
              </Row>
            </Card>
          </div>
        )}
        {/* <Row>
          <Col>
            <Button onClick={logout}>Cerrar Sesión</Button>
          </Col>
        </Row> */}
      </Card>
    </>
  );
};

export { CardsInicio, Iniciar };
