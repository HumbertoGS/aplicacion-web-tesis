import { useState } from "react";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";

import { Formik } from "formik";

const EditarDatos = ({ producto, Categorias, show, onHide }) => {
  console.log(producto);

  const [filtro, setFiltro] = useState(producto.nombre_categoria);
  const [file, setFile] = useState(producto.imagen);

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <div>
        <Modal.Header closeButton>
          <Modal.Title>
            <h5>EDITAR PRODUCTO</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="Card" style={{ flexDirection: "row" }}>
            <Card.Body>
              <Formik
                initialValues={producto}
                onSubmit={(values, { resetForm }) => {
                  // iniciarSesion(values);
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
                  <Form noValidate onSubmit={handleSubmit}>
                    <div className="px-4 pb-3">
                      <Card.Title>
                        {values.nombre ? values.nombre : "No name"}
                        <hr />
                      </Card.Title>
                      <div>
                        <InputGroup className="mb-3">
                          <InputGroup.Text className="w-25">
                            Nombre
                          </InputGroup.Text>
                          <Form.Control
                            name="nombre"
                            value={values.nombre}
                            onChange={handleChange}
                          />
                        </InputGroup>

                        <div className="d-flex">
                          <InputGroup className="mb-3">
                            <InputGroup.Text className="w-50">
                              Precio
                            </InputGroup.Text>
                            <Form.Control
                              name="precio"
                              value={values.precio}
                              onChange={handleChange}
                            />
                          </InputGroup>

                          <InputGroup
                            className="mb-3"
                            style={{ paddingLeft: "10px" }}
                          >
                            <InputGroup.Text className="w-50">
                              Talla
                            </InputGroup.Text>
                            <Form.Control
                              name="talla"
                              value={values.talla}
                              onChange={handleChange}
                            />
                          </InputGroup>
                        </div>

                        <div className="d-flex">
                          <InputGroup className="mb-3">
                            <InputGroup.Text className="w-50">
                              Cantidad
                            </InputGroup.Text>
                            <Form.Control
                              name="cantidad"
                              value={values.cantidad}
                              onChange={handleChange}
                            />
                          </InputGroup>

                          <InputGroup
                            className="mb-3"
                            style={{ paddingLeft: "10px" }}
                          >
                            <InputGroup.Text className="w-50">
                              Categoria
                              <span
                                style={{ color: "#eb0808" }}
                                className="px-2"
                              >
                                *
                              </span>
                            </InputGroup.Text>
                            <div style={{ width: "50%" }}>
                              <Dropdown>
                                <Dropdown.Toggle
                                  variant="outline"
                                  style={{
                                    width: "100%",
                                    border: "1px solid #dfe3e7",
                                  }}
                                >
                                  {filtro}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  {Categorias.map((item, index) => {
                                    return item.estado ? (
                                      <Dropdown.Item
                                        key={index}
                                        onClick={() => {
                                          setFiltro(item.nombre);
                                          values.categoria = item.id;
                                        }}
                                      >
                                        {item.nombre}
                                      </Dropdown.Item>
                                    ) : (
                                      <li key={index}></li>
                                    );
                                  })}
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                          </InputGroup>
                        </div>
                        <InputGroup className="mb-3">
                          <InputGroup.Text
                            className="w-25"
                            style={{ borderRadius: "0px" }}
                          >
                            Descripcion
                          </InputGroup.Text>
                          <Form.Control
                            // style={{ border: "0px" }}
                            as="textarea"
                            rows={3}
                            style={{ resize: "none" }}
                            name="descripcion"
                            value={values.descripcion}
                            onChange={handleChange}
                          />
                        </InputGroup>
                      </div>
                      <Button
                        type="submit"
                        variant="outline-secondary"
                        // disabled={cantidad == 0}
                        style={{
                          width: "100%",
                        }}
                        // onClick={addCar}
                      >
                        Guardar Cambios
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </Card.Body>
            <div>
              <Card.Img
                className="pt-5"
                variant="top"
                style={{
                  width: "300px",
                  height: "320px",
                }}
                src={file}
              />
              <InputGroup className="mb-3">
                <Form.Control
                  type="file"
                  size="sm"
                  onChangeCapture={(e) => {
                    if (e.target.files[0]) {
                      const reader = new FileReader();
                      reader.readAsDataURL(e.target.files[0]);

                      reader.onload = () => {
                        setFile(reader.result);
                      };
                    }
                  }}
                />
              </InputGroup>
            </div>
          </Card>
        </Modal.Body>
      </div>
    </Modal>
  );
};

export default EditarDatos;
