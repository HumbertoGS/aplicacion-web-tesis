const propertyTabla = {
  inventario: {
    header: [
      "Codigo",
      "Producto",
      "Precio",
      "Cantidad",
      "Categoria",
      "Registro",
      "Stock",
    ],
    fieldsToShow: [
      "codigo",
      "nombre",
      "precio",
      "cantidad",
      "nombre_categoria",
      "fecha_registro",
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
      "Precio",
      "Cantidad",
      "Categoria",
      "Talla",
      "Registro",
      "Editar",
      "Inactivar/Activar",
    ],
    fieldsToShow: [
      "imagen",
      "nombre",
      "precio",
      "cantidad",
      "nombre_categoria",
      "talla",
      "fecha_registro",
      "editar",
      "estado",
    ],
  },
};

export default propertyTabla;
