import { useState } from "react";

import Row from "react-bootstrap/esm/Row";

import ProductoCatalogo from "./Producto-Catalogo";

const CatalogoProductos = ({ data, datosCarrito }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(4);

  // Get current data
  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  let currentData = data.slice(indexOfFirstData, indexOfLastData);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  let reset = false;

  if (currentData.length == 0) {
    reset = true;
    currentData = data.slice(0, dataPerPage);
  }

  return (
    <div>
      <Row xs={2} md={4} className="g-4 px-2 py-3">
        {currentData.map((item, index) => {
          return (
            <ProductoCatalogo
              key={index}
              producto={item}
              datosCarrito={datosCarrito}
            />
          );
        })}
      </Row>
      <Pagination
        dataPerPage={dataPerPage}
        totalData={data.length}
        paginate={paginate}
        currentPage={reset ? 1 : currentPage}
      />
    </div>
  );
};

const Pagination = ({ dataPerPage, totalData, paginate, currentPage }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalData / dataPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <a
              onClick={() => paginate(number)}
              className="page-link"
              style={{
                background: currentPage == number ? "#c7d5ff" : "#ffffff",
                cursor: "pointer",
              }}
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export { Pagination, CatalogoProductos };
