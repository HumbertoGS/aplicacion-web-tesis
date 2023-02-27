import { useState, useEffect } from "react";
import secureLocalStorage from "react-secure-storage";

import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Accordion from "react-bootstrap/Accordion";

import { FaShoppingCart } from "react-icons/fa";

import MenuDespe from "./MenuDesplegable";
import MensajeAlert from "../components/MensajeAlert";
import BtnCambioOpciones from "../components/OpcionPantalla";
import { CatalogoProductos } from "./Paginacion";
import { BtnGuardar } from "../components/BtnAccion";
import { GetData } from "../../custom-hooks/useFetch";

import "../designer/theme.css";

let datosA = { datos: [], totales: [] };

const urlCategoria =
  process.env.REACT_APP_API_CORE_URL + "categoria?estado=true";
const urlProducto = process.env.REACT_APP_API_CORE_URL + "producto?stock=true";

const Catalogo = () => {
  //-----------Valores Iniciales----------
  const [mensajeAlert, setMensajeAlert] = useState({
    mostrar: false,
    mensaje: "",
    variant: "",
  });

  const [todos, setTodos] = useState(false);
  const [nuevo, setNuevo] = useState(true);

  const [show, setShow] = useState(false);
  const [datos, setDatos] = useState({ datos: [], totales: [] });

  //----------Valores para datos producto----------
  const [productoTabla, setProductoTabla] = useState([]);
  const [buscarProductos, setBuscarProductos] = useState(true);

  const [producto, setProducto] = useState(productoTabla);
  const [productoNew, setProductoNew] = useState(productoTabla);
  const [filtro, setFiltro] = useState("Categoria");

  const [busqueda, setBusqueda] = useState("");
  const [params, setParams] = useState("");

  GetData(`${urlProducto}&${params}=${busqueda}`, buscarProductos, (dato) => {
    setProductoTabla(dato.datos);
    setProducto(dato.datos);
    setProductoNew(dato.datos.filter((data) => data.newProducto === true));
    setBuscarProductos(false);
  });

  //---------------------CATEGORIA---------------------
  const [Categorias, setCategorias] = useState([]);
  const [reload, setReload] = useState(true);

  GetData(urlCategoria, reload, (dato) => {
    setCategorias(dato.datos);
    setReload(false);
  });

  //-------------------Operaciones del carrito-------------------
  const guardarDatos = (datosA) => {
    let Total = datosA.datos.reduce(
      (acumulador, actual) => acumulador + Number(actual.total),
      0
    );

    let datosGuardar = {
      datos: datosA.datos,
      totales: [
        { name: "Subtotal", totales: Total },
        { name: "Descuento", totales: "0.0" },
        { name: "Total", totales: Total },
      ],
    };
    setDatos(datosGuardar);
    secureLocalStorage.setItem("datosCarrito", datosGuardar);
  };

  const datosCarrito = (valores) => {
    datosA.datos.push(valores);
    guardarDatos(datosA);

    setMensajeAlert({
      mostrar: true,
      mensaje: "Agregado al carrito",
      variant: "success",
    });
  };

  //----------------Filtros---------------
  const BuscarFiltro = (idCategoria) => {
    let filtrado = productoTabla.filter(
      (data) => data.categoria === idCategoria
    );
    if (filtrado.length > 0) {
      setProducto(filtrado);
      setProductoNew(filtrado.filter((data) => data.newProducto === true));
    } else {
      setProducto([]);
      setProductoNew([]);
    }
  };

  const buscar = (value) => {
    setBusqueda(value);
    setBuscarProductos(true);
  };

  const BusquedaAvz = () => {
    let campoBuscar = "";

    return (
      <>
        {/* <div className="mx-4 my-2 d-flex"> */}
        <Row>
          {/* <div style={{ width: "75%" }} className="d-flex"> */}
          <Col md={2}>
            <DropdownButton
              id="dropdown-basic-button"
              variant="outline-secondary"
              className="DropdownButton"
              title={filtro}
            >
              {Categorias.map((item, index) => {
                return (
                  <Dropdown.Item
                    key={index}
                    onClick={() => {
                      setFiltro(item.nombre);
                      BuscarFiltro(item.id);
                    }}
                  >
                    {item.nombre}
                  </Dropdown.Item>
                );
              })}
            </DropdownButton>
          </Col>
          <Col>
            {(filtro !== "Categoria" || params !== "") && (
              <Button
                className="mx-2"
                variant="outline-secondary"
                onClick={() => {
                  setFiltro("Categoria");
                  setProducto(productoTabla);
                  setProductoNew(
                    productoTabla.filter((data) => data.newProducto === true)
                  );
                  setParams("");
                }}
              >
                Limpiar Filtros
              </Button>
            )}
          </Col>
          <Col md={3} className="d-flex justify-content-end">
            <DropdownButton
              variant="outline-secondary"
              style={{ border: "none !important" }}
              title={params !== "" ? params : "Opciones de búsqueda"}
            >
              <Dropdown.Item onClick={() => setParams("nombre")}>
                Nombre
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setParams("talla")}>
                Talla
              </Dropdown.Item>
            </DropdownButton>
          </Col>
          <Col md={5}>
            <div className="d-flex">
              <Form.Control
                style={{ width: "300px" }}
                type="text"
                placeholder="Búsqueda..."
                className="me-2"
                defaultValue={busqueda ?? campoBuscar}
                onChange={(event) => {
                  campoBuscar = event.target.value;
                }}
                disabled={params === ""}
              />
              <Button
                variant="outline-secondary"
                onClick={() => buscar(campoBuscar)}
                disabled={params === ""}
              >
                Buscar
              </Button>
            </div>
          </Col>
        </Row>
      </>
    );
  };

  //----------Carga de datos iniciales y mensaje---------

  useEffect(() => {
    if (mensajeAlert.mostrar) {
      const interval = setTimeout(() => {
        setMensajeAlert({ mostrar: false, mensaje: "", variant: "" });
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [mensajeAlert.mostrar]);

  useEffect(() => {
    const datosCarro = secureLocalStorage.getItem("datosCarrito");

    if (datosCarro) {
      if (datosCarro.datos.length > 0) {
        datosA = datosCarro;
        setDatos(datosA);
      }
    } else setDatos({ datos: [], totales: [] });
  }, []);

  return (
    <>
      <Card body className="Card">
        {mensajeAlert.mostrar && (
          <MensajeAlert
            variant={mensajeAlert.variant}
            mensaje={mensajeAlert.mensaje}
          />
        )}
        <Card className="Card pt-2">
          <div className="px-0">
            <Row>
              <div className="w-25"></div>
              <div className="w-50 mb-2">
                <h5 className="text-center">Cátologo de productos</h5>
                <hr />
              </div>
            </Row>

            <Accordion className="mb-2">
              <Accordion.Item eventKey={"0"}>
                <Accordion.Header>
                  <Form.Label className="fw-bold w-50 my-0">
                    Filtro de Búsqueda
                  </Form.Label>
                  <hr />
                </Accordion.Header>
                <Accordion.Body>
                  <BusquedaAvz />
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>

            <Row className="mb-3" style={{ borderBottom: "1px solid #d2d8dd" }}>
              <BtnCambioOpciones
                estado={nuevo}
                onClick={() => {
                  setNuevo(true);
                  setTodos(false);
                }}
                nameBtn="Nuevos"
              />
              <BtnCambioOpciones
                estado={todos}
                onClick={() => {
                  setNuevo(false);
                  setTodos(true);
                }}
                nameBtn="Todos"
              />
              <Col className="mb-1 d-flex justify-content-end">
                <div className="mb-1" style={{ width: "10%" }}>
                  <Button
                    onClick={() => {
                      setShow(true);
                    }}
                  >
                    <FaShoppingCart />
                  </Button>
                </div>
              </Col>
            </Row>

            {show && (
              <MenuDespe
                show={show}
                handleClose={() => setShow(false)}
                datos={datos}
                guardarDatos={guardarDatos}
              />
            )}

            <div style={{ minHeight: "60vh" }}>
              {nuevo && (
                <CatalogoProductos
                  data={productoNew}
                  datosCarrito={datosCarrito}
                />
              )}

              {todos && (
                <CatalogoProductos
                  data={producto}
                  datosCarrito={datosCarrito}
                />
              )}
            </div>
          </div>
        </Card>
      </Card>
    </>
  );
};

export default Catalogo;
