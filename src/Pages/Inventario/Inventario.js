import { useState } from "react";

import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

import { ReloadData } from "../../custom-hooks/useFetch";

import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

import PedidoPdf from "../pdfs/Pedido";
import { PDFDownload } from "../pdfs/FuncionesPdf";

import { VscFilePdf } from "react-icons/vsc";
import { RiFileExcel2Line } from "react-icons/ri";

const Categorias = [
  { id: 1, nombre: "Zapatos", estado: true },
  { id: 2, nombre: "Vestidos", estado: true },
  { id: 3, nombre: "Camisas", estado: true },
  { id: 4, nombre: "Pantalones", estado: true },
];

const urlProducto = process.env.REACT_APP_API_CORE_URL + "producto";

function Inventario() {
  const [productoTabla, setProductoTabla] = useState([]);
  const [buscarProductos, setBuscarProductos] = useState(true);

  const [filtro, setFiltro] = useState("Categoria");

  ReloadData(urlProducto, buscarProductos, (dato) => {
    let data = dato.datos.map((item) => {
      return {
        codigo: item.codigo,
        producto: item.nombre,
        precio: item.precio,
        categoria: item.nombre_categoria,
        descripcion: item.descripcion,
        stock: item.cantidad,
      };
    });
    setProductoTabla(data);
    setBuscarProductos(false);
  });

  const exportToCSV = () => {
    console.log(productoTabla);

    // const ws = XLSX.utils.json_to_sheet(productoTabla);
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
    // const style = { font: { bold: true }, alignment: { horizontal: "center" } };
    // setCellStyle(ws["A1"], style);

    // Establecer formato para headerTabla
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
              className="px-3 py-4 d-flex align-items-end"
              style={{ justifyContent: "space-between", flexDirection: "row" }}
            >
              <div className="d-flex align-items-end">
                <div
                  className="d-flex"
                  style={{ flexDirection: "column", paddingRight: "40px" }}
                >
                  <h6 className="text-center">Búsqueda por fecha</h6>
                  <hr className="my-0 mx-1" />
                  <div className="d-flex" style={{ marginTop: "10px" }}>
                    <div className="d-flex align-items-center mx-2">
                      <Form.Label className="px-2 my-0">Desde:</Form.Label>
                      <Form.Control type="date" />
                    </div>
                    <div className="d-flex align-items-center mx-2">
                      <Form.Label className="px-2 my-0">Hasta:</Form.Label>
                      <Form.Control type="date" />
                    </div>
                  </div>
                </div>
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
                )}
              </div>
              <div>
                <Button
                  variant="outline-secondary"
                  className="mx-2"
                  onClick={(e) => exportToCSV()}
                >
                  <RiFileExcel2Line /> Excel
                </Button>
                {/* <PDFDownloadLink
                  document={<PedidoPdf data={productoTabla} />}
                  fileName="Inventario-inicio-fin.pdf"
                >
                  <Button variant="outline-secondary" className="mx-2">
                    <VscFilePdf /> PDF
                  </Button>
                </PDFDownloadLink> */}
                <PDFDownload children={[]} fileName="Inventario-inicio-fin.pdf" nameBtn="PDF"/>
              </div>
            </Card>
            <div className="mt-4 px-4">
              <Table>
                <thead className="theadTable">
                  <tr>
                    <th>Codigo</th>
                    <th>Producto</th>
                    {/* <th>Cantidad</th> */}
                    <th>Precio Unitario</th>
                    <th>Categoria</th>
                    <th>Descripcion</th>
                    <th>Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {productoTabla.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{item.codigo}</td>
                        <td>{item.producto}</td>
                        {/* <td>{item.cantidad}</td> */}
                        <td>${item.precio}</td>
                        <td>{item.categoria}</td>
                        <td>{item.descripcion}</td>
                        <td>{item.stock}</td>
                        {/* <td>{item.stock ? "Si" : "No"}</td> */}
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </div>
        </Col>
      </Row>
      {/* </Card> */}
    </Card>
  );
}

export default Inventario;
