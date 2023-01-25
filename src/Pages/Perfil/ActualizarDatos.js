import { useState } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import InputGroup from "react-bootstrap/InputGroup";

import { Link } from "react-router-dom";

import { Formik } from "formik";

import "../designer/theme.css";
import { PostData } from "../../custom-hooks/useFetch";
import {
  BtnCambiarEstado,
  BtnGuardarDatos,
} from "../../custom-hooks/BtnAccion";

import HeaderPerfil from "./HeaderPerfil";

const url = process.env.REACT_APP_API_CORE_URL + "persona/buscar";

const ActualizarDatos = ({ user, usuario }) => {
  const [validar, setValidar] = useState(true);
  const [datos, setDatos] = useState({
    cedula: "",
    nombre: "",
    apellido: "",
    direccion: "",
    referencia: "",
    telefono: "",
    correo: "",
  });

  PostData(url, { numIdent: usuario.cedula }, validar, (x) => {
    console.log(x.datos);
    setDatos(x.datos[0]);
    setValidar(false);
  });

  return (
    <>
      <Card body style={{ height: "80vh" }} className="Card">
        <HeaderPerfil user={user} usuario={usuario} />
        <div className="py-3" style={{ height: "70vh" }}>
          <Card className="Card px-4">
            <Row>
              <Col className="my-3" xs={6}>
                <Formik
                  enableReinitialize={true}
                  initialValues={datos}
                  onSubmit={(values, { resetForm }) => {
                    // iniciarSesion(values);
                    console.log(values);
                    resetForm();
                  }}
                >
                  {({
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    values,
                    touched,
                    isValid,
                    errors,
                  }) => (
                    <Form className="px-4" noValidate onSubmit={handleSubmit}>
                      <Form.Text>
                        <h6>Datos del Perfil</h6>
                        <hr />
                      </Form.Text>
                      <InputGroup className="mb-3">
                        <InputGroup.Text style={{ width: "170px" }}>
                          Cédula:
                        </InputGroup.Text>
                        <Form.Control
                          disabled="true"
                          name="cedula"
                          value={values.cedula}
                          onChange={handleChange}
                          maxLength={10}
                        />
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroup.Text style={{ width: "170px" }}>
                          Nombres:
                        </InputGroup.Text>
                        <Form.Control
                          name="nombre"
                          value={values.nombre}
                          onChange={handleChange}
                        />
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroup.Text style={{ width: "170px" }}>
                          Apellidos:
                        </InputGroup.Text>
                        <Form.Control
                          name="apellido"
                          value={values.apellido}
                          onChange={handleChange}
                        />
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
                          name="direccion"
                          value={values.direccion}
                          onChange={handleChange}
                        />
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroup.Text style={{ width: "170px" }}>
                          Referencia:
                        </InputGroup.Text>
                        <Form.Control
                          name="referencia"
                          value={values.referencia}
                          onChange={handleChange}
                        />
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroup.Text style={{ width: "170px" }}>
                          Telefono:
                        </InputGroup.Text>
                        <Form.Control
                          name="telefono"
                          value={values.telefono}
                          onChange={handleChange}
                        />
                      </InputGroup>
                      <Button
                        className="w-100"
                        type="submit"
                        variant="outline-secondary"
                      >
                        Actualizar Datos
                      </Button>
                    </Form>
                  )}
                </Formik>
              </Col>
            </Row>
          </Card>
        </div>
      </Card>
    </>
  );
};

export default ActualizarDatos;
