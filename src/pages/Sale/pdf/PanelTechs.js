import React, { useRef, useState } from "react";
import { Modal } from "antd";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import moment from "moment";

const PanelTechnical = ({
  panels,
  estimation,
  handleComplete,
  disabled = false,
}) => {
  const [pdfSrc, setPdfSrc] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const docName = "Technical Specification";

  const Companylogo = "/assets/images/bilal/logo.png";
  const otherLogos = "/assets/images/bilal/product.png";
  const qrCode = "/assets/images/bilal/qr-code.png";
  const currDate = moment().format("DDDD/MM/YY");
  const address = `Project: ${estimation?.projectName || "***"}`;
  const customerName = `M/s. ${estimation?.customer?.title}`;
  const docId = estimation.cuId;
  const doc = new jsPDF();
  const generateInvoice = () => {
    const footerHeight = 10;
    const headerHeight = 40;
    const leftSideSet = 14.3;
    const pageWidth = doc.internal.pageSize.getWidth();
    const header = () => {
      doc.addImage(Companylogo, "PNG", 12, 7, 50, 16);
      doc.addImage(otherLogos, "PNG", pageWidth / 1.81, 7, 80, 16);
    };

    const footer = () => {
      const pageHeight = doc.internal.pageSize.getHeight();
      doc.addImage(
        qrCode,
        "PNG",
        leftSideSet,
        pageHeight - footerHeight - 15,
        20,
        20
      );
      doc.setTextColor("gray");
      doc.setFont("helvetica", "normal");
      doc.setFillColor("#235eba");
      const footerStr = `Page ${doc.internal.getNumberOfPages()}`; // Use total pages here
      doc.setFontSize(10);
      doc.text(
        footerStr,
        doc.internal.pageSize.getWidth() -
          doc.getStringUnitWidth(footerStr) * doc.internal.getFontSize(),
        doc.internal.pageSize.getHeight() - 10
      );
      doc.setFontSize(6);
      doc.setFont("helvetica", "normal");
      doc.text(
        "The aforementioned citation has been generated digitally, and therefore retains its validity even in the absence of a physical signature or stamp",
        35,
        doc.internal.pageSize.getHeight() - 9
      );
    };

    // Content
    const fontSize = 10;
    const padding = 6;
    const textWidth =
      (doc.getStringUnitWidth(docName) * fontSize) / doc.internal.scaleFactor;
    const textHeight = fontSize;
    const rectWidth = textWidth + padding * 8;
    const rectHeight = textHeight - 1;
    const x = (doc.internal.pageSize.getWidth() - rectWidth) / 2;
    const y = headerHeight + 10 + fontSize / 2 - padding;
    doc.rect(x, y, rectWidth, rectHeight);

    doc.setDrawColor(0);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setFillColor(255, 255, 255);
    const centerX = x + rectWidth / 2;
    const centerY = y + rectHeight / 2 + 1.5;
    doc.text(docName, centerX, centerY, null, null, "center");
    doc.setFontSize(10);
    doc.setTextColor(0);
    doc.text(customerName, leftSideSet, headerHeight);
    doc.setFont("helvetica", "normal");
    doc.text(address, leftSideSet, headerHeight + 5);
    doc.setFont("helvetica", "bold");
    doc.text("Ref:", pageWidth - 47, headerHeight);
    doc.text(docId, pageWidth - 37, headerHeight);
    doc.text("Dated:", pageWidth - 47, headerHeight + 5);
    doc.setFont("helvetica", "normal");
    doc.text(currDate, pageWidth - 35, headerHeight + 5);

    const headStyles = {
      fillColor: ["#BFC9CA"],
      textColor: ["#FFFFFF"],
      fontStyle: "bold",
      fontSize: 10,
    };
    const tableOptions = {
      styles: {
        fontSize: 9, // set the font size to 12
      },
    };

    function getTableOptions(startY) {
      return {
        startY: startY,
        headStyles,
        columnStyles: {
          0: { cellWidth: 30 },
          1: { cellWidth: 76.8 },
          2: { cellWidth: 15 },
          3: { cellWidth: 30 },
          4: { cellWidth: 30 },
        },
        margin: { top: 35, bottom: footerHeight + 15 },

        // define the header function to draw the header on every page
        didDrawPage: function (data) {
          header();
          footer();
        },
        didParseCell: function (data) {
          var rows = data.table.body;
          var rowIndex = data.row.index;
          var cellIndex = data.column.index;

          var cell = rows[rowIndex].cells[cellIndex];
          if (data.row?.raw[5] == "section-row") {
            if (cellIndex == 0) {
              // Merge first two cells and write "Golden customer"
              cell.colSpan = 2;
              rows[rowIndex].cells[cellIndex + 1].styles.display = "none";
              cell.text = data.row?.raw[1];
            }
            data.cell.styles.fillColor = ["#d9dadf"]; // set the background color to red
            data.cell.styles.textColor = ["#000000"]; // set the text color to white
          }
        },
        ...tableOptions,
      };
    }

    // loop through the table data and create each table
    var startY = 65;
    panels.forEach((panel) => {
      const head = [
        [
          {
            content: panel.name,
            colSpan: 3,
            styles: { halign: "left", fillColor: ["#000000"] },
          },
          {
            content: panel.qty == 1 ? "No." : "Nos.",
            colSpan: 1,
            styles: { halign: "left", fillColor: ["#000000"] },
          },
          {
            content: panel.qty,
            colSpan: 1,
            styles: { halign: "left", fillColor: ["#000000"] },
          },
        ],
        ["Code", "Description", "Qty", "Model", "Make"],
      ];

      const tableData = panel.products?.map((product) => {
        if (product.type === 1) {
          return [
            product.code,
            product.name,
            product.qty,
            product.model,
            product.make,
            "",
          ];
        } else {
          return ["", product.name, product.qty, "", "", "section-row"];
        }
      });

      doc.autoTable({
        head: head,
        body: tableData,
        startY: startY,
        ...getTableOptions(startY),
      });
      startY = doc.lastAutoTable.finalY + 10;
    });
    const pdfData = doc.output("datauristring");
    setPdfSrc(pdfData);
    setModalVisible(true);
  };

  return (
    <>
      <Button
        icon={<DownloadOutlined />}
        disabled={disabled}
        onClick={() => {
          generateInvoice();
          handleComplete(estimation?.estimationStatus);
        }}
      >
        Technical
      </Button>
      <Modal
        title="Technical Specification Preview"
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
          title="Technical Specification Preview"
          width="100%"
          height="500px"
        />
      </Modal>
    </>
  );
};

export default PanelTechnical;
