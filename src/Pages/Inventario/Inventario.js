import Table from "react-bootstrap/Table";
import Breadcrumb from "react-bootstrap/Breadcrumb";

import {
    styleBtn,
    styleBtnCancel,
    styleBtnSave,
    styleBtns,
  } from "../designer/styleBtn";

const productoTabla = [
    {
      id: 1,
      producto: "Camisa",
      cantidad: 2,
      categoria: 3,
      descripcion: "para entrega inmediata",
    },
    {
        id: 2,
        producto: "Shorts",
        cantidad: 1,
        categoria: 5,
        descripcion: "para hombre",
    }
];
function Inventario() {
  return (
    <div className="Card">
      <Breadcrumb>
        <Breadcrumb.Item href="/">Inicio</Breadcrumb.Item>
        <Breadcrumb.Item active>Inventario</Breadcrumb.Item>
      </Breadcrumb>

      <h5 className="text-center">Inventario de productos</h5>
      <Table>
        <thead className="theadTable">
          <tr>
            <th>Codigo</th>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Categoria</th>
            <th>Descripcion</th>
          </tr>
        </thead>
        <tbody>
        {productoTabla.map((item, index) => {
          let style = item.estado ? styleBtnSave : styleBtnCancel;
          return (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.producto}</td>
              <td>{item.cantidad}</td>
              <td>{item.categoria}</td>
              <td>{item.descripcion}</td>
            </tr>
          );
        })}
      </tbody>
      </Table>
    </div>
  );
}

export default Inventario;
