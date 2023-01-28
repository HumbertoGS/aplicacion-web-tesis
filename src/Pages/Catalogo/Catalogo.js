import { useState, useEffect } from "react";
import secureLocalStorage from "react-secure-storage";

import Breadcrumb from "react-bootstrap/Breadcrumb";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

import { FaShoppingCart } from "react-icons/fa";

import ProductoCatalogo from "./Producto-Catalogo";
import MenuDespe from "./MenuDesplegable";
import MensajeAlert from "../components/MensajeAlert";
import { GetData, PostData, ReloadData } from "../../custom-hooks/useFetch";

import "../designer/theme.css";

let datosA = { datos: [], totales: [] };

const urlCategoria = process.env.REACT_APP_API_CORE_URL + "categoria";
const urlProducto = process.env.REACT_APP_API_CORE_URL + "producto";

const Catalogo = () => {
  const [mensaje, setMensaje] = useState("");
  const [variant, setVariant] = useState("");

  const [show, setShow] = useState(false);
  const [datos, setDatos] = useState({ datos: [], totales: [] });
  const [modal, setModal] = useState(false);

  const [buscar, setBuscar] = useState("");

  const [productoTabla, setProductoTabla] = useState([]);
  const [buscarProductos, setBuscarProductos] = useState(true);

  const [producto, setProducto] = useState(productoTabla);
  const [filtro, setFiltro] = useState("Filtrar");

  ReloadData(urlProducto, buscarProductos, (dato) => {
    setProductoTabla(dato.datos);
    setProducto(dato.datos);
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
      (data) => data.categoria == idCategoria
    );
    if (filtrado.length > 0) {
      setProducto(filtrado);
    } else {
      setProducto([]);
    }
  };

  const busqueda = () => {
    console.log(buscar);
  };

  const guardarDatos = (datosA) => {
    let Total = datosA.datos.reduce(
      (acumulador, actual) => acumulador + actual.total,
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
    // localStorage.setItem("datosCarrito", JSON.stringify(datosGuardar));
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
    // const datosCarro = JSON.parse(localStorage.getItem("datosCarrito"));
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
        {variant ? <MensajeAlert variant={variant} mensaje={mensaje} /> : <></>}
        {/* <Breadcrumb>
          <Breadcrumb.Item href="Inicio">Inicio</Breadcrumb.Item>
          <Breadcrumb.Item active>Catalogo</Breadcrumb.Item>
        </Breadcrumb> */}
        <Card className="Card pt-2">
          <div className="px-3">
            <Row>
              <Col className="mb-3">
                <h5 className="text-center">Cátologo de productos</h5>
              </Col>
            </Row>
            <Card className="mb-2">
              <div className="mx-5 my-2 d-flex">
                <div style={{ width: "35%" }} className="d-flex">
                  <DropdownButton id="dropdown-basic-button" title={filtro}>
                    {Categorias.map((item, index) => {
                      return item.estado ? (
                        <Dropdown.Item
                          key={index}
                          onClick={() => {
                            setFiltro(item.nombre);
                            BuscarFiltro(item.id);
                          }}
                        >
                          {item.nombre}
                        </Dropdown.Item>
                      ) : (
                        <div key={index}></div>
                      );
                    })}
                  </DropdownButton>
                  {filtro !== "Filtrar" ? (
                    <Button
                      className="mx-2"
                      onClick={() => {
                        setFiltro("Filtrar");
                        setProducto(productoTabla);
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

            {show ? (
              <MenuDespe
                show={show}
                handleClose={handleClose}
                datos={datos}
                guardarDatos={guardarDatos}
              />
            ) : (
              <></>
            )}

            <Row xs={2} md={4} className="g-4">
              {producto.map((item, index) => {
                return (
                  <ProductoCatalogo
                    key={index}
                    producto={item}
                    datosCarrito={datosCarrito}
                  />
                );
              })}
            </Row>
          </div>
        </Card>
      </Card>
    </>
  );
};

export default Catalogo;
