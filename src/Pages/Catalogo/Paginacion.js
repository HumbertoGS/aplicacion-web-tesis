import { useState } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Row from "react-bootstrap/Row";

import ProductoCatalogo from "./Producto-Catalogo";

import { GrFormPrevious, GrFormNext } from "react-icons/gr";

const CatalogoProductos = ({ data, datosCarrito }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(8);

  // Get current data
  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  let currentData = data.slice(indexOfFirstData, indexOfLastData);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  let reset = false;

  if (currentData.length === 0) {
    reset = true;
    currentData = data.slice(0, dataPerPage);
  }

  return (
    <div>
      <Pagination
        dataPerPage={dataPerPage}
        totalData={data.length}
        paginate={paginate}
        currentPage={reset ? 1 : currentPage}
      />
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

  const styleBtn = { color: "#0d6efd", border: "1px solid #b0bad2" };

  return (
    <ButtonGroup className="me-2" aria-label="First group">
      <Button
        onClick={() => paginate(1)}
        disabled={currentPage === 1}
        className="bg-white"
        style={styleBtn}
      >
        <GrFormPrevious />
        <GrFormPrevious style={{ margin: "-10px", marginRight: "0px" }} />
      </Button>
      <Button
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
        className="bg-white"
        style={styleBtn}
      >
        <GrFormPrevious />
      </Button>

      {pageNumbers.map((number) => (
        <Button
          key={number}
          onClick={() => paginate(number)}
          style={{
            border: "1px solid #b0bad2",
            background: currentPage === number ? "#0d6efd" : "#ffffff",
            color: currentPage === number ? "#ffffff" : "#000000",
          }}
        >
          {number}
        </Button>
      ))}
      <Button
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === pageNumbers.length}
        className="bg-white"
        style={styleBtn}
      >
        <GrFormNext />
      </Button>
      <Button
        onClick={() => paginate(pageNumbers.length)}
        disabled={currentPage === pageNumbers.length}
        className="bg-white"
        style={styleBtn}
      >
        <GrFormNext style={{ margin: "-18px", marginLeft: "5px" }} />
        <GrFormNext />
      </Button>
    </ButtonGroup>
  );
};

export { Pagination, CatalogoProductos };
