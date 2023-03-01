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

  const [pass, setPass] = useState({ oculta: true, value: "", valuePass: "" });
  const [type, setType] = useState("password");

  let datos = "";

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

                      {/* <InputGroup className="my-3">
                        <Form.Control
                          type="text"
                          required
                          className={
                            !values.contrasena
                              ? ""
                              : errors.contrasena
                              ? "focusInput"
                              : "border-success"
                          }
                          isValid={
                            !values.contrasena
                              ? ""
                              : validaciones.contrasena(values, errors) ===
                                false
                          }
                          autoComplete="off"
                          placeholder="Contraseña"
                          name="contrasena"
                          value={pass.oculta ? pass.valuePass : pass.value}
                          onKeyDown={(e) => {
                            let datos;
                            let asteriscos;
                            if (e.keyCode === 8 || e.keyCode === 46) {
                              datos = pass.value.slice(0, -1);
                              asteriscos = pass.valuePass.slice(0, -1);
                              setPass({
                                oculta: pass.oculta,
                                value: datos,
                                valuePass: asteriscos,
                              });
                              e.preventDefault();
                            }
                          }}
                          onChange={(e) => {
                            if (e.target.value.length === 1)
                              datos = e.target.value;
                            else if (e.target.value.length > 1) {
                              console.log(datos);
                              datos = pass.value + e.target.value.slice(-1);
                            }

                            var longitud = e.target.value.length;
                            var asteriscos = "";

                            for (var i = 0; i < longitud; i++) {
                              asteriscos += "•";
                            }

                            setPass({
                              oculta: pass.oculta,
                              value: datos,
                              valuePass: asteriscos,
                            });

                            values.contrasena = datos;
                          }}
                        />
                        <Button
                          variant="outline-secondary"
                          onClick={() => {
                            setPass({ ...pass, oculta: !pass.oculta });
                          }}
                        >
                          {!pass.oculta ? <IoIosEye /> : <IoIosEyeOff />}
                        </Button>
                      </InputGroup> */}

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
                          isValid={
                            !values.contrasena
                              ? ""
                              : validaciones.contrasena(values, errors) ===
                                false
                          }
                          autoComplete="new-password"
                          placeholder="Contraseña"
                          name="contrasena"
                          value={values.contrasena}
                          onChange={handleChange}
                        />
                        <Button
                          variant="outline-secondary"
                          onClick={() => {
                            setType(type === "password" ? "text" : "password");
                          }}
                        >
                          {!pass.oculta ? <IoIosEye /> : <IoIosEyeOff />}
                        </Button>
                      </InputGroup>
                      {errors.contrasena && (
                        <p className="mb-3 text-danger">
                          Contraseña debe tener:
                          <lu className="text-start">
                            <li>Minimo 7 caracteres</li>
                            <li>Minimo un número</li>
                            <li>Minimo una letra mayúcula</li>
                            <li>No debe contener caracteres especiales</li>
                            <li>No debe contener espacios</li>
                          </lu>
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
