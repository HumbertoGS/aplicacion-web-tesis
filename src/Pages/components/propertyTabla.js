const propertyTabla = {
  inventario: {
    header: [
      "Codigo",
      "Producto",
      "Precio Unitario",
      "Categoria",
      "Cantidad",
      "Stock",
    ],
    fieldsToShow: [
      "codigo",
      "nombre",
      "precio",
      "nombre_categoria",
      "cantidad",
      "stock",
    ],
  },
  empleado: {
    header: ["Nombre", "Apellido", "Cedula", "Estado"],
    fieldsToShow: ["nombre", "apellido", "cedula", "estado"],
  },
  categoria: {
    header: ["Nombre", "Estado"],
    fieldsToShow: ["nombre", "estado"],
  },
  producto: {
    header: [
      "Imagen",
      "Nombre",
      "Categoria",
      "Talla",
      "Precio",
      "Cantidad",
      "Editar",
      "Tiene Stock",
    ],
    fieldsToShow: [
      "imagen",
      "nombre",
      "nombre_categoria",
      "talla",
      "precio",
      "cantidad",
      "editar",
      "estado",
    ],
  },
};

export default propertyTabla;
