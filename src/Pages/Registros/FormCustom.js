import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

import { Formik } from "formik";
import { BtnGuardar } from "../components/BtnAccion";

const FormProducto = ({ handleChange, values, isValid, errors, moreProp }) => {
  const { Categorias, file } = moreProp;

  const categoriaActive = Categorias.filter((item) => item.estado !== false);

  const width = "35%";

  return (
    <>
      <Row>
        <InputGroup className="mb-3 pt-2">
          <InputGroup.Text style={{ width: "17%" }}>Nombre</InputGroup.Text>
          <Form.Control
            autoComplete="off"
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
            <InputGroup.Text style={{ width }}>
              Precio
              <span style={{ color: "#eb0808" }} className="px-2">
                *
              </span>
            </InputGroup.Text>
            <Form.Control
              className="w-50"
              autoComplete="off"
              name="precio"
              value={values.precio}
              onChange={handleChange}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text style={{ width }}>
              cantidad
              <span style={{ color: "#eb0808" }} className="px-2">
                *
              </span>
            </InputGroup.Text>
            <Form.Control
              autoComplete="off"
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
                width,
              }}
            >
              Talla
            </InputGroup.Text>
            <Form.Control
              autoComplete="off"
              name="talla"
              value={values.talla}
              onChange={handleChange}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text
              style={{
                width,
              }}
            >
              Categoria
              <span style={{ color: "#eb0808" }} className="px-2">
                *
              </span>
            </InputGroup.Text>
            <Form.Select
              autoComplete="off"
              name="categoria"
              value={values.categoria}
              onChange={handleChange}
            >
              <option value={""} disabled>
                Selecciona categoria
              </option>
              {categoriaActive.map((item, index) => {
                return (
                  <option key={index} value={item.id}>
                    {item.nombre}
                  </option>
                );
              })}
            </Form.Select>
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
            autoComplete="off"
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

const FormCategoria = ({ handleChange, values, isValid, errors }) => {
  return (
    <InputGroup className="mb-3">
      <InputGroup.Text className="w-25">Nombre</InputGroup.Text>
      <Form.Control
        type="text"
        autoComplete="off"
        name="nombre"
        value={values.nombre}
        onChange={handleChange}
      />
    </InputGroup>
  );
};

const disabled = (values, opcion) => {
  if (opcion === "categoria") return !values?.nombre;
  if (opcion === "producto")
    return !(
      values?.imagen &&
      values?.precio &&
      values?.cantidad &&
      values?.categoria
    );
};

const FormPresent = (
  opcion,
  moreProp,
  { handleChange, values, isValid, errors }
) => {
  switch (opcion) {
    case "categoria":
      return (
        <FormCategoria
          handleChange={handleChange}
          values={values}
          errors={errors}
          isValid={isValid}
        />
      );
    case "producto":
      return (
        <FormProducto
          handleChange={handleChange}
          values={values}
          errors={errors}
          isValid={isValid}
          moreProp={moreProp}
        />
      );
    default:
      <></>;
  }
};

const FormCustom = ({
  Reinitialize = false,
  valuesForm,
  handleRespond,
  opcion,
  moreProp = () => {},
  propsBtn
}) => {

  return (
    <>
      <Formik enableReinitialize={Reinitialize} initialValues={valuesForm}>
        {({ handleChange, values, isValid, errors, resetForm }) => (
          <Form className="px-4" noValidate>
            {FormPresent(opcion, moreProp, {
              handleChange,
              values,
              isValid,
              errors,
            })}
            <BtnGuardar
              datos={values}
              handleRespond={handleRespond}
              mensajeResp={propsBtn.mensajeResp}
              url={propsBtn.url}
              nameBtn={propsBtn.nameBtn}
              disabled={disabled(values, opcion)}
              resetForm={() => resetForm()}
            />
          </Form>
        )}
      </Formik>
    </>
  );
};

export default FormCustom;
