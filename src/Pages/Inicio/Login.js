import { useState } from "react";
import secureLocalStorage from "react-secure-storage";

import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { Formik } from "formik";
import { Link } from "react-router-dom";

import "../designer/theme.css";

import { PostData } from "../../custom-hooks/useFetch.js";

const url = process.env.REACT_APP_API_CORE_URL + "inicio/login";

export default function Login() {
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
        <div className="form-padre">
          <Card className="p-4" style={{ width: "400px" }}>
            <Row>
              <Col className="mb-3 pt-5">
                <Form.Text>
                  <h5>INICIAR SESION</h5>
                  <hr />
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
                    values,
                    isValid,
                    errors,
                  }) => (
                    <Form className="px-4" noValidate onSubmit={handleSubmit}>
                      <Form.Group
                        className="mb-3 mt-2"
                        controlId="formPlaintextInput1"
                      >
                        <Col>
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
                        className="mb-3 py-2"
                        controlId="formPlaintextPassword"
                      >
                        <Col>
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
                        variant="outline-secondary"
                        type="submit"
                        className="w-50"
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
                <Form.Text>
                  No tienes cuenta!? <Link to="/Registrar">Registrate</Link>
                </Form.Text>
              </Col>
            </Row>
          </Card>
        </div>
      </Card>
    </>
  );
}
