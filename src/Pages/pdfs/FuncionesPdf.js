import { PDFViewer, PDFDownloadLink, pdf } from "@react-pdf/renderer";

import FileSaver from "file-saver";

import Button from "react-bootstrap/esm/Button";
import { VscFilePdf } from "react-icons/vsc";

const PDFDownload = ({ children, fileName, nameBtn = "Descargar PDF" }) => {
  return (
    <PDFDownloadLink document={children} fileName={fileName}>
      <Button variant="outline-secondary" className="mx-2">
        <VscFilePdf /> {nameBtn}
      </Button>
    </PDFDownloadLink>
  );
};

const getPdfBlob = async (document, nameDocument) => {
  let blobPdf = await pdf(document).toBlob();
  FileSaver.saveAs(blobPdf, nameDocument);
};

const VisualizarPdf = (props) => {
  const children = props.children;
  const fileName = props.fileName;

  return (
    <>
      <div style={{ width: "100%", height: "90vh" }}>
        <PDFDownload children={children} fileName={fileName} />
        <div className="py-3"></div>
        <PDFViewer
          style={{ width: "100%", height: "90vh" }}
          filename={fileName}
        >
          {children}
        </PDFViewer>
      </div>
    </>
  );
};

export { VisualizarPdf, PDFDownload, getPdfBlob };
