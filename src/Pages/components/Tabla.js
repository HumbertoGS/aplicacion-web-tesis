import { useState } from "react";
import Table from "react-bootstrap/esm/Table";
import Pagination from "react-bootstrap/Pagination";
import { BtnCambiarEstado } from "../components/BtnAccion";
import propertyTabla from "./propertyTabla";

const paginacionStyle = { display: "flex", justifyContent: "flex-end" };

const PaginationTabla = ({
  currentPage,
  itemsPerPage,
  totalItems,
  handlePageChange,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Pagination>
      <Pagination.First onClick={() => handlePageChange(1)} />
      <Pagination.Prev
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />
      {pageNumbers.map((number) => (
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => handlePageChange(number)}
        >
          {number}
        </Pagination.Item>
      ))}
      <Pagination.Next
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === pageNumbers.length}
      />
      <Pagination.Last onClick={() => handlePageChange(pageNumbers.length)} />
    </Pagination>
  );
};

const Tabla = ({ data, tabla, reload = () => {}, url = "/" }) => {
  const header = propertyTabla[tabla].header;
  const fieldsToShow = propertyTabla[tabla].fieldsToShow;

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
                      <BtnCambiarEstado item={item} reload={reload} url={url} />
                    </td>
                  ) : row === "precio" ? (
                    <td key={i}>${item[row]}</td>
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
