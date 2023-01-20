import Table from "react-bootstrap/Table";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Dropdown from "react-bootstrap/Dropdown";

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
  },
];
const Categorias = [
  { id: 1, name: "Zapatos", estado: true },
  { id: 2, name: "Vestidos", estado: true },
  { id: 3, name: "Camisas", estado: true },
  { id: 4, name: "Pantalones", estado: true },
];

function Inventario() {
  return (
    <div className="Card">
      <Breadcrumb>
        <Breadcrumb.Item href="Inicio">Inicio</Breadcrumb.Item>
        <Breadcrumb.Item active>Inventario</Breadcrumb.Item>
      </Breadcrumb>

      <h5 className="text-center">Inventario de productos</h5>
      <div>
        <Dropdown.Toggle className="body" >
          Filtro
          {/*{filtrarTabla} */}
        </Dropdown.Toggle>
      </div>
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
