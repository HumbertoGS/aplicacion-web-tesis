import { useEffect, useState } from "react";

import Breadcrumb from "react-bootstrap/Breadcrumb";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";
import Table from "react-bootstrap/Table";

import MensajeAlert from "./MensajeAlert";
import { GetData, PostData, ReloadData } from "../custom-hooks/useFetch";

import { Formik } from "formik";

import { styleBtnCancel, styleBtnSave } from "./designer/styleBtn";

const urlCategoria = process.env.REACT_APP_API_CORE_URL + "categoria";

const productoTabla = [
  {
    id: 1,
    categoria: 3,
    nombre: "Camisa",
    talla: "S",
    precio: 15.0,
    imagen: "tacos-rosa.png",
    stock: "3",
    estado: true,
  },
  {
    id: 2,
    categoria: 1,
    nombre: "Zapatos",
    talla: "36",
    precio: 25.0,
    imagen: "tacos-rosa.png",
    stock: "3",
    estado: true,
  },
  {
    id: 3,
    categoria: 2,
    nombre: "Vestidos",
    talla: "S",
    precio: 30.0,
    imagen: "tacos-rosa.png",
    stock: "3",
    estado: true,
  },
  {
    id: 4,
    categoria: 2,
    nombre: "Vestidos",
    talla: "S",
    precio: 30.0,
    imagen: "tacos-rosa.png",
    stock: "3",
    estado: true,
  },
  {
    id: 5,
    categoria: 2,
    nombre: "Vestidos",
    talla: "S",
    precio: 30.0,
    imagen: "tacos-rosa.png",
    stock: "3",
    estado: true,
  },
  {
    id: 6,
    categoria: 2,
    nombre: "Vestidos",
    talla: "S",
    precio: 30.0,
    imagen: "tacos-rosa.png",
    stock: "3",
    estado: true,
  },
  {
    id: 7,
    categoria: 2,
    nombre: "Vestidos",
    talla: "S",
    precio: 30.0,
    imagen: "tacos-rosa.png",
    stock: "3",
    estado: true,
  },
  {
    id: 8,
    categoria: 4,
    nombre: "Pantalones",
    talla: "S",
    precio: 30.0,
    imagen: "tacos-rosa.png",
    stock: "3",
    estado: true,
  },
  {
    id: 9,
    categoria: 4,
    nombre: "Pantalones",
    talla: "S",
    precio: 30.0,
    imagen: "tacos-rosa.png",
    stock: "3",
    estado: true,
  },
  {
    id: 14,
    categoria: 4,
    nombre: "Pantalones",
    talla: "S",
    precio: 30.0,
    imagen: "tacos-rosa.png",
    stock: "3",
    estado: true,
  },
];

const RegistroProducto = () => {
  const [mensaje, setMensaje] = useState("");
  const [variant, setVariant] = useState("");

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
  const [filtro, setFiltro] = useState("Selecciona categoria");

  const [producto, setProducto] = useState(productoTabla);
  const [filtrarTabla, setFiltrarTabla] = useState("Filtrar");

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

  const guardarDatos = (value) => {
    let datosGuardar = value;
    console.log(datosGuardar);
    setVariant("success");
    setMensaje("Se registro el producto");
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

  return (
    <>
      <Card body className="Card">
        {variant ? <MensajeAlert variant={variant} mensaje={mensaje} /> : <></>}
        <Breadcrumb>
          <Breadcrumb.Item href="Inicio">Inicio</Breadcrumb.Item>
          <Breadcrumb.Item active>Registro-Productos</Breadcrumb.Item>
        </Breadcrumb>
        <Card style={{ minHeight: "87vh" }}>
          <div className="m-4">
            <h5 className="text-center">Registro de Producto y Categorias</h5>
            <hr />
            <Row>
              <Col xs={7}>
                <Card className="p-4 m-3">
                  <h5>Registro de Productos</h5>
                  <hr />
                  <Formik
                    initialValues={{
                      codigo: "",
                      nombre: "",
                      imagen: "",
                      categoria: "",
                      stock: "",
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
                        <InputGroup className="mb-3" style={{ width: "260px" }}>
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
                        <InputGroup className="mb-3">
                          <InputGroup.Text style={{ width: "100px" }}>
                            Imagen
                          </InputGroup.Text>
                          <Form.Control
                            type="file"
                            required
                            name="imagen"
                            value={values.imagen}
                            onChange={handleChange}
                            // isInvalid={!!errors.file}
                          />
                        </InputGroup>
                        <div className="d-flex">
                          <InputGroup className="mb-3" style={{ width: "50%" }}>
                            <InputGroup.Text style={{ width: "100px" }}>
                              Categoria
                            </InputGroup.Text>
                            <div style={{ width: "60%" }}>
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
                                    return (
                                      <Dropdown.Item
                                        key={index}
                                        onClick={() => {
                                          setFiltro(item.nombre);
                                          values.categoria = item.id;
                                        }}
                                      >
                                        {item.nombre}
                                      </Dropdown.Item>
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
                              Stock
                            </InputGroup.Text>
                            <Form.Control
                              type="text"
                              name="stock"
                              value={values.stock}
                              onChange={handleChange}
                            />
                          </InputGroup>
                        </div>
                        <div className="d-flex">
                          <InputGroup className="mb-3" style={{ width: "50%" }}>
                            <InputGroup.Text style={{ width: "100px" }}>
                              Precio
                            </InputGroup.Text>
                            <div style={{ width: "60%" }}>
                              <Form.Control
                                name="precio"
                                value={values.precio}
                                onChange={handleChange}
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
                          disabled={
                            !(
                              values.codigo &&
                              values.categoria &&
                              values.descripcion &&
                              values.imagen &&
                              values.nombre &&
                              values.precio &&
                              values.stock &&
                              values.talla
                            )
                          }
                        >
                          Guardar
                        </Button>
                      </Form>
                    )}
                  </Formik>
                </Card>
              </Col>
              <Col>
                <Row className="px-4">
                  <Card className="p-4 mt-3">
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
                          >
                            Guardar
                          </Button>
                        </Form>
                      )}
                    </Formik>
                  </Card>
                </Row>
                <Row className="px-4 p-4 mt-3">
                  <div
                    // className="p-4 mt-3"
                    style={{ overflowY: "auto", height: "250px" }}
                  >
                    <Table>
                      <thead className="theadTable">
                        <tr>
                          <th>Nombre</th>
                          <th>Estado</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Categorias.map((item, index) => {
                          let style = item.estado
                            ? styleBtnSave
                            : styleBtnCancel;
                          return (
                            <tr key={index}>
                              <td>{item.nombre}</td>
                              <td>
                                <Button
                                  style={{
                                    border: "0px",
                                    width: "70px",
                                    ...style,
                                  }}
                                >
                                  {item.estado ? "Activo" : "Inactivo"}
                                </Button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </div>
                </Row>
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
                        return (
                          <Dropdown.Item
                            key={index}
                            onClick={() => {
                              setFiltrarTabla(item.nombre);
                              Buscar(item.id);
                            }}
                          >
                            {item.nombre}
                          </Dropdown.Item>
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
                <div style={{ overflowY: "auto", height: "300px" }}>
                  <Table>
                    <thead className="theadTable">
                      <tr>
                        <th>Codigo</th>
                        <th>Nombre</th>
                        <th>Categoria</th>
                        <th>Talla</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {producto.map((item, index) => {
                        let style = item.estado ? styleBtnSave : styleBtnCancel;
                        return (
                          <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.nombre}</td>
                            <td>{item.categoria}</td>
                            <td>{item.talla}</td>
                            <td>{item.precio}</td>
                            <td>{item.stock}</td>
                            <td>
                              <Button
                                style={{
                                  border: "0px",
                                  width: "70px",
                                  ...style,
                                }}
                              >
                                {item.estado ? "Activo" : "Inactivo"}
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </div>
              </Col>
            </Row>
          </div>
        </Card>
      </Card>
    </>
  );
};

export default RegistroProducto;
