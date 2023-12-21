import React, { useRef, useState } from "react";
import { Modal } from "antd";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { useGetData } from "meta/services/auth/ezAPI";
const qrCodeImage = "/assets/images/bilal/qr-code.png";

const LabelPrint = () => {
  const [{ apiData: locations }] = useGetData(`erp/BinLocation/all`, []);
  const [{ apiData: levels }] = useGetData(`erp/BinLevel/all`, []);

  const [pdfSrc, setPdfSrc] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const colorCheck = (level) => {
    let color = "";
    switch (level) {
      case "1":
        color = "#F7DC6F";
        break;
      case "2":
        color = "purple";
        break;
      case "3":
        color = "#3D46FF";
        break;
      case "4":
        color = "green";
        break;
      case "5":
        color = "#FF3737";
        break;
      default:
        color = "#F7DC6F";
        break;
    }
    return color;
  };

  const generateInvoice = () => {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });

    const labelWidth = 60; // Set the width of each label
    const labelHeight = 20; // Set the height of each label
    const marginX = 2; // Set the horizontal margin between labels
    const marginY = 2; // Set the vertical margin between labels

    const maxLabelsPerRow = Math.floor(
      doc.internal.pageSize.width / (labelWidth + marginX)
    );
    const maxRowsPerPage = Math.floor(
      doc.internal.pageSize.height / (labelHeight + marginY)
    );
    const numLabels = locations.length;
    let color = "";

    for (let i = 0; i < numLabels; i++) {
      if (locations[i]?.binLocationCode !== "System Generated") {
        const parts = locations[i]?.binLocationCode?.split("-");
        color = colorCheck(parts[4]);

        const row = Math.floor(i / maxLabelsPerRow);
        const col = i % maxLabelsPerRow;

        const x = col * (labelWidth + marginX) + marginX;
        const y = row * (labelHeight + marginY) + marginY;

        doc.setFillColor(color);
        doc.rect(x, y, labelWidth, labelHeight, "F");

        // Add the QR code image to the label
        doc.addImage(qrCodeImage, "PNG", x + 2, y + 2, 16, 16);

        const firstDashIndex = locations[i]?.binLocationCode?.indexOf("-");

        // Extract the substring after the first "-"
        const BinCode = locations[i]?.binLocationCode?.substring(
          firstDashIndex + 1
        );

        const BinCodeParts = BinCode.split("-");

        doc.setTextColor(color == "#F7DC6F" ? "black" : "white");
        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.text(`Bilal Switchgear Eng`, x + 20, y + 5.5);
        doc.setFillColor("white");
        // const binNumberTextWidth = doc.getStringUnitWidth(BinCode) * 5;
        doc.rect(x + 20, y + 7, 38, 11, "F");

        doc.setTextColor("black");
        doc.setFont("helvetica", "bold");
        doc.setFontSize(5);
        levels.map((d, i) => {
          doc.text(`${d?.name}`, x + 21.5 + i * 8, y + 10);
        });

        // print each BinCode part
        BinCodeParts.forEach((part, index) => {
          doc.setFontSize(14);
          // If it's not the first part, add a "-" before it
          const text = index !== 0 ? `${part}` : part;
          doc.text(text, x + 21.5 + index * 8, y + 15);
          const Ttext = index !== 0 ? `-` : "";
          doc.setFontSize(14);
          doc.text(Ttext, x + 18.5 + index * 8, y + 15);
        });
      }
    }

    const pdfData = doc.output("datauristring");
    setPdfSrc(pdfData);
    setModalVisible(true);
  };

  return (
    <>
      <Button icon={<DownloadOutlined />} onClick={generateInvoice}>
        Generate Labels
      </Button>
      <Modal
        title="Labels Preview"
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
          title="Labels Preview"
          width="100%"
          height="500px"
        />
      </Modal>
    </>
  );
};

export default LabelPrint;
