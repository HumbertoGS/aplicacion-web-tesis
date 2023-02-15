import { useEffect, useState } from "react";

import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import PaginationTabla from "../components/PaginationTabla";

import { FaEye } from "react-icons/fa";
import { BsCheck2 } from "react-icons/bs";
import { RiCloseFill } from "react-icons/ri";
import { FiMinus } from "react-icons/fi";
import { BtnCambiarEstado } from "../components/BtnAccion";

const urlPedidos = `${process.env.REACT_APP_API_CORE_URL}pedido`;

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
    { name: "N° Transferencia", style: { width: "300px" } },
    { name: "Estado del Pedido", style: { width: "22%" } },
  ],
];

const TablaPedidos = ({
  Titulo,
  data,
  reload,
  detallesPedido,
  detallesCliente,
}) => {
  const [datos, setDatos] = useState(data);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(7);

  const handlePageChange = (page) => setCurrentPage(page);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const updateButtonState = (option, transferencia) => {
    if (option === 1) return true;
    if (option === 2) return !(transferencia !== null && transferencia !== "");
    return false;
  };

  const handleChange = (value, index, option) => {
    const updatedItems = [...currentItems];
    const item = updatedItems[index];

    if (option === 1) item.status = Number(value);
    if (option === 2) item.transferencia = value;

    item.disabled = updateButtonState(item.status, item.transferencia);
    setDatos(updatedItems);
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
                return (
                  <tr key={item.id}>
                    <td>{item.num_pedido}</td>
                    <td>{item.nombre_completo}</td>
                    <td>
                      <Button
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
                          value={item.transferencia ?? ""}
                          onChange={(event) =>
                            handleChange(event.target.value, index, 2)
                          }
                        />
                      </InputGroup>
                    </td>
                    <td>
                      <div className="d-flex ">
                        <Form.Select
                          className="mx-2"
                          value={item.status}
                          onChange={(event) =>
                            handleChange(event.target.value, index, 1)
                          }
                        >
                          <option value={1}>Pendiente</option>
                          <option value={2}>Pagado</option>
                          <option value={3}>Cancelado</option>
                        </Form.Select>
                        <BtnCambiarEstado
                          item={{
                            id: item.id,
                            transferencia: item.transferencia,
                            id_estado: item.status,
                            estado: true,
                          }}
                          nombreBtn={
                            item.status === 1 ? (
                              <FiMinus />
                            ) : item.status === 2 ? (
                              <BsCheck2 />
                            ) : (
                              <RiCloseFill />
                            )
                          }
                          reload={reload}
                          url={urlPedidos}
                        />
                      </div>
                    </td>
                  </tr>
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
