import { useState } from "react";

import Table from "react-bootstrap/esm/Table";
import Button from "react-bootstrap/Button";

import propertyTabla from "./propertyTabla";
import PaginationTabla from "./PaginationTabla";
import { BtnCambiarEstado } from "../components/BtnAccion";

import { HiPencil } from "react-icons/hi";

const Tabla = ({
  data,
  tabla,
  editarModal = (x) => {},
  reload = () => {},
  url = "/",
  height = "300px",
}) => {
  const { header, fieldsToShow } = propertyTabla[tabla];

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const handlePageChange = (page) => setCurrentPage(page);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const renderTableCell = (row, item, i) => {
    switch (row) {
      case "stock":
        return (
          <td key={i}>
            <BtnCambiarEstado
              item={item}
              reload={reload}
              url={url}
              habilitarBtn={false}
              disabled={true}
              nombreBtn={item.stock ? "Si" : "No"}
            />
          </td>
        );
      case "estado":
        return (
          <td key={i}>
            <BtnCambiarEstado
              item={{
                id: item.id,
                estado: item.estado ?? item.stock,
              }}
              reload={reload}
              url={url}
            />
          </td>
        );
      case "editar":
        return (
          <td key={i}>
            <Button
              variant="outline-secondary"
              onClick={() => {
                editarModal(item);
              }}
            >
              <HiPencil />
            </Button>
          </td>
        );
      case "imagen":
        return (
          <td key={i}>
            <img
              width={50}
              height={50}
              src={item[row]}
              alt={item["nombre_imagen"]}
            />
          </td>
        );
      case "precio":
        return <td key={i}>${item[row]}</td>;
      default:
        return <td key={i}>{item[row]}</td>;
    }
  };

  return (
    <>
      <div style={{ height }}>
        <Table className="text-center">
          <thead className="theadTable">
            <tr>
              {header.map((item, index) => (
                <th key={index}>{item}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => {
              return (
                <tr key={index}>
                  {fieldsToShow.map((row, i) => renderTableCell(row, item, i))}
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
    </>
  );
};

export default Tabla;
