import { useState } from "react";

import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import FormCustom from "../Registros/FormCustom";

const urlProducto = process.env.REACT_APP_API_CORE_URL + "producto";

const AgregarInventario = ({
  producto,
  Categorias,
  agregar,
  show,
  onHide,
  reloadProductos,
}) => {
  const [file] = useState(producto.imagen);

  //-------------------VISUALIZAR IMAGEN A SUBIR-------------------

  const [viewImagen, setViewImagen] = useState(null);

  const view_img = (files, imagen) => {
    const reader = new FileReader();
    reader.readAsDataURL(files);

    reader.onload = () => {
      setViewImagen(reader.result);
      imagen.imagen = reader.result;
    };
  };

  return (
    <Modal
      show={show}
      onHide={() => {
        producto.imagen = file;
        onHide();
      }}
      centered
      size="lg"
    >
      <div className="">
        <Modal.Header closeButton>
          <Modal.Title>
            <h5>AGREGAR PRODUCTO</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="Card py-2">
            <FormCustom
              valuesForm={producto}
              handleRespond={(x) => {
                console.log(x);
                reloadProductos();
                onHide();
              }}
              opcion="productoEditar"
              propsBtn={{
                mensajeResp: "Se actualizó datos del producto",
                url: `${urlProducto}/insert`,
                nameBtn: "Guardar Cambios",
              }}
              moreProp={{
                editar: true,
                agregar,
                size: 7,
                viewImagen,
                Categorias,
                file: (e, imagen) => {
                  if (e.target.files[0]) {
                    view_img(e.target.files[0], imagen);
                  }
                },
              }}
            />
          </Card>
        </Modal.Body>
      </div>
    </Modal>
  );
};

export default AgregarInventario;
