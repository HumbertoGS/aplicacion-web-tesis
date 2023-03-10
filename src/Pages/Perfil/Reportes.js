import { useEffect, useState } from "react";
import * as XLSX from "xlsx";

import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import InventarioPdf from "../pdfs/Inventario";
import Tabla from "../components/Tabla";

import { PDFDownload } from "../pdfs/FuncionesPdf";
import { BtnGuardar } from "../components/BtnAccion";

import { RiFileExcel2Line } from "react-icons/ri";

const urlProducto = process.env.REACT_APP_API_CORE_URL + "producto/reporte";

const Reportes = ({ datosPDF, fechaGraf, fechaRep }) => {
  const [productoTabla, setProductoTabla] = useState([]);

  const [fecha, setFecha] = useState({
    fechaDesde: fechaRep.fechaDesde
      ? fechaRep.fechaDesde
      : new Date().toISOString().substring(0, 10),
    fechaHasta: fechaRep.fechaHasta
      ? fechaRep.fechaHasta
      : new Date().toISOString().substring(0, 10),
  });

  useEffect(() => {
    let producto = datosPDF?.datosProductoCantidad;

    setProductoTabla(producto);
    if (producto.length !== 0) {
      setFecha({
        fechaHasta: fecha.fechaHasta,
        fechaDesde: producto[producto.length - 1].fecha_registro,
      });
    }
  }, [datosPDF, fecha.fechaHasta]);

  //Excel
  const exportToCSV = () => {
    const header = ["Inventario de inicio - fin"];
    const headerTabla = [
      "Codigo",
      "Producto",
      "Precio",
      "Disponible",
      "Vendido",
      "Fecha Registro",
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
        <Col md={3}></Col>
        <Col md={6}>
          <h5 className="text-center">Reporte por Producto</h5>
        </Col>
        <Col md={3}>
          <div className="pb-2">
            {/* <Button
              variant="outline-secondary"
              className="mx-2"
              onClick={(e) => exportToCSV()}
            >
              <RiFileExcel2Line /> Excel
            </Button> */}
            <PDFDownload
              children={
                <InventarioPdf
                  datos={productoTabla}
                  fecha={fecha}
                  datosPDF={datosPDF}
                />
              }
              fileName={`Inventario Desde ${fecha.fechaDesde} Hasta ${fecha.fechaHasta}.pdf`}
              nameBtn="PDF"
            />
          </div>
        </Col>
        <hr />
      </Row>
      <Row className="pt-2 align-items-center justify-content-center">
        <Col md={7}>
          <Row className="align-items-center justify-content-center">
            <Col md={10}>
              <h6 className="text-center fw-bold">
                Busqueda por fecha registro
              </h6>
              <hr className="my-0 mx-1" />
              <Row className="my-2">
                <Col md={6} className="pb-1">
                  <div className="d-flex align-items-center mx-2">
                    <Form.Label className="px-2 my-0 w-25">Desde:</Form.Label>
                    <Form.Control
                      type="date"
                      value={fecha.fechaDesde}
                      onChange={(e) => {
                        setFecha({ ...fecha, fechaDesde: e.target.value });
                        fechaGraf({ ...fecha, fechaDesde: e.target.value });
                      }}
                      max={fecha.fechaHasta}
                    />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="d-flex align-items-center mx-2">
                    <Form.Label className="px-2 my-0 w-25">Hasta:</Form.Label>
                    <Form.Control
                      type="date"
                      value={fecha.fechaHasta}
                      onChange={(e) => {
                        setFecha({ ...fecha, fechaHasta: e.target.value });
                        fechaGraf({ ...fecha, fechaHasta: e.target.value });
                      }}
                      min={fecha.fechaDesde}
                    />
                  </div>
                </Col>
              </Row>
            </Col>
            <Col>
              <BtnGuardar
                datos={fecha}
                handleRespond={(datos) => {
                  let producto = datos?.datosProductoCantidad;
                  setProductoTabla(producto);
                }}
                mensajeResp="Búsqueda realizada"
                url={urlProducto}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <div
          className="mt-4 px-3"
          style={{
            width:
              window.screen.width < 420
                ? "350px"
                : window.screen.width < 500
                ? "375px"
                : window.screen.width < 575
                ? "400px"
                : "100%",
            overflow: "auto",
          }}
        >
          <Tabla data={productoTabla} tabla="inventario" />
        </div>
      </Row>
    </Card>
  );
};

export default Reportes;
