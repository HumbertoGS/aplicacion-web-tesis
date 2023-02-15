import { useState, useEffect } from "react";
import secureLocalStorage from "react-secure-storage";

import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

import { FaShoppingCart } from "react-icons/fa";

import { CatalogoProductos } from "./Paginacion";
import MenuDespe from "./MenuDesplegable";
import MensajeAlert from "../components/MensajeAlert";
import { ReloadData } from "../../custom-hooks/useFetch";

import "../designer/theme.css";

let datosA = { datos: [], totales: [] };

const urlCategoria =
  process.env.REACT_APP_API_CORE_URL + "categoria?estado=true";
const urlProducto = process.env.REACT_APP_API_CORE_URL + "producto?stock=true";

const Catalogo = () => {
  const [mensaje, setMensaje] = useState("");
  const [variant, setVariant] = useState("");

  const [show, setShow] = useState(false);
  const [datos, setDatos] = useState({ datos: [], totales: [] });

  const [buscar, setBuscar] = useState("");

  const [productoTabla, setProductoTabla] = useState([]);
  const [buscarProductos, setBuscarProductos] = useState(true);

  const [producto, setProducto] = useState(productoTabla);
  const [productoNew, setProductoNew] = useState(productoTabla);
  const [filtro, setFiltro] = useState("Categoria");

  ReloadData(urlProducto, buscarProductos, (dato) => {
    setProductoTabla(dato.datos);
    setProducto(dato.datos);
    setProductoNew(dato.datos.filter((data) => data.newProducto === true));
    setBuscarProductos(false);
  });

  //---------------------CATEGORIA---------------------
  const [Categorias, setCategorias] = useState([]);
  const [reload, setReload] = useState(true);

  ReloadData(urlCategoria, reload, (dato) => {
    setCategorias(dato.datos);
    setReload(false);
  });

  //-------------------FIN CATEGORIA-------------------

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

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

  const busqueda = () => {
    console.log(buscar);
  };

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

    setVariant("success");
    setMensaje("Agregado al carrito");
  };

  useEffect(() => {
    if (variant) {
      const interval = setTimeout(() => {
        setVariant("");
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [variant]);

  useEffect(() => {
    const datosCarro = secureLocalStorage.getItem("datosCarrito");

    if (datosCarro) {
      if (datosCarro.datos.length > 0) {
        datosA = datosCarro;
        setDatos(datosA);
      }
    } else setDatos({ datos: [], totales: [] });
  }, []);

  const [opcion, setOpcion] = useState(true);

  const BtnCatalogo = ({ border, background, onClick, nameBtn }) => {
    const style = {
      border,
      borderRadius: "4px",
      background,
      color: "#393b3c",
    };

    return (
      <Button
        style={style}
        variant="outline-secondary"
        className="w-25"
        onClick={onClick}
      >
        {nameBtn}
      </Button>
    );
  };

  return (
    <>
      <Card body className="Card">
        {variant ? <MensajeAlert variant={variant} mensaje={mensaje} /> : <></>}
        <Card className="Card pt-2">
          <div className="px-0">
            <Card className="mb-2 py-3">
              <Row>
                <Col md={3}></Col>
                <Col className="mb-2">
                  <h5 className="text-center">Cátologo de productos</h5>
                  <hr />
                </Col>
                <Col md={3}></Col>
              </Row>
              <div className="mx-4 my-2 d-flex">
                <div style={{ width: "75%" }} className="d-flex">
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

                  <DropdownButton
                    id="dropdown-basic-button"
                    variant="outline-secondary"
                    className="px-3 DropdownButton"
                    title={"Talla"}
                  >
                    <Dropdown.Item>S</Dropdown.Item>
                  </DropdownButton>

                  {filtro !== "Categoria" ? (
                    <Button
                      className="mx-2"
                      variant="outline-secondary"
                      onClick={() => {
                        setFiltro("Categoria");
                        setProducto(productoTabla);
                        setProductoNew(
                          productoTabla.filter(
                            (data) => data.newProducto === true
                          )
                        );
                      }}
                    >
                      Limpiar Filtros
                    </Button>
                  ) : (
                    <></>
                  )}
                </div>
                <div style={{ width: "60%" }}>
                  <Form className="d-flex">
                    <Form.Control
                      style={{ width: "300px" }}
                      type="search"
                      placeholder="Búsqueda..."
                      className="me-2"
                      aria-label="Search"
                      onChange={(event) => {
                        setBuscar(event.target.value);
                      }}
                    />
                    <Button
                      variant="outline-success"
                      onClick={busqueda}
                      disabled={!buscar}
                    >
                      Buscar
                    </Button>
                  </Form>
                </div>
                <div style={{ width: "10%" }}>
                  <Button onClick={handleShow}>
                    <FaShoppingCart />
                  </Button>
                </div>
              </div>
            </Card>

            <div className="d-flex">
              <BtnCatalogo
                border={!opcion ? "0px" : "1px solid #91979d"}
                background={opcion ? "#c7d5ff" : "#ffff"}
                onClick={() => {
                  setOpcion(true);
                }}
                nameBtn="Nuevos"
              />
              <BtnCatalogo
                border={opcion ? "0px" : "1px solid #91979d"}
                background={!opcion ? "#c7d5ff" : "#ffff"}
                onClick={() => {
                  setOpcion(false);
                }}
                nameBtn="Todos"
              />
              <div className="w-50"></div>
            </div>
            <hr className="my-2" />

            {show && (
              <MenuDespe
                show={show}
                handleClose={handleClose}
                datos={datos}
                guardarDatos={guardarDatos}
              />
            )}

            <div style={{ minHeight: "60vh" }}>
              {opcion ? (
                <CatalogoProductos
                  data={productoNew}
                  datosCarrito={datosCarrito}
                />
              ) : (
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
