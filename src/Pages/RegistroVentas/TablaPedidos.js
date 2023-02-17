import { useState } from "react";

import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Card, Row } from "react-bootstrap";

import PaginationTabla from "../components/PaginationTabla";
import { BtnCambiarEstado } from "../components/BtnAccion";

import { FaEye } from "react-icons/fa";
import { BsCheck2 } from "react-icons/bs";
import { RiCloseFill } from "react-icons/ri";
import { FiMinus } from "react-icons/fi";

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

const addZeros = (str) => {
  str = str.toString();
  const desiredLength = 5;
  const currentLength = str.length;
  const zerosToAdd = desiredLength - currentLength;
  return "0".repeat(zerosToAdd) + str;
};

const TablaPedidos = ({
  Titulo,
  filtro,
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
    if (option === 1) return false;
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

  const Header = () => {
    const alignItem =
      filtro?.num_pedido && filtro?.num_ident ? "-center" : "-baseline";

    return (
      <Row>
        <div
          className={"d-flex align-items" + alignItem}
          style={{ width: "300px" }}
        >
          {filtro && (
            <>
              <h5 className="px-2">Filtrado:</h5>
              <div className="text-start">
                {filtro?.num_pedido && (
                  <h6>
                    N° Pedido:{" "}
                    <span className="fw-normal">{filtro?.num_pedido}</span>
                  </h6>
                )}
                {filtro?.num_ident && (
                  <h6>
                    N° Identificación:{" "}
                    <span className="fw-normal">{filtro?.num_ident}</span>
                  </h6>
                )}
              </div>
            </>
          )}
        </div>
        <h5 className="text-center" style={{ width: "600px" }}>
          {Titulo}
        </h5>
        <hr className="mt-2" />
      </Row>
    );
  };

  return (
    <Card body className="mt-4">
      <div className="my-2">
        <Header />
        <div style={{ overflowY: "auto", minHeight: "54vh" }}>
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
                    <td>{addZeros(item.num_pedido)}</td>
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
                      <InputGroup className="d-flex flex-column">
                        <Form.Control
                          className="w-100"
                          style={{ marginLeft: "10px", borderRadius: "5px" }}
                          value={item.transferencia ?? ""}
                          disabled={
                            item?.status !== 2 || filtro?.status === "2"
                          }
                          onChange={(event) =>
                            handleChange(event.target.value, index, 2)
                          }
                        />
                        <label
                          className="fw-bold"
                          style={{
                            fontSize: "9px",
                            color: "#c50f07",
                            fontStyle: "italic",
                          }}
                        >
                          {item.disabled ? "campo requerido" : ""}
                        </label>
                      </InputGroup>
                    </td>
                    <td>
                      <div className="d-flex">
                        <Form.Select
                          className="mx-2"
                          value={item.status}
                          disabled={filtro?.status === "2"}
                          onChange={(event) =>
                            handleChange(event.target.value, index, 1)
                          }
                        >
                          <option value={1}>Pendiente</option>
                          {filtro?.status !== "3" ? (
                            <option value={2}>Pagado</option>
                          ) : (
                            <></>
                          )}
                          <option value={3}>Cancelado</option>
                        </Form.Select>
                        {filtro?.status !== "2" ? (
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
                            disabled={item.disabled}
                            reload={reload}
                            url={urlPedidos}
                          />
                        ) : null}
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
    </Card>
  );
};

export default TablaPedidos;
