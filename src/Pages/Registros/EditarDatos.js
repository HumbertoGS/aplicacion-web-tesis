import { useState } from "react";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";

import { Formik } from "formik";

import { PostData } from "../../custom-hooks/useFetch";

const urlProducto = process.env.REACT_APP_API_CORE_URL + "producto";

const EditarDatos = ({
  producto,
  Categorias,
  show,
  onHide,
  buscarProductos,
}) => {
  const [filtro, setFiltro] = useState(producto.nombre_categoria);
  const [file, setFile] = useState(producto.imagen);
  const [fileNew, setFileNew] = useState(null);

  const [formDato, setFormDato] = useState(null);
  const [actualizarProducto, setActualizarProducto] = useState(false);

  const actualizar = (value) => {
    let datosGuardar = {
      id: value.id,
      nombre: value.nombre,
      precio: value.precio,
      talla: value.talla,
      categoria: value.categoria,
      cantidad: value.cantidad,
      descripcion: value.descripcion,
    };

    const formData = new FormData();

    console.log(fileNew)

    if (fileNew) formData.append("imagen", fileNew);

    formData.append("data", JSON.stringify(datosGuardar));

    setFormDato(formData);
    setActualizarProducto(true);
  };

  PostData(urlProducto + "/insert", formDato, actualizarProducto, (x) => {
    setActualizarProducto(false);
    buscarProductos();
    onHide();
    // setInsertProducto(false);
  });

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
                  actualizar(values);
                  // resetForm();
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
                                    borderRadius: "0px 4px 4px 0px",
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
                      setFileNew(e.target.files[0]);
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
