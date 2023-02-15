import { useEffect, useState } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";

import MensajeAlert from "../components/MensajeAlert";

import { PostData } from "../../custom-hooks/useFetch.js";
import { Formik } from "formik";

const messages = {
  error: "Ups, parece que algo ha salido mal",
  noData: "La búsqueda no muestra resultado",
};

const variants = {
  error: "danger",
  noData: "warning",
  success: "success",
};

const FormCuerpo = ({
  handleSubmit,
  handleChange,
  handleBlur,
  values,
  touched,
  isValid,
  errors,
  moreProp,
}) => {
  const { Categorias, file, filtro, setFiltro } = moreProp;

  return (
    <>
      <InputGroup className="mb-3 pt-2">
        <InputGroup.Text style={{ width: "100px" }}>Nombre</InputGroup.Text>
        <Form.Control
          type="text"
          name="nombre"
          value={values.nombre}
          onChange={handleChange}
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text style={{ width: "100px" }}>
          Imagen
          <span style={{ color: "#eb0808" }} className="px-2">
            *
          </span>
        </InputGroup.Text>
        <Form.Control type="file" required onChange={(e) => file(e)} />
      </InputGroup>
      <div className="d-flex">
        <InputGroup className="mb-3" style={{ width: "50%" }}>
          <InputGroup.Text style={{ width: "100px" }}>
            Categoria
            <span style={{ color: "#eb0808" }} className="px-2">
              *
            </span>
          </InputGroup.Text>
          <div style={{ width: "200px" }}>
            <Dropdown>
              <Dropdown.Toggle
                variant="outline"
                style={{
                  width: "100%",
                  border: "1px solid #dfe3e7",
                  borderRadius: "0px 4px 4px 0px",
                }}
              >
                {filtro}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {Categorias.map((item, index) => {
                  return item.estado ? (
                    <Dropdown.Item
                      key={index}
                      onClick={() => {
                        setFiltro(item.nombre);
                        values.categoria = item.id;
                      }}
                    >
                      {item.nombre}
                    </Dropdown.Item>
                  ) : (
                    <li key={index}></li>
                  );
                })}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </InputGroup>
        <InputGroup
          className="mb-3"
          style={{ marginLeft: "12px", width: "50%" }}
        >
          <InputGroup.Text style={{ width: "100px" }}>
            cantidad
            <span style={{ color: "#eb0808" }} className="px-2">
              *
            </span>
          </InputGroup.Text>
          <Form.Control
            type="text"
            name="cantidad"
            value={values.cantidad}
            onChange={handleChange}
          />
        </InputGroup>
      </div>
      <div className="d-flex">
        <InputGroup className="mb-3" style={{ width: "50%" }}>
          <InputGroup.Text style={{ width: "100px" }}>
            Precio
            <span style={{ color: "#eb0808" }} className="px-2">
              *
            </span>
          </InputGroup.Text>
          <div style={{ width: "200px" }}>
            <Form.Control
              name="precio"
              value={values.precio}
              onChange={handleChange}
              style={{
                borderRadius: "0px 4px 4px 0px",
              }}
            />
          </div>
        </InputGroup>
        <InputGroup
          className="mb-3"
          style={{ marginLeft: "12px", width: "50%" }}
        >
          <InputGroup.Text style={{ width: "100px" }}>Talla</InputGroup.Text>
          <Form.Control
            name="talla"
            value={values.talla}
            onChange={handleChange}
          />
        </InputGroup>
      </div>
      <InputGroup className="mb-3">
        <InputGroup.Text style={{ width: "100px" }}>
          Descripcion
        </InputGroup.Text>
        <Form.Control
          as="textarea"
          aria-label="With textarea"
          rows={3}
          style={{ resize: "none" }}
          name="descripcion"
          value={values.descripcion}
          onChange={handleChange}
        />
      </InputGroup>
    </>
  );
};

const FormCustom = ({
  /*---------------------Para Formik---------------------*/
  /*----*/ Reinitialize = false,
  /*----*/ saveAction,
  /*----*/ valuesForm,
  /*----*/ guardarDatos,
  /*----*/ disabled = false,
  /*----*/ nameBtn = "Guardar",
  /*----*/ moreProp,
  /*-----------Para Envio y Respuesta de Datos-----------*/
  /*----*/ url,
  /*----*/ datos,
  /*----*/ handleRespond,
  /*----*/ mensajeResp,
}) => {
  // const [guardar, setGuardar] = useState(saveAction);
  const [mensajeAlert, setMensajeAlert] = useState({
    mostrar: false,
    mensaje: "",
    variant: "",
  });

  const funcionRespuesta = (response) => {
    handleRespond(response.datos);
    // setGuardar(false);

    const message = response.error
      ? messages.error
      : response.datos.length === 0
      ? messages.noData
      : mensajeResp;

    const variant = response.error
      ? variants.error
      : response.datos.length === 0
      ? variants.noData
      : variants.success;

    setMensajeAlert({ mostrar: true, mensaje: message, variant });
  };

  console.log(saveAction);

  PostData(url, datos, saveAction, funcionRespuesta);

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
      <Formik
        enableReinitialize={Reinitialize}
        initialValues={valuesForm}
        onSubmit={(values, { resetForm }) => {
          guardarDatos(values);
          resetForm();
        }}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          touched,
          isValid,
          errors,
        }) => (
          <Form className="px-4" noValidate onSubmit={handleSubmit}>
            <FormCuerpo
              handleChange={handleChange}
              handleBlur={handleBlur}
              values={values}
              touched={touched}
              errors={errors}
              isValid={isValid}
              moreProp={moreProp}
            />
            <Button
              className="w-100"
              type="submit"
              variant="outline-secondary"
              disabled={disabled}
            >
              {nameBtn}
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default FormCustom;
