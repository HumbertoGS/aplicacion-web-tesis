import { useState } from "react";
import secureLocalStorage from "react-secure-storage";

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
      // localStorage.setItem("user", JSON.stringify(respuesta.datos[0]));
      secureLocalStorage.setItem("user", respuesta.datos[0]);
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
        {variant ? <MensajeAlert variant={variant} mensaje={mensaje} /> : <></>}
        <div className="form-padre">
          <Card className="p-4" style={{ width: "400px" }}>
            <Row>
              <Col className="mb-3 pt-4">
                <Form.Text>
                  <h5 className="text-center">REGISTRATE</h5>
                  <hr />
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
                    correo: "",
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
                    <Form className="px-3" noValidate onSubmit={handleSubmit}>
                      <Form.Group
                        // as={Row}
                        className="mb-3"
                        controlId="formPlaintextInput2"
                      >
                        {/* <Form.Label column sm="4" className="text-start">
                          Nombres:
                        </Form.Label> */}
                        <Col>
                          <Form.Control
                            type="text"
                            placeholder="Nombre"
                            name="nombre"
                            value={values.nombre}
                            onChange={handleChange}
                          />
                        </Col>
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formPlaintextInput3"
                      >
                        {/* <Form.Label column sm="4" className="text-start">
                          Apellidos:
                        </Form.Label> */}
                        <Col>
                          <Form.Control
                            type="text"
                            placeholder="Apellido"
                            name="apellido"
                            value={values.apellido}
                            onChange={handleChange}
                          />
                        </Col>
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formPlaintextInput1"
                      >
                        {/* <Form.Label column sm="4" className="text-start">
                          N° Identificación:
                        </Form.Label> */}
                        <Col>
                          <Form.Control
                            type="text"
                            placeholder="Cédula"
                            name="cedula"
                            value={values.cedula}
                            onChange={handleChange}
                            maxLength={10}
                          />
                        </Col>
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formPlaintextInput1"
                      >
                        {/* <Form.Label column sm="4" className="text-start">
                          N° Identificación:
                        </Form.Label> */}
                        <Col>
                          <Form.Control
                            type="email"
                            placeholder="Correo electrónico"
                            name="correo"
                            value={values.correo}
                            onChange={handleChange}
                          />
                        </Col>
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formPlaintextInput3"
                      >
                        {/* <Form.Label column sm="4" className="text-start">
                          Contraseña:
                        </Form.Label> */}
                        <Col>
                          <Form.Control
                            type="password"
                            placeholder="Contraseña"
                            name="contrasena"
                            value={values.contrasena}
                            onChange={handleChange}
                          />
                        </Col>
                      </Form.Group>
                      <Button
                        variant="outline-secondary"
                        type="submit"
                        className="w-50"
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
                        CREAR CUENTA
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
                  Ya tengo cuenta, <Link to="/Ingresar">ingresar aquí</Link>
                </Form.Text>
              </Col>
            </Row>
          </Card>
        </div>
      </Card>
    </>
  );
};

export default Registrar;
