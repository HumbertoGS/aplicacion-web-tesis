import { useEffect, useState } from "react";

import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import { FaEye } from "react-icons/fa";
import { BsCheck2 } from "react-icons/bs";

import PaginationTabla from "../components/PaginationTabla";

import { styleBtn, styleBtnSave, styleBtns } from "../designer/styleBtn";

const columns = [
  [
    { name: "", colSpan: 1, style: { borderRight: "1px solid #c8c9ca" } },
    {
      name: "Cliente",
      colSpan: 2,
      style: { borderRight: "1px solid #c8c9ca" },
    },
    { name: "Pedido", colSpan: 3, style: { borderRight: "1px solid #c8c9ca" } },
    { name: "", colSpan: 2 },
  ],
  [
    {
      name: "N° Pedido",
      style: { width: "9%", borderRight: "1px solid #c8c9ca" },
    },
    { name: "Cliente", style: { width: "200px" } },
    {
      name: "Detalles",
      style: { width: "10%", borderRight: "1px solid #c8c9ca" },
    },
    { name: "N° Productos", style: { width: "11%" } },
    { name: "Total", style: { width: "9%" } },
    {
      name: "Detalles",
      style: { width: "10%", borderRight: "1px solid #c8c9ca" },
    },
    { name: "N° transferencia", style: { width: "300px" } },
    { name: "Acciones", style: { width: "22%" } },
  ],
];

const TablaPedidos = ({ Titulo, data, detallesPedido, detallesCliente }) => {
  const [datos, setDatos] = useState(data);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(7);

  const handlePageChange = (page) => setCurrentPage(page);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handleSelectChange = (event, index) => {
    const newDatos = [...currentItems];
    newDatos[index].status = event.target.value;
    setDatos(newDatos);
  };

  const handleInputChange = (event, index) => {
    const newDatos = [...currentItems];
    newDatos[index].transferencia = event.target.value;
    setDatos(newDatos);
  };

  const handleButtonClick = (index) => {
    console.log(
      `Id: ${datos[index].id}, Estado: ${datos[index].status}, num_transferencia: ${datos[index].transferencia}`
    );
  };

  return (
    <>
      <div className="my-4 mx-3" style={{ minHeight: "70vh" }}>
        <h5 className="text-center">{Titulo}</h5>
        <hr />
        <div style={{ overflowY: "auto", minHeight: "50vh" }}>
          <Table striped hover>
            <thead className="theadTable">
              {columns.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <th
                      key={j}
                      colSpan={cell.colSpan || 1}
                      style={cell.style || null}
                    >
                      {cell.name}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {currentItems.map((item, index) => {
                return item.estado ? (
                  <tr key={item.id}>
                    <td>{item.num_pedido}</td>
                    <td>{item.nombre_completo}</td>
                    <td>
                      <Button
                        style={styleBtn}
                        onClick={() => detallesCliente(item.num_identificacion)}
                        variant="outline-secondary"
                      >
                        <FaEye />
                      </Button>
                    </td>
                    <td>{item.num_producto}</td>
                    <td>{item.total}</td>
                    <td>
                      <Button
                        style={styleBtn}
                        onClick={() =>
                          detallesPedido({
                            num_venta: item.num_pedido,
                            cliente: item.nombre_completo,
                          })
                        }
                        variant="outline-secondary"
                      >
                        <FaEye />
                      </Button>
                    </td>
                    <td>
                      <InputGroup>
                        <Form.Control
                          style={{ marginLeft: "10px" }}
                          readOnly={item.validado}
                          disabled={item.validado}
                          value={item.transferencia}
                          onChange={(event) => handleInputChange(event, index)}
                        />
                      </InputGroup>
                    </td>
                    <td>
                      <div style={styleBtns}>
                        <Form.Select
                          className="mx-2"
                          value={item.status}
                          onChange={(event) => handleSelectChange(event, index)}
                        >
                          <option
                            disabled
                            value=""
                            style={{ fontStyle: "italic" }}
                          >
                            Estado Pedido
                          </option>
                          <option value="1">Pendiente</option>
                          <option value="2">Pagado</option>
                          <option value="0">Cancelado</option>
                        </Form.Select>
                        <Button
                          disabled={item.transferencia === ""}
                          style={{ ...styleBtn, ...styleBtnSave }}
                          onClick={() => handleButtonClick(index)}
                        >
                          <BsCheck2 />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  <></>
                );
              })}
            </tbody>
          </Table>
        </div>
        <PaginationTabla
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalItems={data.length}
          handlePageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default TablaPedidos;
