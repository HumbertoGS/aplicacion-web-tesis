import {
  Document,
  Page,
  Text,
  Image,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

import { stylesPedido } from "./stylePedido";

const stylesPdf = StyleSheet.create(stylesPedido);

const TablaDetalles = ({ datos }) => {
  const styleHeader = [stylesPdf.rowTable, stylesPdf.rowTable2];

  const widthCell = stylesPdf.cellProperty.cellWidth;
  const fontSize = stylesPdf.cellProperty.fontSize;

  const style = ({ w, f }) => [widthCell[`Row${w}0`], fontSize[f]];

  return (
    <View style={stylesPdf.table}>
      <View style={styleHeader}>
        <Text style={style({ w: 2, f: "header" })}>Codigo</Text>
        <Text style={style({ w: 6, f: "header" })}>Producto</Text>
        <Text style={style({ w: 2, f: "header" })}>Precio</Text>
        <Text style={style({ w: 2, f: "header" })}>Disponible</Text>
        <Text style={style({ w: 2, f: "header" })}>Vendido</Text>
        <Text style={style({ w: 3, f: "header" })}>Fecha Registro</Text>
        <Text style={style({ w: 2, f: "header" })}>Stock</Text>
      </View>

      {datos.map((row, i) => (
        <View key={i} style={stylesPdf.rowTable} wrap={false}>
          <Text style={style({ w: 2, f: "body" })}>{row.codigo}</Text>
          <Text style={style({ w: 6, f: "body" })}>{row.nombre}</Text>
          <Text style={style({ w: 2, f: "body" })}>${row.precio}</Text>
          <Text
            style={[...style({ w: 2, f: "body" }), { paddingLeft: "20px" }]}
          >
            {row.cantidad}
          </Text>
          <Text
            style={[...style({ w: 2, f: "body" }), { paddingLeft: "20px" }]}
          >
            {row.vendido}
          </Text>
          <Text style={style({ w: 3, f: "body" })}>{row.fecha_registro}</Text>
          <Text
            style={[
              style({ w: 2, f: "body" }),
              { color: row.stock ? "#33d556" : "#d53a33" },
            ]}
          >
            {row.stock ? "SI" : "NO"}
          </Text>
        </View>
      ))}
    </View>
  );
};

const TablaOtrosDetalles = ({ datosPDF }) => {
  const { datosCategoria, datosProducto } = datosPDF;
  const styleHeader = [stylesPdf.rowTable, stylesPdf.rowTable2];

  const widthCell = stylesPdf.cellProperty.cellWidth;
  const fontSize = stylesPdf.cellProperty.fontSize;

  const style = ({ w, f }) => [widthCell[`Row${w}0`], fontSize[f]];

  return (
    <View style={{ display: "flex", flexDirection: "row", width: "100%" }}>
      <View style={{ width: "47%" }}>
        <Text style={stylesPdf.text}>Categoria más Vendida</Text>
        <View style={stylesPdf.table}>
          <View style={styleHeader}>
            <Text style={style({ w: 5, f: "header" })}>Categoria</Text>
            <Text style={style({ w: 2, f: "header" })}>Cantidad</Text>
          </View>

          {datosCategoria.map((row, i) => (
            <View key={i} style={stylesPdf.rowTable} wrap={false}>
              <Text style={style({ w: 5, f: "body" })}>{row.subject}</Text>
              <Text
                style={[...style({ w: 2, f: "body" }), { paddingLeft: "20px" }]}
              >
                {row.conteo}
              </Text>
            </View>
          ))}
        </View>
      </View>
      <View style={{ width: "6%" }}></View>
      <View style={{ width: "47%" }}>
        <Text style={stylesPdf.text}>Producto más Vendido</Text>
        <View style={stylesPdf.table}>
          <View style={styleHeader}>
            <Text style={style({ w: 7, f: "header" })}>Producto</Text>
            <Text style={style({ w: 2, f: "header" })}>Cantidad</Text>
          </View>

          {datosProducto.map((row, i) => (
            <View key={i} style={stylesPdf.rowTable} wrap={false}>
              <Text style={style({ w: 7, f: "body" })}>{row.name}</Text>
              <Text
                style={[...style({ w: 2, f: "body" }), { paddingLeft: "20px" }]}
              >
                {row.conteo}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const InventarioPdf = ({ datos, fecha, datosPDF }) => {
  datosPDF.datosCategoria = datosPDF?.datosCategoria.filter(
    (item) => item.conteo !== 0
  );

  return (
    <Document>
      <Page size="A4" style={stylesPdf.pdf} orientation="landscape">
        <View style={stylesPdf.encabezado}>
          <Text style={{ ...stylesPdf.titulo, paddingRight: "200px" }}>
            Novedades D'Myla & Ney
          </Text>
          <Image src={"logo512.png"} style={stylesPdf.logo} />
        </View>

        <View style={stylesPdf.table}>
          <Text style={stylesPdf.textTitulo}>Inventario de productos</Text>
          <Text style={stylesPdf.textSubTitulo}>
            Desde: {fecha.fechaDesde} - Hasta: {fecha.fechaHasta}
          </Text>
        </View>

        <View style={stylesPdf.tableSpace}></View>

        <TablaDetalles datos={datos} />

        <View style={stylesPdf.tableSpace}></View>

        <TablaOtrosDetalles datosPDF={datosPDF} />
      </Page>
    </Document>
  );
};

export default InventarioPdf;
