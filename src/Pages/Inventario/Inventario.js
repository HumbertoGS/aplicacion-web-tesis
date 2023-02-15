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

function Inventario() {
  const [productoTabla, setProductoTabla] = useState([]);
  const [buscarProductos, setBuscarProductos] = useState(true);

  // const [filtro, setFiltro] = useState("Categoria");

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
            <h5 className="text-center">Inventario de productos</h5>
            <hr />
            <Card
              className="px-3 py-4 d-flex align-items-end flex-row"
              style={{ justifyContent: "space-between" }}
            >
              <div className="d-flex align-items-end">
                <div
                  className="d-flex flex-column"
                  style={{ paddingRight: "40px" }}
                >
                  <h6 className="text-center">Búsqueda por fecha</h6>
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
                <BtnGuardar
                  datos={fecha}
                  handleRespond={(x) => setProductoTabla(x)}
                  mensajeResp="Búsqueda realizada"
                  url={urlProducto}
                />
                {/* <DropdownButton
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
                          // BuscarFiltro(item.id);
                        }}
                      >
                        {item.nombre}
                      </Dropdown.Item>
                    );
                  })}
                </DropdownButton>

                {filtro !== "Categoria" ? (
                  <Button
                    className="mx-2"
                    variant="outline-secondary"
                    onClick={() => {
                      setFiltro("Categoria");
                    }}
                  >
                    Limpiar Filtros
                  </Button>
                ) : (
                  <></>
                )} */}
              </div>
              <div>
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
            </Card>
            <div className="mt-4 px-4">
              <Tabla data={productoTabla} tabla="inventario" />
            </div>
          </div>
        </Col>
      </Row>
    </Card>
  );
}

export default Inventario;
