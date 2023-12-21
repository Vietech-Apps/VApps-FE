import React, { useRef, useState } from "react";
import { Modal } from "antd";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
const qrCodeImage = "/assets/images/bilal/qr-code.png";

const PdfGenerator = () => {
  const [pdfSrc, setPdfSrc] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  // Add a table to the PDF
  const labelData = [
    {
      location: "Bin Location 1",
      binNumber: "01-R1-02-1-B1",
      dimensions: "10x20x30",
      level: 1,
    },
    {
      location: "Bin Location 2",
      binNumber: "01-R1-02-1-B1",
      dimensions: "15x25x35",
      level: 2,
    },
    {
      location: "Bin Location 3",
      binNumber: "01-R1-02-1-B1",
      dimensions: "20x30x40",
      level: 3,
    },
    {
      location: "Bin Location 3",
      binNumber: "01-R1-1-B1",
      dimensions: "20x30x40",
      level: 4,
    },
    {
      location: "Bin Location 3",
      binNumber: "02-1-B1",
      dimensions: "20x30x40",
      level: 5,
    },
    {
      location: "Bin Location 3",
      binNumber: "01-R1-02-1-B1",
      dimensions: "20x30x40",
      level: 1,
    },
    {
      location: "Bin Location 3",
      binNumber: "01-R1-02-1-B1",
      dimensions: "20x30x40",
      level: 1,
    },
    // Add more label data objects here...
  ];

  const generateInvoice = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const labelWidth = 100; // Set the width of each label
    const labelHeight = 34; // Set the height of each label
    const marginX = 2; // Set the horizontal margin between labels
    const marginY = 2; // Set the vertical margin between labels
    const maxLabelsPerRow = Math.floor(
      doc.internal.pageSize.width / (labelWidth + marginX)
    );
    const maxRowsPerPage = Math.floor(
      doc.internal.pageSize.height / (labelHeight + marginY)
    );
    const numLabels = labelData.length;

    for (let i = 0; i < numLabels; i++) {
      const row = Math.floor(i / maxLabelsPerRow);
      const col = i % maxLabelsPerRow;
      const x = col * (labelWidth + marginX) + marginX;
      const y = row * (labelHeight + marginY) + marginY;

      // Determine the label color based on the level
      let color = "";
      switch (labelData[i].level) {
        case 1:
          color = "yellow";
          break;
        case 2:
          color = "green";
          break;
        case 3:
          color = "blue";
          break;
        case 4:
          color = "red";
          break;
        case 5:
          color = "purple";
          break;
        default:
          color = "black";
          break;
      }

      doc.setFillColor(color);
      doc.rect(x, y, labelWidth, labelHeight, "F");

      // Add the QR code image to the label
      doc.addImage(qrCodeImage, "PNG", x + 4, y + 4, 26, 26);

      // Add the label text from the label data array
      doc.setTextColor(labelData[i].level == 1 ? "black" : "white");
      // calculate width based on font size and number of characters

      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text(`Ground Floor`, x + 36, y + 14);
      doc.setFillColor("white");
      const binNumberTextWidth =
        doc.getStringUnitWidth(labelData[i].binNumber) * 8.5;
      doc.rect(x + 34, y + 18, binNumberTextWidth, 10, "F"); // Set background color for the bin number text
      doc.setTextColor("black");
      doc.setFontSize(22);
      doc.setFont("helvetica", "bold");
      doc.text(`${labelData[i].binNumber}`, x + 36, y + 26);
    }

    const pdfData = doc.output("datauristring");
    setPdfSrc(pdfData);
    setModalVisible(true);
  };

  return (
    <>
      <Button icon={<DownloadOutlined />} onClick={generateInvoice}>
        Quotation
      </Button>
      <Modal
        title="Invoice Preview"
        open={modalVisible && pdfSrc}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={1200}
        style={{
          top: 20,
        }}
      >
        <iframe
          src={pdfSrc}
          title="Invoice Preview"
          width="100%"
          height="500px"
        />
      </Modal>
    </>
  );
};

export default PdfGenerator;
