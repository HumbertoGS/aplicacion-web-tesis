import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";

import { Formik } from "formik";
import { BtnGuardar } from "../components/BtnAccion";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

const FormCuerpo = ({
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
      <Row>
        <InputGroup className="mb-3 pt-2">
          <InputGroup.Text style={{ width: "17%" }}>Nombre</InputGroup.Text>
          <Form.Control
            type="text"
            name="nombre"
            value={values.nombre}
            onChange={handleChange}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text style={{ width: "17%" }}>
            Imagen
            <span style={{ color: "#eb0808" }} className="px-2">
              *
            </span>
          </InputGroup.Text>
          <Form.Control
            type="file"
            required
            onChange={(e) => {
              file(e, values);
            }}
          />
        </InputGroup>
      </Row>
      <Row>
        <Col>
          <InputGroup className="mb-3">
            <InputGroup.Text style={{ width: "35%" }}>
              Precio
              <span style={{ color: "#eb0808" }} className="px-2">
                *
              </span>
            </InputGroup.Text>
            <Form.Control
              className="w-50"
              name="precio"
              value={values.precio}
              onChange={handleChange}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text style={{ width: "35%" }}>
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
        </Col>
        <Col>
          <InputGroup className="mb-3">
            <InputGroup.Text
              style={{
                width: "37%",
              }}
            >
              Talla
            </InputGroup.Text>
            <Form.Control
              style={{
                width: "63%",
              }}
              name="talla"
              value={values.talla}
              onChange={handleChange}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text className="w-35">
              Categoria
              <span style={{ color: "#eb0808" }} className="px-2">
                *
              </span>
            </InputGroup.Text>
            <Dropdown>
              <Dropdown.Toggle
                // className="w-65"
                variant="outline"
                style={{
                  width: "63%",
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
          </InputGroup>
        </Col>
      </Row>
      <Row>
        <InputGroup className="mb-3">
          <InputGroup.Text style={{ width: "17%" }}>
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
      </Row>
    </>
  );
};

const FormCustom = ({
  Reinitialize = false,
  valuesForm,
  moreProp,
  url,
  handleRespond,
  mensajeResp,
  nameBtn,
}) => {
  return (
    <>
      <Formik
        enableReinitialize={Reinitialize}
        initialValues={valuesForm}
        onSubmit={(values, { resetForm }) => {
          resetForm();
        }}
      >
        {({ handleChange, handleBlur, values, touched, isValid, errors }) => (
          <Form className="px-4" noValidate>
            <FormCuerpo
              handleChange={handleChange}
              handleBlur={handleBlur}
              values={values}
              touched={touched}
              errors={errors}
              isValid={isValid}
              moreProp={moreProp}
            />
            <BtnGuardar
              datos={values}
              handleRespond={handleRespond}
              mensajeResp={mensajeResp}
              url={url}
              nameBtn={nameBtn}
            />
          </Form>
        )}
      </Formik>
    </>
  );
};

export default FormCustom;
