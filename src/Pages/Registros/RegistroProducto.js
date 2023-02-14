import { useEffect, useState } from "react";

import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";
import Table from "react-bootstrap/Table";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import { Formik } from "formik";

import { HiPencil } from "react-icons/hi";

import MensajeAlert from "../components/MensajeAlert";
import EditarDatos from "./EditarDatos";
import { PostData, ReloadData } from "../../custom-hooks/useFetch";

import { styleBtnCancel, styleBtnSave } from "../designer/styleBtn";

import { BtnCambiarEstado } from "../components/BtnAccion";
import FormCustom from "../components/FormCustom";
import Tabla from "../components/Tabla";

const urlCategoria = process.env.REACT_APP_API_CORE_URL + "categoria";
const urlProducto = process.env.REACT_APP_API_CORE_URL + "producto";

const RegistroProducto = () => {
  const [mensaje, setMensaje] = useState("");
  const [variant, setVariant] = useState("");

  const [editarModal, setEditarModal] = useState(null);
  const [datos, setDatos] = useState([]);

  //-------------------CATEGORIA-------------------
  const [Categorias, setCategorias] = useState([]);
  const [updateCategori, setUpdateCategori] = useState(false);
  const [datosCategoria, setDatosCategoria] = useState(null);
  const [reload, setReload] = useState(true);

  ReloadData(urlCategoria, reload, (dato) => {
    setCategorias(dato.datos);
    setReload(false);
  });

  const registrarCategoria = (nuevaCat) => {
    setDatosCategoria(nuevaCat);
    setUpdateCategori(true);
  };

  PostData(urlCategoria + "/insert", datosCategoria, updateCategori, (dato) => {
    setUpdateCategori(false);
    setReload(true);
    setVariant("success");
    setMensaje("Se registro la categoria");
  });

  //-------------------TABLA DE PRODUCTOS-------------------

  const [productoTabla, setProductoTabla] = useState([]);
  const [buscarProductos, setBuscarProductos] = useState(true);
  const [producto, setProducto] = useState(productoTabla);

  const [formDato, setFormDato] = useState("");
  const [insertProducto, setInsertProducto] = useState(false);
  const [file, setFile] = useState("");

  const [filtro, setFiltro] = useState("Selecciona categoria");
  const [filtrarTabla, setFiltrarTabla] = useState("Filtrar");

  ReloadData(urlProducto, buscarProductos, (dato) => {
    setProductoTabla(dato.datos);
    setProducto(dato.datos);
    setBuscarProductos(false);
  });

  //-------------------FILTRO PRODUCTOS-------------------

  const Buscar = (idCategoria) => {
    let filtrado = productoTabla.filter(
      (data) => data.categoria === idCategoria
    );
    if (filtrado.length > 0) {
      setProducto(filtrado);
    } else {
      setProducto([]);
    }
  };

  //-------------------REGISTRAR PRODUCTOS-------------------

  const guardarDatos = (value) => {
    let datosGuardar = value;

    delete datosGuardar.imagen;

    if (!file) return;

    const formData = new FormData();
    formData.append("imagen", file);
    formData.append("data", JSON.stringify(datosGuardar));

    setFormDato(formData);
  };

  //-------------------MENSAJE ALERTA-------------------
  useEffect(() => {
    if (variant) {
      const interval = setTimeout(() => {
        setVariant("");
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [variant]);

  const [viewImagen, setViewImagen] = useState(null);
  const view_img = (files) => {
    const reader = new FileReader();
    reader.readAsDataURL(files);

    reader.onload = () => {
      setViewImagen(reader.result);
    };
  };

  const [opcion, setOpcion] = useState(true);

  return (
    <>
      <Card body className="Card">
        {/* {variant ? <MensajeAlert variant={variant} mensaje={mensaje} /> : <></>} */}
        <div className="mt-2">
          <h5 className="text-center">Registro de Producto y Categorias</h5>
          <div className="d-flex">
            <Button
              style={{ border: "0px", borderRadius: "0px" }}
              variant="outline-secondary"
              onClick={() => {
                setOpcion(!opcion);
              }}
            >
              Registrar {!opcion ? "Categoria" : "Producto"}
            </Button>
          </div>
          <hr className="pt-0 mt-0" />
          {opcion ? (
            <Card className="p-3 mx-0" style={{ height: "74vh" }}>
              <Row>
                <Col xs={12} md={5}>
                  <Card className="Card p-4 mt-3">
                    <h5>Registro de Categoria</h5>
                    <hr />
                    <Formik
                      initialValues={{
                        nombre: "",
                      }}
                      onSubmit={(values, { resetForm }) => {
                        registrarCategoria(values);
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
                          <InputGroup className="mb-3">
                            <InputGroup.Text style={{ width: "100px" }}>
                              Nombre
                            </InputGroup.Text>
                            <Form.Control
                              type="text"
                              name="nombre"
                              value={values.nombre}
                              onChange={handleChange}
                            />
                          </InputGroup>
                          <Button
                            className="w-50"
                            type="submit"
                            disabled={!values.nombre}
                            variant="outline-secondary"
                          >
                            Guardar
                          </Button>
                        </Form>
                      )}
                    </Formik>
                  </Card>
                </Col>
                <Col className="px-4 p-4 mt-4" xs={12} md={7}>
                  <div>
                    <Tabla
                      data={Categorias}
                      tabla="categoria"
                      reload={() => {
                        setReload(true);
                      }}
                      url={urlCategoria}
                    />
                  </div>
                </Col>
              </Row>
            </Card>
          ) : (
            <Card className="Card">
              <Row>
                <Col>
                  <Card className="p-4 ">
                    <Row>
                      <h5 className="text-start py-2">Registro de Productos</h5>
                      <hr />
                      <Col md={7}>
                        <InputGroup className="mb-3 pt-2">
                          <InputGroup.Text
                            style={{ width: "100%" }}
                            className="text-start px-4"
                          >
                            - Los campos con el asterisco son campos
                            obligatorios
                            <br />- En caso de no ingresar un nombre, se guardar
                            con el nombre de la categoria
                          </InputGroup.Text>
                        </InputGroup>
                        <FormCustom
                          valuesForm={{
                            nombre: "",
                            imagen: "",
                            categoria: "",
                            cantidad: "",
                            precio: "",
                            talla: "",
                            descripcion: "",
                          }}
                          saveAction={insertProducto}
                          guardarDatos={(value) => {
                            let datosGuardar = value;

                            datosGuardar.imagen = viewImagen;

                            setFormDato(datosGuardar);

                            setFiltro("Selecciona categoria");
                            setInsertProducto(true);
                          }}
                          moreProp={{
                            Categorias,
                            filtro,
                            setFiltro: (x) => setFiltro(x),
                            file: (e) => {
                              if (e.target.files[0]) {
                                setFile(e.target.files[0]);
                                view_img(e.target.files[0]);
                              }
                            },
                          }}
                          /*-----------------------------------------*/
                          datos={formDato}
                          url={urlProducto + "/insert"}
                          handleRespond={(x) => {
                            setFile(null);
                            setInsertProducto(false);
                            setBuscarProductos(true);
                          }}
                          mensajeResp="Se registro el producto"
                        />
                        {/* <Formik
                          initialValues={{
                            // codigo: "",
                            nombre: "",
                            imagen: "",
                            categoria: "",
                            cantidad: "",
                            precio: "",
                            talla: "",
                            descripcion: "",
                          }}
                          onSubmit={(values, { resetForm }) => {
                            guardarDatos(values);
                            resetForm();
                            setFiltro("Selecciona categoria");
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
                              {/* <InputGroup
                                className="mb-3"
                                style={{ width: "260px" }}
                              >
                                <InputGroup.Text style={{ width: "100px" }}>
                                  Codigo
                                </InputGroup.Text>
                                <Form.Control
                                  type="text"
                                  name="codigo"
                                  value={values.codigo}
                                  onChange={handleChange}
                                />
                              </InputGroup> 
                              <InputGroup className="mb-3 pt-2">
                                <InputGroup.Text style={{ width: "100px" }}>
                                  Nombre
                                </InputGroup.Text>
                                <Form.Control
                                  type="text"
                                  name="nombre"
                                  value={values.nombre}
                                  onChange={handleChange}
                                />
                              </InputGroup>
                              <InputGroup className="mb-3">
                                <InputGroup.Text style={{ width: "100px" }}>
                                  Imagen
                                  <span
                                    style={{ color: "#eb0808" }}
                                    className="px-2"
                                  >
                                    *
                                  </span>
                                </InputGroup.Text>
                                <Form.Control
                                  type="file"
                                  required
                                  // name="imagen"
                                  // value={values.imagen}
                                  onChange={(e) => {
                                    if (e.target.files[0]) {
                                      setFile(e.target.files[0]);
                                      view_img(e.target.files[0]);
                                    }
                                  }}
                                />
                              </InputGroup>
                              <div className="d-flex">
                                <InputGroup
                                  className="mb-3"
                                  style={{ width: "50%" }}
                                >
                                  <InputGroup.Text style={{ width: "100px" }}>
                                    Categoria
                                    <span
                                      style={{ color: "#eb0808" }}
                                      className="px-2"
                                    >
                                      *
                                    </span>
                                  </InputGroup.Text>
                                  <div style={{ width: "200px" }}>
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
                                <InputGroup
                                  className="mb-3"
                                  style={{ marginLeft: "12px", width: "50%" }}
                                >
                                  <InputGroup.Text style={{ width: "100px" }}>
                                    cantidad
                                    <span
                                      style={{ color: "#eb0808" }}
                                      className="px-2"
                                    >
                                      *
                                    </span>
                                  </InputGroup.Text>
                                  <Form.Control
                                    type="text"
                                    name="cantidad"
                                    value={values.cantidad}
                                    onChange={handleChange}
                                  />
                                </InputGroup>
                              </div>
                              <div className="d-flex">
                                <InputGroup
                                  className="mb-3"
                                  style={{ width: "50%" }}
                                >
                                  <InputGroup.Text style={{ width: "100px" }}>
                                    Precio
                                    <span
                                      style={{ color: "#eb0808" }}
                                      className="px-2"
                                    >
                                      *
                                    </span>
                                  </InputGroup.Text>
                                  <div style={{ width: "200px" }}>
                                    <Form.Control
                                      name="precio"
                                      value={values.precio}
                                      onChange={handleChange}
                                      style={{
                                        borderRadius: "0px 4px 4px 0px",
                                      }}
                                    />
                                  </div>
                                </InputGroup>
                                <InputGroup
                                  className="mb-3"
                                  style={{ marginLeft: "12px", width: "50%" }}
                                >
                                  <InputGroup.Text style={{ width: "100px" }}>
                                    Talla
                                  </InputGroup.Text>
                                  <Form.Control
                                    name="talla"
                                    value={values.talla}
                                    onChange={handleChange}
                                  />
                                </InputGroup>
                              </div>
                              <InputGroup className="mb-3">
                                <InputGroup.Text style={{ width: "100px" }}>
                                  Descripcion
                                </InputGroup.Text>
                                <Form.Control
                                  as="textarea"
                                  aria-label="With textarea"
                                  rows={3}
                                  style={{ resize: "none" }}
                                  name="descripcion"
                                  value={values.descripcion}
                                  onChange={handleChange}
                                />
                              </InputGroup>
                              <Button
                                className="w-50"
                                type="submit"
                                variant="outline-secondary"
                                // disabled={
                                //   !(
                                //     //values.nombre &&
                                //     //values.descripcion &&
                                //     // values.talla &&
                                //     (
                                //       file &&
                                //       values.precio &&
                                //       values.cantidad &&
                                //       values.categoria
                                //     )
                                //   )
                                // }
                              >
                                Guardar
                              </Button>
                            </Form>
                          )}
                        </Formik> */}
                      </Col>
                      <Col md={5}>
                        <div
                          className="py-4 d-flex justify-content-center"
                          style={{
                            border: "1px solid #b8bcc0",
                            borderRadius: "12px",
                            height: "380px",
                            alignItems: "center",
                          }}
                        >
                          {viewImagen ? (
                            <Card.Img
                              style={{
                                width: "370px",
                                maxHeight: "330px",
                              }}
                              src={viewImagen}
                            />
                          ) : (
                            <></>
                          )}
                        </div>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>
              <Row className="p-4">
                <Col>
                  <div className="d-flex">
                    <Dropdown>
                      <Dropdown.Toggle
                        variant="outline"
                        style={{
                          width: "160px",
                          border: "1px solid #dfe3e7",
                        }}
                      >
                        {filtrarTabla}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {Categorias.map((item, index) => {
                          return item.estado ? (
                            <Dropdown.Item
                              key={index}
                              onClick={() => {
                                setFiltrarTabla(item.nombre);
                                Buscar(item.id);
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
                    {filtrarTabla !== "Filtrar" ? (
                      <Button
                        className="mx-2"
                        onClick={() => {
                          setFiltrarTabla("Filtrar");
                          setProducto(productoTabla);
                        }}
                      >
                        Limpiar Filtros
                      </Button>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div
                    // style={{ overflowY: "auto", height: "350px" }}
                    className="mt-3"
                  >
                    <Tabla
                      data={producto}
                      tabla="producto"
                      editarModal={(item) => {
                        setDatos(item);
                        setEditarModal(true);
                      }}
                      reload={() => {
                        setBuscarProductos(true);
                      }}
                      url={urlProducto}
                      height="360px"
                    />
                  </div>
                </Col>
              </Row>
            </Card>
          )}
        </div>
      </Card>
      {editarModal ? (
        <EditarDatos
          producto={datos}
          Categorias={Categorias}
          show={editarModal}
          onHide={() => setEditarModal(false)}
          buscarProductos={() => setBuscarProductos(true)}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default RegistroProducto;
