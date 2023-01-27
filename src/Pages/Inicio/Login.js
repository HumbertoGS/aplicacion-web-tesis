import { useState } from "react";

import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { Formik } from "formik";
import { Link } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

import "../designer/theme.css";
import MensajeAlert from "../components/MensajeAlert";

import { PostData } from "../../custom-hooks/useFetch.js";

const url = process.env.REACT_APP_API_CORE_URL + "inicio/login";

export default function Login() {
  const [mensaje, setMensaje] = useState("");
  const [variant, setVariant] = useState("");

  const [datos, setDatos] = useState(null);
  const [validar, setValidar] = useState(false);

  const iniciarSesion = (datos) => {
    setDatos(datos);
    setValidar(true);
  };

  const comprobarInicio = (respuesta) => {
    setValidar(false);
    if (respuesta.datos.length !== 0) {
      secureLocalStorage.setItem("user", respuesta.datos[0]);

      // localStorage.setItem("user", JSON.stringify(respuesta.datos[0]));
      window.location.href = process.env.REACT_APP_BASENAME + "Catalogo";
    } else window.location.href = process.env.REACT_APP_BASENAME + "Inicio";
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
            <Card className="p-4" style={{ width: "450px" }}>
              <Row>
                <Col className="mb-3 pt-5">
                  <Form.Text>
                    <h5>INICIO DE SESION</h5>
                  </Form.Text>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Formik
                    initialValues={{
                      num_identificacion: "",
                      pass: "",
                    }}
                    onSubmit={(values, { resetForm }) => {
                      iniciarSesion(values);
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
                          className="mb-3 mt-2"
                          controlId="formPlaintextInput1"
                        >
                          <Form.Label column sm="4" className="text-start">
                            N° Identificación:
                          </Form.Label>
                          <Col sm="8">
                            <Form.Control
                              type="text"
                              placeholder="Cédula"
                              name="num_identificacion"
                              value={values.num_identificacion}
                              onChange={handleChange}
                              maxLength={10}
                            />
                          </Col>
                        </Form.Group>
                        <Form.Group
                          as={Row}
                          className="mb-3 py-2"
                          controlId="formPlaintextPassword"
                        >
                          <Form.Label column sm="4" className="text-start">
                            Contraseña:
                          </Form.Label>
                          <Col sm="8">
                            <Form.Control
                              type="password"
                              placeholder="Contraseña"
                              name="pass"
                              value={values.pass}
                              onChange={handleChange}
                            />
                          </Col>
                        </Form.Group>
                        <Button
                          variant="primary"
                          type="submit"
                          className="w-100"
                          // href="/"
                          disabled={!(values.pass && values.num_identificacion)}
                        >
                          Iniciar Sesión
                        </Button>
                      </Form>
                    )}
                  </Formik>
                </Col>
              </Row>
              <Row>
                <Col className="mt-3">
                  <Form.Text style={{ color: "#1167e5" }}>
                    No tienes cuenta!? <Link to="/Registrar">Registrar</Link>
                  </Form.Text>
                </Col>
              </Row>
            </Card>
            <Card className="Card">
              <Card.Img variant="align-center" src="logo512.png" width={350} />
            </Card>
          </div>
        </div>
      </Card>
    </>
  );
}
