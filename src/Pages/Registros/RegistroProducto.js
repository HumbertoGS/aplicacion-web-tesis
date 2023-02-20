import { useState } from "react";

import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";

import EditarDatos from "./EditarDatos";
import FormCustom from "./FormCustom";
import Tabla from "../components/Tabla";

import { ReloadData } from "../../custom-hooks/useFetch";

const urlCategoria = `${process.env.REACT_APP_API_CORE_URL}categoria`;
const urlProducto = `${process.env.REACT_APP_API_CORE_URL}producto`;

const RegistroProducto = () => {
  const [editarModal, setEditarModal] = useState(null);
  const [datosModal, setDatosModal] = useState([]);

  //-------------------CATEGORIA-------------------
  const [Categorias, setCategorias] = useState([]);
  const [reload, setReload] = useState(true);

  ReloadData(urlCategoria, reload, (dato) => {
    setCategorias(dato.datos);
    setReload(false);
  });

  //-------------------TABLA DE PRODUCTOS-------------------

  const [productoTabla, setProductoTabla] = useState([]);
  const [reloadProductos, setReloadProductos] = useState(true);
  const [producto, setProducto] = useState(productoTabla);

  ReloadData(urlProducto, reloadProductos, (dato) => {
    setProductoTabla(dato.datos);
    setProducto(dato.datos);
    setReloadProductos(false);
  });

  //-------------------FILTRO PRODUCTOS-------------------

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

  //-------------------VISUALIZAR IMAGEN A SUBIR-------------------

  const [viewImagen, setViewImagen] = useState(null);

  const view_img = (files, imagen) => {
    const reader = new FileReader();
    reader.readAsDataURL(files);

    reader.onload = () => {
      setViewImagen(reader.result);
      imagen.imagen = reader.result;
    };
  };

  const [opcion, setOpcion] = useState(true);

  return (
    <>
      <Card body className="Card">
        <div className="mt-2">
          <h5 className="text-center">Registro de Producto y Categorias</h5>
          <div className="d-flex">
            <Button
              style={{ border: "0px", borderRadius: "0px" }}
              variant="outline-secondary"
              onClick={() => {
                setOpcion(!opcion);
                setViewImagen(null);
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
                    <FormCustom
                      valuesForm={{
                        nombre: "",
                      }}
                      handleRespond={(x) => {
                        setReload(true);
                      }}
                      opcion="categoria"
                      propsBtn={{
                        mensajeResp: "Se registro la categoria",
                        url: `${urlCategoria}/insert`,
                        nameBtn: "Registrar Categoria",
                      }}
                    />
                  </Card>
                </Col>
                <Col className="px-4 p-4 mt-4" xs={12} md={7}>
                  <Tabla
                    data={Categorias}
                    tabla="categoria"
                    reload={() => {
                      setReload(true);
                    }}
                    url={urlCategoria}
                  />
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
                            style={{
                              width: "100%",
                              // wordWrap: "break-word",
                              whiteSpace: "pre-line",
                            }}
                            className="text-start px-4 mx-4"
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
                          handleRespond={(x) => {
                            console.log(x);
                            setViewImagen(null);
                            setReloadProductos(true);
                          }}
                          opcion="producto"
                          propsBtn={{
                            mensajeResp: "Se registro el producto",
                            url: `${urlProducto}/insert`,
                            nameBtn: "Registrar Producto",
                          }}
                          moreProp={{
                            Categorias,
                            file: (e, imagen) => {
                              if (e.target.files[0]) {
                                view_img(e.target.files[0], imagen);
                              }
                            },
                          }}
                        />
                      </Col>
                      <Col md={5}>
                        <div
                          className="py-4 d-flex justify-content-center"
                          style={{
                            border: "1px solid #b8bcc0",
                            borderRadius: "12px",
                            height: "415px",
                            alignItems: "center",
                          }}
                        >
                          {viewImagen && (
                            <Card.Img
                              style={{
                                width: "370px",
                                maxHeight: "330px",
                              }}
                              src={viewImagen}
                            />
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
                  <div className="mt-3">
                    <Tabla
                      data={producto}
                      tabla="producto"
                      editarModal={(item) => {
                        setDatosModal(item);
                        setEditarModal(true);
                      }}
                      reload={() => {
                        setReloadProductos(true);
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

      {editarModal && (
        <EditarDatos
          producto={datosModal}
          Categorias={Categorias}
          show={editarModal}
          onHide={() => setEditarModal(false)}
          reloadProductos={() => setReloadProductos(true)}
        />
      )}
    </>
  );
};

export default RegistroProducto;
