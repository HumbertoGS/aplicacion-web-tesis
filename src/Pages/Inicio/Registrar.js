import secureLocalStorage from "react-secure-storage";

import { useState } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/esm/Button";

import { Formik } from "formik";
import { Link } from "react-router-dom";

import "../designer/theme.css";
import { BtnGuardar } from "../components/BtnAccion";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";

import validaciones from "../components/Validaciones";

const url = process.env.REACT_APP_API_CORE_URL + "inicio/registro";

const Registrar = () => {
  const comprobarInicio = (respuesta) => {
    if (respuesta) {
      secureLocalStorage.setItem("user", respuesta[0]);

      setTimeout(function () {
        window.location.href = process.env.REACT_APP_BASENAME + "Catalogo";
      }, 1000);
    }
  };

  const [type, setType] = useState("password");
  const [arreglo, setArreglo] = useState([]);

  return (
    <>
      <Card body className="Card">
        <div className="form-padre">
          <Card className="p-4" style={{ maxWidth: "450px" }}>
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
                    primer_nombre: "",
                    segundo_nombre: "",
                    apellido: "",
                    correo: "",
                    contrasena: "",
                  }}
                >
                  {({ handleChange, values, isValid, errors, touched }) => (
                    <Form className="px-3" noValidate>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Control
                              type="text"
                              required
                              isValid={values.primer_nombre.length > 2}
                              autoComplete="off"
                              placeholder="Primer nombre"
                              name="primer_nombre"
                              value={values.primer_nombre}
                              onChange={handleChange}
                            />
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group className="mb-3">
                            <Form.Control
                              type="text"
                              autoComplete="off"
                              isValid={values.segundo_nombre.length > 2}
                              placeholder="Segundo nombre"
                              name="segundo_nombre"
                              value={values.segundo_nombre}
                              onChange={handleChange}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Form.Group className="mb-3">
                        <Form.Control
                          type="text"
                          required
                          isValid={values.apellido.length > 5}
                          autoComplete="off"
                          placeholder="Apellidos"
                          name="apellido"
                          value={values.apellido}
                          onChange={handleChange}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Control
                          type="text"
                          required
                          isValid={values.cedula.length == 10}
                          autoComplete="off"
                          placeholder="Cédula"
                          name="cedula"
                          value={values.cedula}
                          onChange={handleChange}
                          onKeyDown={(e) => {
                            validaciones.onlyNumber(e);
                          }}
                          maxLength={10}
                        />
                      </Form.Group>

                      <Form.Group className="mb-0">
                        <Form.Control
                          type="email"
                          required
                          className={
                            !values.correo
                              ? ""
                              : errors.correo
                              ? "focusInput"
                              : "border-success"
                          }
                          isValid={
                            !values.correo
                              ? ""
                              : validaciones.correo(values, errors) === false
                          }
                          autoComplete="off"
                          placeholder="Correo electrónico"
                          name="correo"
                          value={values.correo}
                          onChange={handleChange}
                        />
                      </Form.Group>
                      {errors.correo && (
                        <p className="mb-1 text-danger">
                          Correo electrónico invalido
                        </p>
                      )}

                      <InputGroup className="my-3">
                        <Form.Control
                          type={type}
                          required
                          className={
                            !values.contrasena
                              ? ""
                              : errors.contrasena
                              ? "focusInput"
                              : "border-success"
                          }
                          isValid={!values.contrasena ? "" : !errors.contrasena}
                          autoComplete="new-password"
                          placeholder="Contraseña"
                          name="contrasena"
                          value={values.contrasena}
                          onChange={(event) => {
                            values.contrasena = event.target.value;
                            validaciones.contrasena(values, (x) => {
                              errors.contrasena = x.length > 0;
                              setArreglo(x);
                            });
                          }}
                        />
                        <Button
                          variant="outline-secondary"
                          onClick={() => {
                            setType(type === "password" ? "text" : "password");
                          }}
                        >
                          {type === "password" ? <IoIosEye /> : <IoIosEyeOff />}
                        </Button>
                      </InputGroup>
                      {arreglo.length > 0 && (
                        <p className="mb-3 text-danger">
                          Contraseña debe tener:
                          <ul className="text-start">
                            {arreglo.map((item, i) => {
                              return <li key={i}>{item}</li>;
                            })}
                          </ul>
                        </p>
                      )}

                      <Col md={12}>
                        <BtnGuardar
                          datos={values}
                          mensajeResp={"Datos Registrados"}
                          url={url}
                          handleRespond={comprobarInicio}
                          nameBtn="Crear Cuenta"
                          disabled={
                            !(
                              values.apellido &&
                              values.cedula &&
                              values.primer_nombre &&
                              values.correo &&
                              values.contrasena
                            )
                          }
                          width={"200px"}
                        />
                      </Col>
                    </Form>
                  )}
                </Formik>
              </Col>
            </Row>
            <Row>
              <Col className="mt-3 px-4">
                <Form.Text>
                  Ya tienes cuenta, <Link to="/Ingresar">ingresar aquí</Link>
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
