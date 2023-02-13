import { useState } from "react";

import Table from "react-bootstrap/esm/Table";
import Button from "react-bootstrap/Button";

import propertyTabla from "./propertyTabla";
import PaginationTabla from "./PaginationTabla";
import { BtnCambiarEstado } from "../components/BtnAccion";

import { HiPencil } from "react-icons/hi";

const paginacionStyle = { display: "flex", justifyContent: "flex-end" };

const Tabla = ({
  data,
  tabla,
  editarModal = (x) => {},
  reload = () => {},
  url = "/",
}) => {
  const { header, fieldsToShow } = propertyTabla[tabla];

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const handlePageChange = (page) => setCurrentPage(page);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <Table style={{ height: "270px" }}>
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
                {fieldsToShow.map((row, i) => {
                  return row === "stock" ? (
                    <td key={i}>
                      <BtnCambiarEstado
                        item={item}
                        reload={reload}
                        url={url}
                        habilitarBtn={false}
                      />
                    </td>
                  ) : row === "estado" ? (
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
                  ) : row === "precio" ? (
                    <td key={i}>${item[row]}</td>
                  ) : row === "editar" ? (
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
                  ) : row === "imagen" ? (
                    <td key={i}>
                      <img
                        width={50}
                        height={50}
                        src={item[row]}
                        alt={item["nombre_imagen"]}
                      />
                    </td>
                  ) : (
                    <td key={i}>{item[row]}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
      <div style={paginacionStyle}>
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

export default Tabla;
