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
import { AiOutlineClear } from "react-icons/ai";

import MenuDespe from "./MenuDesplegable";
import MensajeAlert from "../components/MensajeAlert";
import BtnCambioOpciones from "../components/OpcionPantalla";

import { CatalogoProductos } from "./Paginacion";
import { GetData, PostData } from "../../custom-hooks/useFetch";

import "../designer/theme.css";

let datosA = { datos: [], totales: [] };

const urlCategoria = `${process.env.REACT_APP_API_CORE_URL}categoria?estado=true`;
const urlProducto = `${process.env.REACT_APP_API_CORE_URL}producto`;

const BtnTallas = ({ tallasDisponibles, tallaSelect, selectTallas }) => {
  const tallas = tallaSelect;

  const tallasUnicas = new Set(
    tallasDisponibles.flatMap((item) => item.map((t) => t.toLowerCase()))
  );
  const tallasOrdenadas = Array.from(tallasUnicas).sort();

  return (
    <div>
      {tallasOrdenadas.map((talla) => (
        <Button
          variant="outline-secondary"
          style={{
            background: tallas.some((item) => item === talla) ? "#c1e9ff" : "",
            width: "auto",
          }}
          className="mx-2 my-2"
          key={talla}
          onClick={() => {
            let nuevasTallas;
            if (!tallas.some((item) => item === talla)) {
              nuevasTallas = [...tallas, talla];
            } else {
              nuevasTallas = tallas.filter((item) => item !== talla);
            }

            selectTallas(nuevasTallas);
          }}
        >
          {talla.toUpperCase()}
        </Button>
      ))}
      <p>Tallas seleccionadas: {tallas.join(", ")}</p>
    </div>
  );
};

const Catalogo = () => {
  //-----------Cargar datos de carrito en caso de exitir--------------

  useEffect(() => {
    const datosCarro = secureLocalStorage.getItem("datosCarrito");

    if (datosCarro) {
      if (datosCarro.datos.length > 0) {
        datosA = datosCarro;
        setDatos(datosA);
      }
    } else setDatos({ datos: [], totales: [] });
  }, []);

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
  const [buscar, setBuscar] = useState(true);
  const [busqueda, setBusqueda] = useState({
    categoria: { name: "", id: [] },
    orden: { name: "Ordenar por ", orden: [] },
    tallas: { name: "", tallas: [] },
    stock: true,
  });

  const [tallasFiltro, setTallasFiltro] = useState([]);
  const [producto, setProducto] = useState([]);
  const [productoNew, setProductoNew] = useState([]);

  PostData(urlProducto, busqueda, buscar, (dato) => {
    const data = dato.datos;
    setTallasFiltro(data.tallas);
    setProducto(data.datos);
    setProductoNew(data.datos.filter((data) => data.newProducto === true));
    setBuscar(false);
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

  //----------Carga de datos iniciales y mensaje---------
  useEffect(() => {
    if (mensajeAlert.mostrar) {
      const interval = setTimeout(() => {
        setMensajeAlert({ mostrar: false, mensaje: "", variant: "" });
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [mensajeAlert.mostrar]);

  //----------------Filtros---------------
  const id_categoria = [];

  const BusquedaAvz = () => {
    return (
      <>
        {/* Primera */}
        <Row>
          <Col className="d-flex flex-row justify-content-center pb-2">
            <DropdownButton
              id="dropdown-item-button"
              variant="outline-secondary"
              title={busqueda.orden.name}
              style={{ width: "200px" }}
            >
              <Dropdown.Item
                onClick={() => {
                  setBusqueda({
                    ...busqueda,
                    orden: {
                      name: "ORDEN POR DEFECTO",
                      orden: [],
                    },
                  });
                  setBuscar(true);
                }}
              >
                ORDENAR POR DEFECTO
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  setBusqueda({
                    ...busqueda,
                    orden: {
                      name: "PRECIO: ASCENDENTE",
                      orden: ["precio", "ASC"],
                    },
                  });
                  setBuscar(true);
                }}
              >
                ORDENAR POR PRECIO: ASCENDENTE
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  setBusqueda({
                    ...busqueda,
                    orden: {
                      name: "PRECIO: DESCENDENTE",
                      orden: ["precio", "DESC"],
                    },
                  });
                  setBuscar(true);
                }}
              >
                ORDENAR POR PRECIO: DESCENDENTE
              </Dropdown.Item>
            </DropdownButton>
          </Col>
        </Row>
        {/* Segunda */}
        <Row>
          <Col>
            <Row>
              <Col className="pb-2">
                <h5>Buscar por categoria: {busqueda.categoria.name}</h5>
              </Col>
            </Row>
            <Row>
              <Col>
                {Categorias.map((item) => {
                  return (
                    <Button
                      variant="outline-secondary"
                      style={{
                        background:
                          item.nombre === busqueda.categoria.name
                            ? "#c1e9ff"
                            : "",
                        width: "auto",
                      }}
                      className="mx-2 my-2"
                      key={item.id}
                      onClick={() => {
                        if (busqueda.categoria.id[0] === item.id)
                          id_categoria.pop();
                        else id_categoria.push(item.id);

                        setBusqueda({
                          ...busqueda,
                          categoria: {
                            name: id_categoria.length === 0 ? "" : item.nombre,
                            id: id_categoria,
                          },
                        });
                        setBuscar(true);
                      }}
                    >
                      {item.nombre}
                    </Button>
                  );
                })}
              </Col>
            </Row>
          </Col>
        </Row>
        {/* Tercera */}
        <Row>
          <Col>
            <Row>
              <Col className="pt-3 pb-2">
                <h5>Buscar por tallas: </h5>
              </Col>
            </Row>
            <Row>
              <Col>
                {tallasFiltro && (
                  <BtnTallas
                    tallasDisponibles={tallasFiltro}
                    tallaSelect={busqueda.tallas.tallas}
                    selectTallas={(nuevasTallas) => {
                      setBusqueda({
                        ...busqueda,
                        tallas: { name: "", tallas: nuevasTallas },
                      });

                      setBuscar(true);
                    }}
                  />
                )}
              </Col>
            </Row>
          </Col>
        </Row>
        {/* Cuarta */}
        <Row>
          <Col>
            <Row>
              <Col className="pt-3 pb-2">
                <h5>Buscar por precio: </h5>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button>hola</Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </>
    );
  };

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
            <Row>
              <Col md={2}>
                <Row
                  className="align-items-center justify-content-center"
                  style={{ fontSize: "11px !important" }}
                >
                  <Col md={8} xs={5} sm={4}>
                    <Form.Label className="fw-bold w-100 my-0 py-1 pb-1">
                      Filtro de Búsqueda
                    </Form.Label>
                  </Col>
                  {busqueda.categoria.id && (
                    <Col md={4} xs={2} sm={2}>
                      <Button
                        className="w-100 my-0 py-0 pb-1"
                        variant="outline-secondary"
                        onClick={() => {
                          setBusqueda({
                            ...busqueda,
                            categoria: { name: "", id: [] },
                          });
                          setBuscar(true);
                        }}
                      >
                        <AiOutlineClear />
                      </Button>
                    </Col>
                  )}
                </Row>
                <hr className="mb-1" />
                <Card className="py-3 px-3">
                  <BusquedaAvz />
                </Card>
              </Col>
              <Col>
                <Row
                  className="mb-3"
                  style={{ borderBottom: "1px solid #d2d8dd" }}
                >
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
              </Col>
            </Row>
          </div>
        </Card>
      </Card>
    </>
  );
};

export default Catalogo;
