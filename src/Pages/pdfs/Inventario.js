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
        <Text style={style({ w: 3, f: "header" })}>Precio</Text>
        <Text style={style({ w: 3, f: "header" })}>Categoria</Text>
        <Text style={style({ w: 2, f: "header" })}>Stock</Text>
      </View>

      {datos.map((row, i) => (
        <View key={i} style={stylesPdf.rowTable} wrap={false}>
          <Text style={style({ w: 2, f: "body" })}>{row.codigo}</Text>
          <Text style={style({ w: 6, f: "body" })}>{row.nombre}</Text>
          <Text style={style({ w: 3, f: "body" })}>${row.precio}</Text>
          <Text style={style({ w: 3, f: "body" })}>{row.nombre_categoria}</Text>
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

const InventarioPdf = ({ datos, fecha }) => {
  return (
    <Document>
      <Page size="A4" style={stylesPdf.pdf}>
        <View style={stylesPdf.encabezado}>
          <Text style={stylesPdf.titulo}>Novedades D'Myla & Ney</Text>
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
      </Page>
    </Document>
  );
};

export default InventarioPdf;
