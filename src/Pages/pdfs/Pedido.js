import React from "react";

import {
  Document,
  Page,
  Text,
  Image,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  table: {
    width: "100%",
    paddingRight: "60px",
    paddingLeft: "30px",
    paddingVertical: "20px",
    border: "1px solid #EEE",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    borderTop: "1px solid #EEE",
    paddingTop: 8,
    paddingBottom: 8,
  },
  header: {
    borderTop: "none",
  },
  bold: {
    fontWeight: "bold",
  },
  // So Declarative and unDRY 👌
  Row10: {
    width: "10%",
  },
  Row20: {
    width: "20%",
  },
  Row30: {
    width: "30%",
  },
  Row40: {
    width: "40%",
  },
});

const PedidoPdf = ({ datos }) => {
  const datosCarrito = datos.datos;
  const datosTotales = datos.totales;

  console.log(datosTotales);
  return (
    <Document>
      <Page size="A4" style={{ paddingHorizontal: "30px", paddingTop: "20px" }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginRight: "20px",
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              textAlign: "center",
              paddingLeft: "30px",
              color: "#da6b9e",
            }}
          >
            Novedades D'Myla & Ney
          </Text>
          <Image
            src={"logo512.png"}
            style={{
              width: 100,
              height: 100,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />
        </View>

        <View style={{ ...styles.table }}>
          <View style={[styles.row, styles.bold, styles.header]}>
            <Text style={{ ...styles.Row30, fontSize: "12px" }}>N° Pedido</Text>
            <Text style={{ ...styles.Row30, fontSize: "12px" }}>Fecha</Text>
            <Text style={{ ...styles.Row40, fontSize: "12px" }}></Text>
            <Text style={{ ...styles.Row20, fontSize: "12px" }}>Total</Text>
          </View>
          <View style={styles.row} wrap={false}>
            <Text style={{ ...styles.Row30, fontSize: "11px" }}>5692</Text>
            <Text style={{ ...styles.Row30, fontSize: "11px" }}>
              febrero 9, 2023
            </Text>
            <Text style={{ ...styles.Row40, fontSize: "11px" }}></Text>
            <Text style={{ ...styles.Row20, fontSize: "11px" }}>
              ${datosTotales[2].totales}
            </Text>
          </View>
        </View>

        <Text
          style={{
            fontSize: "14px",
            marginTop: "15px",
            marginBottom: "20px",
            color: "red",
          }}
        >
          Una vez realizada la transferencia ayúdanos por favor mandando una
          captura de pantalla a nuestro Whatsapp 09xxxxxxxx para validar tu
          pedido.
        </Text>
        <Text
          style={{
            fontSize: "14px",
            marginTop: "15px",
            marginBottom: "20px",
          }}
        >
          Nuestros detalles bancarios
        </Text>
        <Text
          style={{
            fontSize: "14px",
            marginTop: "15px",
            marginBottom: "20px",
          }}
        >
          ---
        </Text>
        <Text
          style={{
            fontSize: "14px",
            marginTop: "15px",
            marginBottom: "20px",
          }}
        >
          Detalles del pedido
        </Text>

        <View style={{ ...styles.table }}>
          <View style={[styles.row, styles.bold, styles.header]}>
            <Text style={{ ...styles.Row40, fontSize: "12px" }}>Producto</Text>
            <Text style={{ ...styles.Row30, fontSize: "12px" }}>Cantidad</Text>
            <Text style={{ ...styles.Row30, fontSize: "12px" }}>Precio</Text>
            <Text style={{ ...styles.Row20, fontSize: "12px" }}>Total</Text>
          </View>
          {datosCarrito.map((row, i) => (
            <View key={i} style={styles.row} wrap={false}>
              <Text style={styles.Row40}>
                <Text style={{ ...styles.bold, fontSize: "11px" }}>
                  {row.nombre}
                </Text>
              </Text>
              <Text
                style={{
                  ...styles.Row30,
                  fontSize: "11px",
                  paddingLeft: "20px",
                }}
              >
                {row.cantidad}
              </Text>
              <Text style={{ ...styles.Row30, fontSize: "11px" }}>
                ${row.precio}
              </Text>
              <Text style={{ ...styles.Row20, fontSize: "11px" }}>
                <Text style={styles.bold}>${row.total}</Text>
              </Text>
            </View>
          ))}

          <View
            style={{
              marginBottom: "30px",
              borderBottom: "1px solid #EEE",
            }}
          ></View>

          {datosTotales.map((item, i) => (
            <View
              key={i}
              style={{
                // borderBottom: "1px solid #EEE",
                ...styles.row,
                ...styles.bold,
              }}
            >
              <Text style={{ ...styles.Row40, fontSize: "12px" }}></Text>
              <Text style={{ ...styles.Row30, fontSize: "12px" }}></Text>
              <Text style={{ ...styles.Row30, fontSize: "11px" }}>
                {item.name}
              </Text>
              <Text style={{ ...styles.Row20, fontSize: "11px" }}>
                ${item.totales}
              </Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default PedidoPdf;
