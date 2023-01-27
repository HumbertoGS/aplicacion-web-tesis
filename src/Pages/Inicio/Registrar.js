import { useState } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";

import { Formik } from "formik";
import { Link } from "react-router-dom";

import "../designer/theme.css";
import MensajeAlert from "../components/MensajeAlert";

import { PostData } from "../../custom-hooks/useFetch.js";

const url = process.env.REACT_APP_API_CORE_URL + "inicio/registro";

const Registrar = () => {
  const [datos, setDatos] = useState(null);
  const [validar, setValidar] = useState(false);

  const [mensaje, setMensaje] = useState("");
  const [variant, setVariant] = useState("");

  const registrarse = (datos) => {
    setDatos(datos);
    setValidar(true);
  };

  const comprobarInicio = (respuesta) => {
    let variant = "";

    setValidar(false);
    if (respuesta.datos.length !== 0) {
      localStorage.setItem("user", JSON.stringify(respuesta.datos[0]));
      variant = "success";
    } else variant = "danger";

    setVariant(variant);
    setMensaje(respuesta.mensaje);

    if (respuesta.datos.length !== 0) {
      setTimeout(function () {
        window.location.href = process.env.REACT_APP_BASENAME + "Catalogo";
      }, 3000);
    }
  };

  PostData(url, datos, validar, comprobarInicio);

  return (
    <>
      <Card body className="Card">
        <Link to="/Inicio" className="btnVolver">
          <Button variant="outline-secondary">Volver</Button>
        </Link>
        {variant ? <MensajeAlert variant={variant} mensaje={mensaje} /> : <></>}
        <div className="form-padre">
          <div className="d-flex" style={{ width: "90%" }}>
            <Card className="Card">
              <Card.Img variant="align-center" src="logo512.png" width={350} />
            </Card>
            <Card className="p-4" style={{ width: "450px" }}>
              <Row>
                <Col className="mb-3 pt-4">
                  <Form.Text>
                    <h5 className="text-center">REGISTRATE</h5>
                  </Form.Text>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Formik
                    initialValues={{
                      cedula: "",
                      nombre: "",
                      apellido: "",
                      contrasena: "",
                    }}
                    onSubmit={(values, { resetForm }) => {
                      registrarse(values);
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
                        <Form.Group
                          as={Row}
                          className="mb-3"
                          controlId="formPlaintextInput1"
                        >
                          <Form.Label column sm="4" className="text-start">
                            N° Identificación:
                          </Form.Label>
                          <Col sm="8">
                            <Form.Control
                              type="text"
                              placeholder="Cedula"
                              name="cedula"
                              value={values.cedula}
                              onChange={handleChange}
                              maxLength={10}
                            />
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
                              placeholder="Nombres"
                              name="nombre"
                              value={values.nombre}
                              onChange={handleChange}
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
                              placeholder="Apellidos..."
                              name="apellido"
                              value={values.apellido}
                              onChange={handleChange}
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
                              placeholder="Contraseña..."
                              name="contrasena"
                              value={values.contrasena}
                              onChange={handleChange}
                            />
                          </Col>
                        </Form.Group>
                        <Button
                          variant="primary"
                          type="submit"
                          className="w-100"
                          disabled={
                            !(
                              values.apellido &&
                              values.cedula &&
                              values.nombre &&
                              values.contrasena
                            )
                          }
                          // href="/"
                        >
                          Guardar datos
                        </Button>
                      </Form>
                    )}
                  </Formik>
                </Col>
              </Row>
              <Row>
                <Col className="mt-3 px-4">
                  <Form.Text>
                    {/* Todos los datos requeridos son para la compra del carrito 
                    <br />*/}
                    Ya soy cliente <Link to="/Ingresar">iniciar sesión</Link>
                  </Form.Text>
                </Col>
              </Row>
            </Card>
          </div>
        </div>
      </Card>
    </>
  );
};

export default Registrar;
