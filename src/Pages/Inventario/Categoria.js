import { useState } from "react";

import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import FormCustom from "../Registros/FormCustom";
import Tabla from "../components/Tabla";

const Categoria = ({ Categorias, show, onHide, reload, urlCategoria }) => {
  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <div>
        <Modal.Header closeButton>
          <Modal.Title>
            <h5>Categoria</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="Card py-2">
            <Row>
              <Col xs={12} md={5}>
                <Card className="Card py-4 px-1 mt-3">
                  <h5 className="px-3">Agregar una Categoria</h5>
                  <hr />
                  <FormCustom
                    valuesForm={{
                      nombre: "",
                    }}
                    handleRespond={reload}
                    opcion="categoria"
                    propsBtn={{
                      mensajeResp: "Se registro la categoria",
                      url: `${urlCategoria}/insert`,
                      nameBtn: "Registrar Categoria",
                    }}
                  />
                </Card>
              </Col>
              <Col className=" p-4 mt-4" xs={12} md={7}>
                <Tabla
                  data={Categorias}
                  tabla="categoria"
                  reload={reload}
                  url={urlCategoria}
                />
              </Col>
            </Row>
          </Card>
        </Modal.Body>
      </div>
    </Modal>
  );
};

export default Categoria;
