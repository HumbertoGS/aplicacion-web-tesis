import { useState } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import InputGroup from "react-bootstrap/InputGroup";

import { PostData } from "../../../custom-hooks/useFetch";
import { BtnCambiarEstado } from "../../components/BtnAccion";

const url = `${process.env.REACT_APP_API_CORE_URL}pedido/detalle`;

const style = {
  modal: { fontSize: "15px" },
  input: { right: { width: "125px" }, left: { width: "332px" } },
  label: { fontSize: "11px" },
};

const PedidoDetalles = ({ data, filtro, reload, show, onHide }) => {
  const [key, setKey] = useState("Producto1");

  const [detalles, setDetalles] = useState(null);
  const [buscar, setBuscar] = useState(true);

  const [click, setClick] = useState(false);

  const className =
    filtro?.status === "1" ? "d-flex flex-column align-items-center" : "d-none";

  PostData(url, { num_venta: data?.num_venta }, buscar, (result) => {
    if (result?.datos) {
      let data = result.datos;
      setDetalles(data);
    }
    setBuscar(false);
  });

  return (
    <Modal
      show={show}
      onHide={() => {
        onHide();
        if (click) reload();
      }}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title style={style.modal}>Detalles de pedido</Modal.Title>
      </Modal.Header>
      <Modal.Body style={style.modal}>
        <InputGroup size="sm" className="mb-3">
          <InputGroup.Text style={style.input.right}>CLIENTE</InputGroup.Text>
          <InputGroup.Text className="bg-white noEdit" style={style.input.left}>
            {data?.cliente}
          </InputGroup.Text>
        </InputGroup>
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3 fs-6"
        >
          {detalles &&
            detalles.map((item, index) => {
              return (
                <Tab
                  key={index}
                  eventKey={"Producto" + (index + 1)}
                  title={"Producto #" + (index + 1)}
                >
                  <div key={index}>
                    <InputGroup size="sm" className="mb-3 px-3">
                      <InputGroup.Text className="w-25">
                        Producto
                      </InputGroup.Text>
                      <InputGroup.Text className="w-75 bg-white noEdit">
                        {item?.producto}
                      </InputGroup.Text>
                    </InputGroup>
                    <InputGroup size="sm" className="mb-3 px-3">
                      <InputGroup.Text className="w-25">
                        Categoria
                      </InputGroup.Text>
                      <InputGroup.Text className="w-75 bg-white noEdit">
                        {item?.nombre_categoria}
                      </InputGroup.Text>
                    </InputGroup>
                    <InputGroup size="sm" className="mb-3 px-3">
                      <InputGroup.Text className="w-25">
                        Precio x unidad
                      </InputGroup.Text>
                      <InputGroup.Text className="w-75 bg-white noEdit">
                        {item?.precio_unidad}
                      </InputGroup.Text>
                    </InputGroup>
                    <InputGroup size="sm" className="mb-3 px-3">
                      <InputGroup.Text className="w-25">
                        Cantidad
                      </InputGroup.Text>
                      <InputGroup.Text className="w-75 bg-white noEdit">
                        {item?.cantidad}
                      </InputGroup.Text>
                    </InputGroup>
                    <InputGroup size="sm" className="mb-3 px-3">
                      <InputGroup.Text className="w-25">Total</InputGroup.Text>
                      <InputGroup.Text className="w-75 bg-white noEdit">
                        {item?.total}
                      </InputGroup.Text>
                    </InputGroup>
                  </div>
                  <div>
                    <label>Otros Detalles</label>
                    <hr />
                    <div className="d-flex align-items-center">
                      <div className="w-50">
                        <InputGroup size="sm" className="mb-3 px-3">
                          <InputGroup.Text className="w-50">
                            Stock
                          </InputGroup.Text>
                          <InputGroup.Text className="w-50 bg-white noEdit">
                            {item?.stock ? "Si" : "No"}
                          </InputGroup.Text>
                        </InputGroup>
                        <InputGroup size="sm" className="mb-3 px-3">
                          <InputGroup.Text className="w-50">
                            Estado
                          </InputGroup.Text>
                          <InputGroup.Text className="w-50 bg-white noEdit">
                            {item?.estado ? "Pedido" : "Cancelado"}
                          </InputGroup.Text>
                        </InputGroup>
                      </div>
                      <div className={"w-50 " + className}>
                        <BtnCambiarEstado
                          item={{ id: item.id, estado: item?.estado }}
                          nombreBtn={item?.estado ? "Activo" : "Cancelado"}
                          reload={() => {
                            const newDatos = [...detalles];
                            newDatos[index].estado = !item.estado;
                            setDetalles(newDatos);
                            setClick(true);
                          }}
                          url={url}
                        />
                        <label style={style.label} className="pt-2">
                          Click para {item.estado ? "cancelar " : "activar "}
                          pedido
                        </label>
                      </div>
                    </div>
                  </div>
                </Tab>
              );
            })}
        </Tabs>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="outline-secondary"
          className="w-25"
          onClick={() => {
            onHide();
            if (click) reload();
          }}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PedidoDetalles;
