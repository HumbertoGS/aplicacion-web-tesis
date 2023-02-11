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

const date = new Date();
const options = { month: "long", day: "numeric", year: "numeric" };
const fecha = date.toLocaleDateString("en-US", options);

const Tabla_1 = ({ pedido, fecha, total }) => {
  const styleHeader = [stylesPdf.rowTable, stylesPdf.rowTable2];

  const widthCell = stylesPdf.cellProperty.cellWidth;
  const fontSize = stylesPdf.cellProperty.fontSize;

  const style = ({ w, f }) => [widthCell[`Row${w}0`], fontSize[f]];

  return (
    <View style={stylesPdf.table}>
      <View style={styleHeader}>
        <Text style={style({ w: 3, f: "header" })}>N° Pedido</Text>
        <Text style={style({ w: 7, f: "header" })}>Fecha</Text>
        <Text style={style({ w: 2, f: "header" })}>Total</Text>
      </View>
      <View style={stylesPdf.rowTable} wrap={false}>
        <Text style={style({ w: 3, f: "body" })}>{pedido}</Text>
        <Text style={style({ w: 7, f: "body" })}>{fecha}</Text>
        <Text style={style({ w: 2, f: "body" })}>${total}</Text>
      </View>
    </View>
  );
};

const DetallesBnc = () => {
  return (
    <View style={stylesPdf.table}>
      <Text style={stylesPdf.text}>---</Text>
    </View>
  );
};

const TablaDetalles = ({ datosCarrito, datosTotales }) => {
  const styleHeader = [stylesPdf.rowTable, stylesPdf.rowTable2];

  const widthCell = stylesPdf.cellProperty.cellWidth;
  const fontSize = stylesPdf.cellProperty.fontSize;

  const style = ({ w, f }) => [widthCell[`Row${w}0`], fontSize[f]];

  return (
    <View style={stylesPdf.table}>
      <View style={styleHeader}>
        <Text style={style({ w: 4, f: "header" })}>Producto</Text>
        <Text style={style({ w: 3, f: "header" })}>Cantidad</Text>
        <Text style={style({ w: 3, f: "header" })}>Precio</Text>
        <Text style={style({ w: 2, f: "header" })}>Total</Text>
      </View>

      {datosCarrito.map((row, i) => (
        <View key={i} style={stylesPdf.rowTable} wrap={false}>
          <Text style={style({ w: 4, f: "body" })}>{row.nombre}</Text>
          <Text
            style={[...style({ w: 3, f: "body" }), { paddingLeft: "20px" }]}
          >
            {row.cantidad}
          </Text>
          <Text style={style({ w: 3, f: "body" })}>${row.precio}</Text>
          <Text style={style({ w: 2, f: "body" })}>${row.total}</Text>
        </View>
      ))}

      <View style={stylesPdf.tableSpace}></View>

      {datosTotales.map((item, i) => (
        <View key={i} style={stylesPdf.rowTable}>
          <Text style={style({ w: 4, f: "header" })}></Text>
          <Text style={style({ w: 3, f: "header" })}></Text>
          <Text style={style({ w: 3, f: "body" })}>{item.name}</Text>
          <Text style={style({ w: 2, f: "body" })}>${item.totales}</Text>
        </View>
      ))}
    </View>
  );
};

const Detalles = () => {
  return (
    <View>
      <Text style={[stylesPdf.text, stylesPdf.textWs]}>
        Una vez realizada la transferencia ayúdanos por favor mandando una
        captura de pantalla a nuestro Whatsapp 09xxxxxxxx para validar tu
        pedido.
      </Text>

      <Text style={stylesPdf.text}>Nuestros detalles bancarios</Text>
      <DetallesBnc />
      <Text style={stylesPdf.text}>Detalles del pedido</Text>
    </View>
  );
};

const PedidoPdf = ({ datos }) => {
  const datosCarrito = datos.datos;
  const datosTotales = datos.totales;

  return (
    <Document>
      <Page size="A4" style={stylesPdf.pdf}>
        <View style={stylesPdf.encabezado}>
          <Text style={stylesPdf.titulo}>Novedades D'Myla & Ney</Text>
          <Image src={"logo512.png"} style={stylesPdf.logo} />
        </View>

        <Tabla_1
          pedido={"5692"}
          fecha={fecha}
          total={datosTotales[2].totales}
        />

        <Detalles />

        <TablaDetalles
          datosCarrito={datosCarrito}
          datosTotales={datosTotales}
        />
      </Page>
    </Document>
  );
};

export default PedidoPdf;
