import { PostData } from "./useFetch";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { styleBtnCancel, styleBtnSave } from "../Pages/designer/styleBtn";

const BtnCambiarEstado = ({ item, reload, url }) => {
  const [cambiar, setCambiar] = useState(false);
  const [datos, setDatos] = useState(null);

  let style = item.estado ? styleBtnSave : styleBtnCancel;

  PostData(url + "/cambiarEstado", datos, cambiar, (x) => {
    setCambiar(false);
    reload();
  });

  const CambiarEstado = ({ id, estado }) => {
    setDatos({ id, estado: !estado });
    setCambiar(true);
  };

  return (
    <Button
      style={{
        border: "0px",
        width: "70px",
        ...style,
      }}
      onClick={() => {
        CambiarEstado(item);
      }}
    >
      {item.stock
        ? item.estado
          ? "Si"
          : "No"
        : item.estado
        ? "Activo"
        : "Inactivo"}
    </Button>
  );
};

const BtnGuardarDatos = ({ item, reload, url }) => {
  const [cambiar, setCambiar] = useState(false);
  const [datos, setDatos] = useState(null);

  let style = item.estado ? styleBtnSave : styleBtnCancel;

  PostData(url + "/cambiarEstado", datos, cambiar, (x) => {
    setCambiar(false);
    reload();
  });

  const CambiarEstado = ({ id, estado }) => {
    setDatos({ id, estado: !estado });
    setCambiar(true);
  };

  return (
    <Button
      style={{
        border: "0px",
        width: "70px",
        ...style,
      }}
      onClick={() => {
        CambiarEstado(item);
      }}
    >
      {item.estado ? "Activo" : "Inactivo"}
    </Button>
  );
};

export { BtnCambiarEstado, BtnGuardarDatos };
