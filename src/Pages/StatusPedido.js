import { useEffect, useState } from "react";

import Breadcrumb from "react-bootstrap/Breadcrumb";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

import MensajeAlert from "./MensajeAlert";

const StatusPedido = () => {
  const [mensaje, setMensaje] = useState("");
  const [variant, setVariant] = useState("");

  useEffect(() => {
    if (variant) {
      const interval = setTimeout(() => {
        setVariant("");
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [variant]);

  return (
    <>
      <Card body className="Card">
        {variant ? <MensajeAlert variant={variant} mensaje={mensaje} /> : <></>}
        <Breadcrumb>
          <Breadcrumb.Item href="/">Inicio</Breadcrumb.Item>
          <Breadcrumb.Item active>Status-Pedido</Breadcrumb.Item>
        </Breadcrumb>
        <Card>
          <div className="mx-4 mt-4">
            <h5 className="text-center">Status de Pedidos</h5>
            <hr />
          </div>
          <div className="m-4" style={{ width: "400px" }}>
            <InputGroup className="mb-3">
              <InputGroup.Text style={{ width: "100px" }}>
                Identificación
              </InputGroup.Text>
              <Form.Control maxLength={10} />
              <Button>Buscar</Button>
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text style={{ width: "100px" }}>
                N° Pedido
              </InputGroup.Text>
              <Form.Control maxLength={10} />
              <Button>Buscar</Button>
            </InputGroup>
          </div>
          <div className="p-4" style={{ overflowY: "auto", height: "300px" }}>
            <Table>
              <thead className="theadTable">
                <tr>
                  <th>Codigo</th>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                {/* {Categorias.map((item, index) => {
                  let style = item.estado ? styleBtnSave : styleBtnCancel;
                  return (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>
                        <Button
                          style={{
                            border: "0px",
                            width: "70px",
                            ...style,
                          }}
                        >
                          {item.estado ? "Activo" : "Inactivo"}
                        </Button>
                      </td>
                    </tr>
                  );
                })} */}
              </tbody>
            </Table>
          </div>
        </Card>
      </Card>
    </>
  );
};

export default StatusPedido;
