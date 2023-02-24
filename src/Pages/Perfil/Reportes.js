import { useState } from "react";
import * as XLSX from "xlsx";

import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import InventarioPdf from "../pdfs/Inventario";
import Tabla from "../components/Tabla";

import { PostData } from "../../custom-hooks/useFetch";
import { PDFDownload } from "../pdfs/FuncionesPdf";
import { BtnGuardar } from "../components/BtnAccion";

import { RiFileExcel2Line } from "react-icons/ri";

const urlProducto = process.env.REACT_APP_API_CORE_URL + "producto/inventario";

const Reportes = () => {
  const [productoTabla, setProductoTabla] = useState([]);
  const [buscarProductos, setBuscarProductos] = useState(true);

  const [titulo, setTitulo] = useState("Fecha");
  const [estadoP, setEstadoP] = useState("");

  const [fecha, setFecha] = useState({
    fechaDesde: new Date().toISOString().substring(0, 10),
    fechaHasta: new Date().toISOString().substring(0, 10),
  });

  PostData(urlProducto, {}, buscarProductos, (dato) => {
    setProductoTabla(dato.datos);
    setBuscarProductos(false);
  });

  const exportToCSV = () => {
    const header = ["Inventario de inicio - fin"];
    const headerTabla = [
      "Codigo",
      "Producto",
      "Precio",
      "Categoria",
      "Descripcion",
      "Stock",
    ];

    const emptyRow = Array(header[0].length).fill("");
    const rows = [
      headerTabla,
      ...productoTabla.map((row) => Object.values(row)),
    ];

    const ws = XLSX.utils.aoa_to_sheet([header, emptyRow, ...rows]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Datos de inventario");

    const range = { s: { c: 0, r: 0 }, e: { c: 5, r: 0 } };
    ws["!merges"] = [range];
    ws["A1"].v = header[0];
    ws["A1"].s = {
      font: { bold: true, sz: 14 },
      alignment: { horizontal: "center", vertical: "center" },
    };

    for (let i = 0; i < headerTabla.length; i++) {
      const col = XLSX.utils.encode_col(i) + 3;
      ws[col].v = headerTabla[i];
      ws[col].s = {
        font: { bold: true, sz: 14 },
        alignment: { horizontal: "center", vertical: "center" },
      };
    }

    XLSX.writeFile(wb, "report.xlsx");
  };

  return (
    <Card body className="Card">
      <Row>
        <Col>
          <div className="mt-3">
            <Row>
              <Col md={2}></Col>
              <Col>
                <h5 className="text-center">Reportes por {titulo}</h5>
              </Col>
              <Col md={2}>
                <div className="pb-2">
                  <Button
                    variant="outline-secondary"
                    className="mx-2"
                    onClick={(e) => exportToCSV()}
                  >
                    <RiFileExcel2Line /> Excel
                  </Button>
                  <PDFDownload
                    children={
                      <InventarioPdf datos={productoTabla} fecha={fecha} />
                    }
                    fileName={`Inventario Desde ${fecha.fechaDesde} Hasta ${fecha.fechaHasta}.pdf`}
                    nameBtn="PDF"
                  />
                </div>
              </Col>
              <hr />
            </Row>
            <Card className="px-3 py-4">
              <Row className="align-items-center">
                <Col md={5} className="d-flex align-items-end">
                  <div
                    className="d-flex flex-column"
                    style={{ paddingRight: "40px" }}
                  >
                    <h6 className="text-center fw-bold">Por fecha</h6>
                    <hr className="my-0 mx-1" />
                    <div className="d-flex" style={{ marginTop: "10px" }}>
                      <div className="d-flex align-items-center mx-2">
                        <Form.Label className="px-2 my-0">Desde:</Form.Label>
                        <Form.Control
                          type="date"
                          value={fecha.fechaDesde}
                          onChange={(e) =>
                            setFecha({ ...fecha, fechaDesde: e.target.value })
                          }
                        />
                      </div>
                      <div className="d-flex align-items-center mx-2">
                        <Form.Label className="px-2 my-0">Hasta:</Form.Label>
                        <Form.Control
                          type="date"
                          value={fecha.fechaHasta}
                          onChange={(e) =>
                            setFecha({ ...fecha, fechaHasta: e.target.value })
                          }
                        />
                      </div>
                    </div>
                  </div>
                </Col>
                <Col md={3}>
                  <Form.Group className="px-4 d-flex flex-row align-items-center">
                    <Form.Label className="fw-bold w-50">
                      Por estado:
                    </Form.Label>
                    <Form.Select
                      className="mx-3 w-50"
                      defaultValue={""}
                      onChange={(event) => {
                        setEstadoP(event.target.value);
                      }}
                    >
                      <option value={""} disabled>
                        -
                      </option>
                      <option value={1}>Pendiente</option>
                      <option value={2}>Pagado</option>
                      <option value={3}>Cancelado</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group className="px-3 d-flex flex-row align-items-center">
                    <Form.Label className="fw-bold w-50">Por Stock:</Form.Label>
                    <Form.Select
                      className="mx-3 w-50"
                      defaultValue={""}
                      // onChange={(event) => {
                      //   setEstadoP(event.target.value);
                      // }}
                    >
                      <option value={""} disabled>
                        -
                      </option>
                      <option value={1}>Si</option>
                      <option value={2}>No</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <div className="pt-4 d-flex justify-content-center">
                <BtnGuardar
                  datos={fecha}
                  handleRespond={(x) => setProductoTabla(x)}
                  mensajeResp="Búsqueda realizada"
                  url={urlProducto}
                />
                <Button
                  className="mx-2 w-10"
                  variant="outline-secondary"
                  // disabled={!(busqueda.num_ident || busqueda.num_pedido)}
                  onClick={() => {}}
                >
                  Limpiar
                </Button>
              </div>
            </Card>
            <div className="mt-4 px-4">
              <Tabla data={productoTabla} tabla="inventario" />
            </div>
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default Reportes;