import { useState, useEffect } from "react";
import Button from "react-bootstrap/esm/Button";

import MensajeAlert from "../components/MensajeAlert";
import { PostData } from "../../custom-hooks/useFetch";

const messages = {
  error: "Ups, parece que algo ha salido mal",
  noData: "La búsqueda no muestra resultado",
};

const variants = {
  error: "danger",
  noData: "warning",
  success: "success",
};

const styleBtn = {
  save: {
    backgroundColor: "#33d556",
  },
  warning: {
    backgroundColor: "#edb200",
  },
  cancel: {
    backgroundColor: "#d53a33",
  },
};

const datosAlert = (response, mensajeResp) => {
  const mensaje = response.error
    ? response.mensaje ?? messages.error
    : response.datos.length === 0
    ? messages.noData
    : mensajeResp;

  const variant = response.error
    ? response.codigo === 400
      ? variants.noData
      : variants.error
    : response.datos.length === 0
    ? variants.noData
    : variants.success;

  return { mostrar: true, mensaje, variant };
};

const styleBtnChange = (item, habilitarBtn) => {
  if (!habilitarBtn)
    return {
      fontWeight: "bold",
      background: "none",
      color: item?.stock ? "#33d556" : "#d53a33",
    };

  if (item.id_estado)
    return item.id_estado === 1
      ? styleBtn.warning
      : item.id_estado === 2
      ? styleBtn.save
      : styleBtn.cancel;

  if (item.estado || item?.stok) return styleBtn.save;

  return styleBtn.cancel;
};

//---------------------Boton para actualizar datos-----------------------
const BtnGuardar = ({
  datos,
  url,
  handleRespond,
  mensajeResp,
  nameBtn = "Buscar",
  disabled = false,
  width = "auto",
  resetForm = () => {},
}) => {
  const [guardar, setGuardar] = useState(false);
  const [mensajeAlert, setMensajeAlert] = useState({
    mostrar: false,
    mensaje: "",
    variant: "",
  });

  const funcionRespuesta = (response) => {
    handleRespond(response.datos);
    resetForm();
    setGuardar(false);
    setMensajeAlert(datosAlert(response, mensajeResp));
  };

  PostData(url, datos, guardar, funcionRespuesta);

  useEffect(() => {
    if (mensajeAlert.mostrar) {
      const interval = setTimeout(() => {
        setMensajeAlert({ mostrar: false, mensaje: "", variant: "" });
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [mensajeAlert.mostrar]);

  return (
    <div>
      {mensajeAlert.mostrar && (
        <MensajeAlert
          variant={mensajeAlert.variant}
          mensaje={mensajeAlert.mensaje}
        />
      )}
      <div className="d-flex justify-content-center">
        <Button
          style={{ width }}
          variant="outline-secondary"
          disabled={disabled}
          onClick={() => setGuardar(true)}
        >
          {nameBtn}
        </Button>
      </div>
    </div>
  );
};

//---------------------Boton para actualizar estados-----------------------
const BtnCambiarEstado = ({
  item,
  reload,
  url,
  habilitarBtn = true,
  disabled = false,
  nombreBtn = false,
}) => {
  const [cambiar, setCambiar] = useState(false);
  const [datos, setDatos] = useState(null);
  const [mensajeAlert, setMensajeAlert] = useState({
    mostrar: false,
    mensaje: "",
    variant: "",
  });

  let style = styleBtnChange(item, habilitarBtn);

  const CambiarEstado = (datos) => {
    setDatos({ ...datos, estado: !datos.estado });
    setCambiar(true);
  };

  const funcionRespuesta = (response) => {
    setCambiar(false);
    setMensajeAlert(datosAlert(response, "Se actualizo el estado"));
    reload();
  };

  PostData(url + "/cambiarEstado", datos, cambiar, funcionRespuesta);

  useEffect(() => {
    if (mensajeAlert.mostrar) {
      const interval = setTimeout(() => {
        setMensajeAlert({ mostrar: false, mensaje: "", variant: "" });
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [mensajeAlert.mostrar]);

  return (
    <>
      {mensajeAlert.mostrar && (
        <MensajeAlert
          variant={mensajeAlert.variant}
          mensaje={mensajeAlert.mensaje}
        />
      )}
      <Button
        className="BtnEstado"
        style={style}
        onClick={() => CambiarEstado(item)}
        disabled={disabled}
      >
        {nombreBtn ? nombreBtn : item.estado ? "Activo" : "Inactivo"}
      </Button>
    </>
  );
};

export { BtnCambiarEstado, BtnGuardar };
